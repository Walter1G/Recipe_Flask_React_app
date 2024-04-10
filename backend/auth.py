from flask_restx import Resource, Namespace, fields
from models import User
from flask import request,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token,create_refresh_token, jwt_required



auth_ns = Namespace('auth', description='A namespace for Authentication')

signup_model = auth_ns.model(
    "User",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model=auth_ns.model(
    "Login",
    {
        "username": fields.String(),       
        "password": fields.String()
    }
)

@auth_ns.route('/signup')
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')

        db_email = User.query.filter_by(email=email).first()
        db_username = User.query.filter_by(username=username).first()

        if db_username is not None:
            return jsonify({
                "message": "Username already Exist"
            })

        if db_email is not None:
            return jsonify({
                "message": "Email already Exist"
            }) 

        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(
                data.get('password')
            )

        )

        new_user.save()
        return {
            "message": f"User {new_user.username} created successfully"}, 201


@auth_ns.route('/login')
class LogIn(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        db_user = User.query.filter_by(username=username).first()      
        
        
        # access_token= create_access_token(identity=)
        
        if db_user is None:
            return {"message":"User does not exist"},404
        
        if db_user and check_password_hash(db_user.password,password):
            
            access_token=create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            
            return jsonify({
                "access_token":access_token,
                "refresh_token":refresh_token
            })
