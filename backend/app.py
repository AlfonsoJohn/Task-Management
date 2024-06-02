from flask import Flask, request, jsonify
from flask_cors import CORS
from dynamodb_interactions import create_task, get_task_by_task_id, update_task, delete_task, dynamodb_item_to_json
from cognito_interactions import sign_in, sign_up, confirm_sign_up


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, Flask is running!'

@app.route('/create-task', methods=['POST'])
def create_task_route():
    if request.method == 'POST':
        task_id = request.json.get('task-id')
        task_name = request.json.get('task_name')
        task_description = request.json.get('task_description')

        # Check if the task creation parameters are provided
        if task_id and task_name and task_description:
            response = create_task(task_id, task_name, task_description)
            return jsonify({'message': 'Task created successfully', 'response': response})
        else:
            return jsonify({'error': 'Missing task creation parameters'}), 400  # Bad request


@app.route('/get-task/<task_id>', methods=['GET'])
def get_task_route(task_id):
    # Your existing logic to fetch the task
    task = get_task_by_task_id(task_id)  # This fetches the raw DynamoDB item
    if task:
        task_json = dynamodb_item_to_json(task)  # Convert to plain JSON
        return jsonify({'task': task_json})
    else:
        return jsonify({'message': 'No task found for the task_id'}), 404



@app.route('/update-task/<task_id>', methods=['PUT'])
def update_task_route(task_id):
    # Access request data
    updated_name = request.json.get('updated_name')
    updated_description = request.json.get('updated_description')

    # Debugging: Print or log the values
    print(f"task-id: {task_id}")
    print(f"updated_name: {updated_name}")
    print(f"updated_description: {updated_description}")

    # Call update_task function
    response = update_task(task_id, updated_name, updated_description)

    if response.get('Attributes'):
        return jsonify({'message': 'Task updated successfully'})
    else:
        return jsonify({'message': 'Failed to update task'})

@app.route('/delete-task/<task_id>', methods=['DELETE'])
def delete_task_route(task_id):
    # Call delete_task function
    deleted = delete_task(task_id)

    if deleted:
        return jsonify({'message': 'Task deleted successfully'})
    else:
        return jsonify({'message': 'Failed to delete task'})

@app.route('/register', methods=['POST'])
def register():
    # Extract user details from the request
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')

    # Call the sign_up function with the provided details
    response = sign_up(username, password, email)

    # Handle the response
    return jsonify(response)


@app.route('/confirm-signup', methods=['POST'])
def confirm_signup():
    confirmation_code = request.json.get('confirmation_code')
    username = request.json.get('username')

    response = confirm_sign_up(username, confirmation_code)

    # Handle the response accordingly
    return jsonify(response)


@app.route('/sign-in', methods=['POST'])
def sign_in_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Call the sign_in function
    result = sign_in(username, password)

    # Return appropriate response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=False)
