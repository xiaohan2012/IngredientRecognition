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

class HistoryInJsonHandler(Handler):
    """
    convert history to json format
    """
    def get(self):
        from json import loads, dump
        from codecs import open
        
        rows = IngredientRawText.gql("WHERE annotated=:annotated", annotated = True)
        self.render_json(map(lambda r: loads(r.annotation), rows))

application = webapp2.WSGIApplication([('/bulk/insert', InsertPage),
                                       ('/bulk/delete', DeletePage),
                                       ('/bulk/json', HistoryInJsonHandler),
                                   ],
                                      debug=True)        
