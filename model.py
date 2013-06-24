from google.appengine.ext import db

class IngredientRawText(db.Model):
     content = db.StringListProperty(required = True)
     ingredients = db.ListProperty(int, default=[])
     annotated = db.BooleanProperty(default = False)
     last_modified = db.DateTimeProperty(auto_now = True)
     
     @classmethod
     def bulk_insert(cls, path="data.json"):
          """insert all the json text into datastore"""
          from json import load
          from codecs import open
          
          lists = load(open(path, "r", "utf8"))
          for lst in lists:
              ing = cls(content = lst)
              ing.put()
     