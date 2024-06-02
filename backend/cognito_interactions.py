import boto3
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION")

# Initialize Cognito client
client = boto3.client('cognito-idp', region_name=AWS_DEFAULT_REGION)

def sign_up(username, password, email):
    try:
        response = client.sign_up(
            ClientId=CLIENT_ID,
            Username=username,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                }
            ]
        )
        return response
    except client.exceptions.UsernameExistsException:
        return {"error": "Username already exists"}

def confirm_sign_up(username, confirmation_code):
    try:
        response = client.confirm_sign_up(
            ClientId=CLIENT_ID,
            Username=username,
            ConfirmationCode=confirmation_code
        )
        return response
    except client.exceptions.CodeMismatchException:
        return {"error": "Invalid confirmation code"}

def sign_in(username, password):
    print("CLIENT_ID", CLIENT_ID)
    try:
        response = client.initiate_auth(
            ClientId=CLIENT_ID,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password,
            },
        )
        # Extract and return tokens or user information from the response
        return response
    except client.exceptions.NotAuthorizedException:
        return {"error": "Incorrect username or password"}
    except client.exceptions.UserNotFoundException:
        return {"error": "User not found"}
# ... (previous code)