from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required
from models import Recipe
from flask import request


recipe_ns = Namespace("recipe", description='A namespace for Recipes')

# model (Serializer)
recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)

@recipe_ns.route('/recipes')
class RecipesResource(Resource):
    @recipe_ns.marshal_list_with(recipe_model)
    @recipe_ns.doc('Get all recipes')
    def get(self):
        """ Get all Recipes"""
        recipes = Recipe.query.all()

        return recipes

    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.doc('Create a new recipe')
    @jwt_required()
    def post(self):
        """Create a new Recipe"""
        data = request.get_json()
        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description'))
        new_recipe.save()

        return new_recipe, 201


@recipe_ns.route('/recipes/<int:id>')
class RecipeResource(Resource):
    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.doc('get  a specific recipe by id')
    def get(self, id):
        """Get a recipe by ID"""
        recipe = Recipe.query.get_or_404(id)

        return recipe, 200

    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.doc('Update a recipe')
    @jwt_required()
    def put(self, id):
        """Update a recipe by id"""
        data = request.get_json()
        recipe_to_update = Recipe.query.get_or_404(id)
        recipe_to_update.update(
            data.get('title'),
            data.get('description')
        )

        return recipe_to_update, 201

    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.doc('delete a recipe')
    @jwt_required()
    def delete(self, id):
        """Delete a recipe"""
        recipe_to_Delete = Recipe.query.get_or_404(id)
        recipe_to_Delete.delete()
        return recipe_to_Delete, 200

