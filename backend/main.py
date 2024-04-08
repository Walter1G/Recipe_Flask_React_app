from flask import Flask,request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe
from exts import db


app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

api = Api(app, doc='/docs')

# model (Serializer)
recipe_model = api.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)


@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }


@api.route('/recipes')
class RecipesResource(Resource):
    @api.marshal_list_with(recipe_model)
    @api.doc('Get all recipes')
    def get(self):
        """ Get all Recipes"""
        recipes = Recipe.query.all()

        return recipes

    @api.marshal_with(recipe_model)
    @api.doc('Create a new recipe')
    def post(self):
        """Create a new Recipe"""
        data = request.get_json()
        new_recipe =  Recipe(
            title=data.get('title'),
            description = data.get('description'))
        new_recipe.save()
        
        return new_recipe, 201


@api.route('/recipes/<int:id>')
class RecipeResource(Resource):
    @api.marshal_with(recipe_model)
    @api.doc('get  a specific recipe by id')
    def get(self, id):
        """Get a recipe by ID"""
        recipe=Recipe.query.get_or_404(id)
        
        return recipe,200

    @api.marshal_with(recipe_model)
    @api.doc('Update a recipe')
    def put(self, id):
        """Update a recipe by id"""
        data =  request.get_json()
        recipe_to_update =  Recipe.query.get_or_404(id)
        recipe_to_update.update(           
           data.get('title'),
            data.get('description')
        )
        
        return recipe_to_update,201
    
    
    @api.marshal_with(recipe_model)
    @api.doc('delete a recipe')
    def delete(self, id):
        """Delete a recipe"""
        recipe_to_Delete = Recipe.query.get_or_404(id)
        recipe_to_Delete.delete()
        return recipe_to_Delete,200


if __name__ == '__main__':
    app.run()
