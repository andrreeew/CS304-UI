from flask import Flask, send_file, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)




@app.route('/login', methods=['POST'])
def login():
    account, password = request.json['account'], request.json['password']
    if(account=='admin' and password=='12345'):
        return {
            'code': 200,
            'msg': '成功',
            'data': {
                'identity': 'admin',
                'token':'afasfsafawsf',
            }
        }
    
    if(account=='demo_user' and password=='12345'):
         return {
            'code': 200,
            'msg': '成功',
            'data': {
                'identity': 'user',
                'token':'sadqwrwqr'
            }
        }
    
    return {
        'code': 400,
        'msg': '没有此账户或者密码错误',
        'data': None
    }




if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0')