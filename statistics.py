import webapp2
from common import Handler

from model import IngredientRawText

class IngredientListHandler(Handler):
    def get(self):
        from json import loads
        from collections import Counter
        counter = Counter()
        
        rows = IngredientRawText.gql("WHERE annotated=:annotated", annotated = True)
        ings = []
        for r in rows:
            if r.annotation is not None:
                annotation = loads(r.annotation)

                hasbegan = False
                texts = []
                for word in annotation:
                    if "begin" in word["tags"]:
                        hasbegan = True
                        texts.append(word["text"])
                    elif "continue" in word["tags"] and hasbegan:
                        texts.append(word["text"])
                    elif hasbegan: #not begin nor continue
                        hasbegan = False
                        counter["-".join(texts)] += 1
                        texts = []
        self.render("stat_ing_name.html", freq_list = counter)

application = webapp2.WSGIApplication([('/stat/ingredient', IngredientListHandler)],
                                      debug=True)          