from flask import make_response, json
from main import create_app
import unittest
from config import TestConfig
from exts import db


class APITestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(TestConfig)
        # client : interface to test the app, able to make requests

        self.client = self.app.test_client(self)

        with self.app.app_context():
            # db.init_app(self.app)
            db.create_all()

    def test_hello(self):
        # create resp then assert
        hello_resp = self.client.get('/recipes/hello')
        json = hello_resp.json
        # print(json)

        self.assertEqual(json, {"message": "Hello World"})

    def test_signup(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password"}
        )
        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

    def test_login(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password"}
        )

        json = {
            "username": "testuser",
            "password": "password"}

        login_response = self.client.post('/auth/login', json=json)
        status_code = login_response.status_code
        # print(status_code)
        self.assertEqual(status_code, 200)

    def test_get_all_recipes(self):
        """TEST GET ALL RECIPES"""
        response = self.client.get('/recipes/recipes')
        # print(response.json)
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_get_one_recipe(self):
        """TEST GET ONE RECIPE"""
        id = 1
        response = self.client.get(f'/recipes/recipe/{id}')
        status_code = response.status_code
        self.assertEqual(status_code, 404)

    def test_create_recipe(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password"}
        )

        login_json = {
            "username": "testuser",
            "password": "password"}

        login_response = self.client.post('/auth/login', json=login_json)

        access_token = login_response.json['access_token']

        create_recipe_response = self.client.post(
            '/recipes/recipes',
            json={
                "title": "Test Recipe",
                "description": "This is a test description",
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = create_recipe_response.status_code
        print("Create")
        print(create_recipe_response.json)

        self.assertEqual(status_code, 201)

        # self.assertEqual(status_code,201)

    def test_update_recipe(self):
        print('\n')
        print('\n')
        print('\n')
        print('\n')
        print('update')
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password"}
        )

        login_json = {
            "username": "testuser",
            "password": "password"}

        login_response = self.client.post('/auth/login', json=login_json)

        access_token = login_response.json['access_token']

        create_recipe_response = self.client.post(
            f'/recipes/recipes',
            json={
                "title": "Create Test Recipe",
                "description": "This is a test description",
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )

        print('created for update')
        print(create_recipe_response.json)

        id = 1
        # get_one = self.client.get(f'/recipes/recipe/{id}')
        # print(get_one.json)

        update_recipe_response = self.client.put(
            f'/recipes/recipes/{id}',
            json={
                "title": "Updated cookie",
                "description": "updated description"
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = update_recipe_response.status_code

        print('\n\n\nUpdated')
        print(update_recipe_response.json)

        self.assertEqual(status_code, 201)

    def test_delete_recipe(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password"}
        )

        login_json = {
            "username": "testuser",
            "password": "password"}

        login_response = self.client.post('/auth/login', json=login_json)

        access_token = login_response.json['access_token']
        
        create_recipe_response = self.client.post(
            f'/recipes/recipes',
            json={
                "title": "Create Test Recipe",
                "description": "This is a test description",
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )

        print('created for Delete')
        print(create_recipe_response.json)
        
        
        id = 1
        delete_response = self.client.delete(f'/recipes/recipe/{id}')
        status_code= delete_response.status_code
        
        self.assertEqual(status_code,200)     

      
      

    def tearDown(self):
        with self.app.app_context():
            # end session and delete the table for each case
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()
