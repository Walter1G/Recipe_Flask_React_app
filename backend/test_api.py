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

    def tearDown(self):
        with self.app.app_context():
            # end session and delete the table for each case
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()
