

from exts import db 

class Recipe(db.Model):
    
    id=db.Column(db.Integer(), primary_key=True)
    title=db.Column(db.String(), nullable=False)
    description=db.Column(db.Text(),nullable=False)
    
    def __repr__(self) -> str:
        return f"<Recipe {self.title}"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update(self,title, description):
        self.title=title
        self.description=description        
        db.session.commit()
        


class User(db.Model):
    """class user
    
   id:interger
   email:string
   username:string
   password:string
    """
    
    __tablename__='users'
    
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(25),nullable=False,unique=True)
    email=db.Column(db.String(80), unique = True , nullable=False)
    password=db.Column(db.Text(),nullable=False)
    
    
    def __repr__(self) -> str:
        return f"<User: {self.username} >"
    
    
        
        