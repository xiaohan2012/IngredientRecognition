import webapp2
from common import Handler

from model import IngredientRawText

class TodoHandler(Handler):

    def _load_known_ingredients(self):
        file_names = ["bird.json", "meat.json", "vegetable.json", "cereal-bean-diary.json", "fruit.json", "dish.json", "aqua.json", "condiment.json", "ingredient-names1.json", "ingredient-names2.json"]
        
        from json import load
        from codecs import open
        
        return reduce(lambda l,f: l.union(load(open("data/%s" %f, "r", "utf8"))) , file_names, set())
                
    def get(self):
        rows = IngredientRawText.gql("WHERE annotated=:annotated", annotated = False).fetch(100)
        self.render("to_do.html", rows = rows, known_ingredients = self._load_known_ingredients())
        
    def post(self):
        key = self.request.get("key")
        annotation = self.request.get("annotation")
        newcuts = self.request.get("newcuts")
        
        row = IngredientRawText.get(key)
        row.annotation = annotation
        row.newcuts = newcuts
        row.annotated = True
        row.put()
        
class HistoryHandler(Handler):
    def get(self):
        import math
        page_size = 100

        page = int(self.request.get("page",1))

        row_count = IngredientRawText.gql("WHERE annotated=:annotated", annotated = True).count()
        page_count = int(math.ceil(row_count / float(page_size)))

        rows  = IngredientRawText.gql("WHERE annotated=:annotated", annotated = True).fetch(page_size, offset = (page-1)*page_size)
        
        self.render("history.html", rows = map(lambda r: r.to_dict(), rows), count = row_count, page_count = page_count, page = page)
        
class DeleteText(Handler):
    def post(self):
        key = self.request.get("key")
        row = IngredientRawText.get(key)
        row.annotated = True
        row.put()
        
application = webapp2.WSGIApplication([('/hand/to-do', TodoHandler),
                                       ('/hand/history', HistoryHandler),
                                       ('/delete', DeleteText)
                                  ],
                                   debug=True)