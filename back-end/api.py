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
        'key': name,
        'name': name,
        'group': group,
        'email': email,
        'phone': phone,
        'admin': False
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
        'id': name,
        'name': name,
        'total': 20,
        'cost': 10,
        'left': 10,
        'users': [{'name': user, 'admin': False} for user in users]
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

@app.route('/getUsers', methods=['GET'])
def getUsers():
    args = request.args
    id = args.get('key', default=None)
    name = args.get('name', default=None)
    email = args.get('email', default=None)
    phone = args.get('phone', default=None)
    pageSize = args.get('pageSize', default=None, type=int)
    page = args.get('page', default=None, type=int)

    result = []
    for account in accounts:
        if id and account['key'] != id: continue
        if name and account['name'] != name: continue
        if email and account['email'] != email: continue
        if phone and account['phone'] != phone: continue
        result.append(account)
    return {
        'code': 200,
        'msg': '',
        'data': {
            'users': result[(page-1)*pageSize : min(page*pageSize,len(result))],
            'total': len(result)
        }
    }

@app.route('/deleteUsers', methods=['POST'])
def deleteUsers():
    ids = request.json
    for id in ids:
        for account in accounts:
            if account['key'] == id:
                accounts.remove(account)
                break

    return {
        'code': 200,
        'msg': '删除成功',
    }

@app.route('/getGroups', methods=['GET'])
def getGroups():
    args = request.args
    id = args.get('id', default=None)
    pageSize = args.get('pageSize', default=None, type=int)
    page = args.get('page', default=None, type=int)

    result = []
    for group in groups:
        if id and group['id'] != id: continue
        result.append(group)
    return {
        'code': 200,
        'msg': '',
        'data': {
            'groups': result[(page-1)*pageSize : min(page*pageSize,len(result))],
            'total': len(result)
        }
    }

@app.route('/deleteGroup', methods=['POST'])
def deleteGroup():
    id = request.json['id']
    print(id)
    for group in groups:
        if group['id'] == id:
            groups.remove(group)
            break

    return {
        'code': 200,
        'msg': '删除成功',
    }

@app.route('/changeGroupUserAdmin', methods=['POST'])
def changeGroupUserAdmin():
    group, user = request.json['group'], request.json['user']
    print('changeGroupUserAdmin')
    print(group)
    print(user)
    return {
        'code':200,
        'msg': '添加用户成功',
        'data': {
            'id': 'changeGroupUserAdmin',
            'name': 'changeGroupUserAdmin',
            'total': 20,
            'cost': 10,
            'left': 10,
            'users': [{'name': 'changeGroupUserAdmin1', 'admin': False}, {'name': 'user2', 'admin': True}]
        }
    }
       
@app.route('/deleteGroupUser', methods=['POST'])
def deleteGroupUser():
    group, user = request.json['group'], request.json['user']
    print('deleteGroupUser')
    print(group)
    print(user)
    return {
        'code':200,
        'msg': '添加用户成功',
        'data': {
            'id': 'deleteGroupUser',
            'name': 'deleteGroupUser',
            'total': 20,
            'cost': 10,
            'left': 10,
            'users': [{'name': 'deleteGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
        }
    }

@app.route('/addGroupUsers', methods=['POST'])
def addGroupUsers():
    users, admin = request.json['account'], request.json['admin']
    print('addGroupUsers')
    print(users)
    print(admin)
    return {
        'code':200,
        'msg': '添加用户成功',
        'data': {
            'id': 'addGroupUser',
            'name': 'addGroupUser',
            'total': 20,
            'cost': 10,
            'left': 10,
            'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
        }
    }

@app.route('/getUsersNotInGroup', methods=['GET'])
def getUsersNotInGroup():
    args = request.args
    groupName = args.get('groupName')
    print('getUsersNotInGroup')
    print(groupName)
    return {
        'code':200,
        'msg': '',
        'data': ['user1', 'user2', 'usernotingroup']
    }


@app.route('/getFundInfoByGroup', methods=['GET'])
def getFundInfoByGroup():
    args = request.args
    groupId = args.get('groupId')
    print('getFundInfoByGroup')
    print(groupId)
    return {
        'code':200,
        'msg': '',
        'data': [{
            'complete': True,
            'fundId': 14,
            'fund': 'dsafsa',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }]
    }

@app.route('/deleteGroupFund', methods=['POST'])
def deleteGroupFund():
    groupId, fundId = request.json['groupId'], request.json['fundId']
    print('deleteGroupFund')
    print(groupId)
    print(fundId)
    return {
        'code':200,
        'msg': '删除成功',
        'data': [{
            'complete': True,
            'fundId': 114514,
            'fund': 'deleteGroupFund',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }]
    }

if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0')