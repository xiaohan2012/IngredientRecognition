import webapp2
from common import Handler

from model import IngredientRawText

class TodoHandler(Handler):

    def get(self):
        rows = IngredientRawText.gql("WHERE annotated=:annotated", annotated = False).fetch(3)
        self.render("hand_annotation.html", rows = rows)
        
    def post(self):
        key = self.request.get("key")
        annotation = self.request.get("annotation")
        newcuts = self.request.get("newcuts")
        
        row = IngredientRawText.get(key)
        row.annotation = annotation
        row.newcuts = newcuts
        row.annotated = True
        row.put()
        
        print "done"

class DeleteText(Handler):
    def post(self):
        key = self.request.get("key")
        row = IngredientRawText.get(key)
        row.annotated = True
        row.put()
        
application = webapp2.WSGIApplication([('/hand/to-do', TodoHandler),
                                       ('/delete', DeleteText)
                                   ],
                                      debug=True)