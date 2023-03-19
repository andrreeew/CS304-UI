from flask import Flask, send_file, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

accounts = []
groups = []

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

@app.route('/createAccount', methods=['POST'])
def createAccount():
    print(request.json)
    name, group, email, phone = request.json['name'], tuple(request.json['group']), request.json['email'], request.json['phone']
    if (name in [account['name'] for account in accounts]):
        return {
            'code': 400,
            'msg': '用户名已存在',
            'data': None
        }
    accounts.append({
        'name': name,
        'group': group,
        'email': email,
        'phone': phone
    })
    return {
        'code': 200,
        'msg': '成功创建用户',
        'data': None
    }

@app.route('/createGroup', methods=['POST'])
def createGroup():
    name, users = request.json['name'], request.json['users']
    if (name in [group['name'] for group in groups]):
        return {
            'code': 400,
            'msg': '课题组名已存在',
            'data': None
        }
    groups.append({
        'name': name,
        'users': users
    })
    return {
        'code': 200,
        'msg': '成功创建课题组',
        'data': None
    }

@app.route('/getAllAccountName', methods=['GET'])
def getAllAccountName():
    return {
        'code': 200,
        'msg': '',
        'data': [account['name'] for account in accounts]
    }

@app.route('/getAllGroupName', methods=['GET'])
def getAllGroupName():
    return {
        'code': 200,
        'msg': '',
        'data': [group['name'] for group in groups]
    }

if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0')