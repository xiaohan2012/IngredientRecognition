import os
import webapp2
import jinja2
from json import dumps

template_dir = os.path.join(os.path.dirname(__file__),"template")
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),autoescape = True)

class Handler(webapp2.RequestHandler):
    def write(self,*a,**kw):
        self.response.out.write(*a,**kw)

    def render_str(self, template, **kw):
        t = jinja_env.get_template(template)
        return t.render(kw)

    def render(self,template, **kw):
        self.write(self.render_str(template, **kw))
    
    def render_json(self,py_dict):
        self.response.headers["Content-Type"] = "application/json; charset=UTF-8"
        self.write(dumps(py_dict))
