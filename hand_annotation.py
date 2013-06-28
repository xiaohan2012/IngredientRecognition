import webapp2
from common import Handler

from model import IngredientRawText

class MainPage(Handler):

    def get(self):
        rows = IngredientRawText.gql("WHERE annotated=:annotated", annotated = False).fetch(3)
        self.render("hand_annotation.html", rows = rows)
        
    def post(self):
        key = self.request.get("key")
        
        from json import loads
        indices = loads(self.request.get("indices"))

        row = IngredientRawText.get(key)
        row.annotated = True
        row.ingredients = indices

        row.put()

class DeleteText(Handler):
    def post(self):
        key = self.request.get("key")
        row = IngredientRawText.get(key)
        row.annotated = True
        row.put()
        
application = webapp2.WSGIApplication([('/', MainPage),
                                       ('/delete', DeleteText)
                                   ],
                                      debug=True)