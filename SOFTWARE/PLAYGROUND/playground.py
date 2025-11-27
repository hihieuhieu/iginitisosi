from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/message')
def get_message():
    return jsonify({'message': 'Hello :)'})

if __name__ == '__main__':
    app.run(debug=True)