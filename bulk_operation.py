import webapp2
from common import Handler

from model import IngredientRawText

class InsertPage(Handler):
    """bulk insert"""
    
    def get(self):
        IngredientRawText.bulk_insert()
        
class DeletePage(Handler):
    """bulk delete"""

    def get(self):
        for i in IngredientRawText.all():
            i.delete()
    
application = webapp2.WSGIApplication([('/bulk/insert', InsertPage),
                                       ('/bulk/delete', DeletePage)
                                   ],
                                      debug=True)        
