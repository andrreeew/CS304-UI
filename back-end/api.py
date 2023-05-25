from flask import Flask, send_file, request
from flask_cors import CORS
import asyncio
import websockets
import json
import threading

app = Flask(__name__)
CORS(app, supports_credentials=True)

clients = []

async def reply(websocket):
    print("New client connected.")
    response = "Welcome to my WebSocket server!"
    await websocket.send(json.dumps({'msg':response}))
    clients.append(websocket)
    try:
        while True:
            message = await websocket.recv()
            print("Received message:", message)
            if message=='permit':
                for c in clients:
                    await c.send(json.dumps({'identity':'user', 'type':'permit', 'msg':'申请已通过'}))
            elif message=='deny':
                for c in clients:
                    await c.send(json.dumps({'identity':'user', 'type':'deny', 'msg':'申请被驳回'}))
                
    except websockets.exceptions.ConnectionClosedOK:
        try:
            clients.remove(websocket)
        except:
            pass
        finally:
            print("Client disconnected.")

def ws():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(websockets.serve(reply, 'localhost', 5002))
    loop.run_forever()
    # asyncio.get_event_loop().run_until_complete(websockets.serve(reply, 'localhost', 5002))
    # asyncio.get_event_loop().run_forever()

t = threading.Thread(target=ws)
t.start()



accounts = []
groups = []
applications = [{
    'key': '1',
    'id': 4214,
    'name': 'getApplications',
    'state': 'complete',
    'group': 'dsafsa',
    'num': 2141,
    'date':'2022-4-9',
    'people':'Xiao Wang',
    'category': '办公费',
    }, {
    'key': '2',
    'id': 424,
    'name': 'Jfsae Doe',
    'state': 'reject',
    'group': 'dsafsa',
    'num': 2141,
    'date':'2023-4-9',
    'people':'Xiao Wang',
    'category': '办公费',
    }, {
    'key': '3',
    'id': 114514,
    'name': 'Jfsae Doe',
    'state': 'underway',
    'group': 'dsafsa',
    'num': 2141,
    'date':'2024-4-9',
    'people':'Xiao Wang',
    'category': '办公费',
    }, {
    'key': '4',
    'id': 425,
    'name': 'Jfsae Doe',
    'state': 'underway',
    'group': 'dsafsa',
    'num': 2141,
    'date':'2025-4-9',
    'people':'Xiao Wang',
    'category': '办公费',
}]
adminMsgs = [
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'1test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'2test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'3test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'4test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'5test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'6test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'7test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'8test msg api'},
    {'type':'系统通知', 'date':'2010-10-1', 'new':True, 'msg':'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'},
    {'type':'审批通知', 'date':'2010-10-1','new':False, 'msg':'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to '}
]

@app.route('/user/login', methods=['POST'])
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
    pageSize = args.get('pageSize', default=100000000, type=int)
    page = args.get('page', default=1, type=int)

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
    groupName = request.json['group']
    users, admin = request.json['form']['account'], request.json['form']['admin']
    print('addGroupUsers')
    print(groupName)
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
    groupId = args.get('groupId')
    print('getUsersNotInGroup')
    print(groupId)
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

@app.route('/getFunds', methods=['GET'])
def getFunds():
    print('getFunds')
    return {
        'code':200,
        'msg': '',
        'data': [{
            'key': '1',
            'id': 4214,
            'name': 'getFunds',
            'dateRange': [5325, 5325],
            'totalNum': 123451,
            'leftNum': 21515,
            'percent': 321,
            'state': 'complete',
            'leftDay': 19,
            'disabled': True,
        },{
            'key': '2',
            'id': 114514,
            'name': 'Fund2',
            'dateRange': [5325, 5325],
            'totalNum': 123451,
            'leftNum': 21515,
            'percent': 321,
            'state': 'complete',
            'leftDay': 19,
            'disabled': True,
        }]
    }

@app.route('/getGroupByFund', methods=['GET'])
def getGroupByFund():
    id = request.args.get('id')
    print('getGroupByFund')
    print(id)
    return {
        'code':200,
        'msg': '',
        'data': [{
            'complete': False,
            'group': 'getGroupByFund',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }, {
            'complete': True,
            'group': 'group2',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }, {
            'complete': True,
            'group': 'group3',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }]
    }

@app.route('/deleteFundGroup', methods=['POST'])
def deleteFundGroup():
    groupName, fundId = request.json['groupName'], request.json['fundId']
    print('deleteFundGroup')
    print(groupName)
    print(fundId)
    return {
        'code':200,
        'msg': '删除成功',
        'data': [{
            'complete': False,
            'group': 'deleteFundGroup',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }, {
            'complete': True,
            'group': 'group2',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }]
    }

@app.route('/addGroupsToFund', methods=['POST'])
def addGroupsToFund():
    groups = request.json['groups']
    fundId = request.json['fundId']
    print('addGroupsToFund')
    print(groups)
    return {
        'code':200,
        'msg': '添加成功',
        'data': [{
            'complete': False,
            'group': 'addGroupsToFund',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }, {
            'complete': True,
            'group': 'group2',
            'total': 2141,
            'cost': 242,
            'left': 155,
            'percent': 241,
        }]
    }

@app.route('/getFundDetailByGroup', methods=['GET'])
def getFundDetailByGroup():
    args = request.args
    print('getFundDetailByGroup')
    print(args.get('fundId'))
    print(args.get('groupId'))
    return {
        'code':200,
        'msg': '',
        'data': [
            {'category1':'getFundDetailByGroup', 'category2':'', 'total':10, 'cost':20, 'left':10, 'new':False},
            {'category1':'Sichuan', 'category2':4, 'total':10, 'cost':20, 'left':10, 'new':True}
        ]
    }

@app.route('/modifyGroupFundDetail', methods=['POST'])
def modifyGroupFundDetail():
    groupId, fundId = request.json['groupId'], request.json['fundId']
    detail = request.json['detail']
    print('modifyGroupFundDetail')
    print(detail)
    return {
        'code':200,
        'msg': '修改成功',
        'data': [
            {'category1':'modifyGroupFundDetail', 'category2':'', 'total':10, 'cost':20, 'left':10, 'new':False},
            {'category1':'Sichuan', 'category2':4, 'total':10, 'cost':20, 'left':10, 'new':True}
        ]
    }

@app.route('/getApplications', methods=['GET'])
def getApplications():
    args = request.args
    page = args.get('page', default=1, type=int)
    print('getApplications')
    print(page)
    return {
        'code':200,
        'msg': '修改成功',
        'data': {
            'data': applications[(page-1)*3 : min(page*3,len(applications))],
            "total": 4
        }
    }

@app.route('/permitApplication', methods=['POST'])
def permitApplication():
    id = request.json['id']
    print('permitApplication')
    print(id)
    return {
        'code':200,
        'msg': '通过成功',
        'data': {}
    }

@app.route('/denyApplications', methods=['POST'])
def denyApplications():
    id = request.json['ids']
    role = request.json['role']
    print('denyApplications')
    print(id)
    print(role)
    return {
        'code':200,
        'msg': '驳回成功' if role == 'admin' else '撤回成功',
        'data': {}
    }

@app.route('/createApplication', methods=['POST'])
def createApplication():
    form = request.json
    print('createApplication')
    print(form)
    return {
        'code':200,
        'msg': '创建申请成功',
        'data': {}
    }

@app.route('/getAdminHomeStatistics', methods=['GET'])
def getAdminHomeStatistics():
    print('getAdminHomeStatistics')
    return {
        'code':200,
        'msg': '',
        'data': {
            'newApplication':1,
            'unserwayApplication':2,
            'newFund':3,
            'underwayFund':4
        }
    }

@app.route('/getGroupStatistics', methods=['GET'])
def getGroupStatistics():
    args = request.args
    groupId = args.get('groupId')
    print('getGroupStatistics')
    print(groupId)
    return {
        'code':200,
        'msg': '',
        'data': {
            'name':'group1',
            'memberNum':2,
            'totalFund':10,
            'usedFund':2,
            'leftFund':8,
            'completeRate':20,
            'complete':True
        }
    }

@app.route('/getFundStatistics', methods=['GET'])
def getFundStatistics():
    args = request.args
    fundId = args.get('fundId')
    print('getFundStatistics')
    print(fundId)
    return {
        'code':200,
        'msg': '',
        'data': {
            'name':'fund1',
            'totalFund':100,
            'left':20,
            'used':80,
            'completeRate':80,
            'complete':True
        }
    }

@app.route('/getApplicationInfo', methods=['GET'])
def getApplicationInfo():
    args = request.args
    fundId = args.get('fundId')
    print('getApplicationInfo')
    print(fundId)
    return {
        'code':200,
        'msg': '',
        'data': {
            'applicationId':1234,
            'fundId':5678,
            'fundName':'fund1',
            'groupName':'group1',
            'groupTotalFund':100,
            'groupUsedFund':20,
            'people':'wang fang',
            'category1':'category1',
            'category2':'category2',
            'useNum':30,
            'summary':'summary',
            'comment':'comment'
        }
    }

@app.route('/getApplicationTimeline', methods=['GET'])
def getApplicationTimeline():
    args = request.args
    fundId = args.get('fundId')
    print('getApplicationTimeline')
    print(fundId)
    return {
        'code':200,
        'msg': '',
        'data': {
            'date1':'2010-10-1',
            'date2': '2011-10-1',
            'state': 'complete',
        }
    }

@app.route('/getAdminMessages', methods=['GET'])
def getAdminMessages():
    args = request.args
    page = args.get('page', default=1, type=int)
    print('getAdminMessages')
    print(page)
    return {
        'code':200,
        'msg': '',
        'data': {
            'data': adminMsgs[(page-1)*4 : min(page*4,len(adminMsgs))],
            "total": len(adminMsgs)
        }
    }

@app.route('/getUserHomeStatistics', methods=['GET'])
def getUserHomeStatistics():
    print('getUserHomeStatistics')
    return {
        'code':200,
        'msg': '',
        'data': {
            'underwayApplication':4,
            'recentApplication':3,
            'permittedApplication':2,
            'rejectedApplication':1
        }
    }

@app.route('/getUserGroups', methods=['GET'])
def getUserGroups():
    print('getUserGroups')
    return {
        'code':200,
        'msg': '',
        'data': [
            {
                'id': '1',
                'name': 'group1',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
            {
                'id': '2',
                'name': 'group2',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
            {
                'id': '3',
                'name': 'group3',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
            {
                'id': '4',
                'name': 'group4',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
        ]
    }

@app.route('/getUserMessages', methods=['GET'])
def getUserMessages():
    args = request.args
    page = args.get('page', default=1, type=int)
    print('getUserMessages')
    print(page)
    return {
        'code':200,
        'msg': '',
        'data': {
            'data': adminMsgs[(page-1)*4 : min(page*4,len(adminMsgs))],
            "total": len(adminMsgs)
        }
    }

@app.route('/addUserToGroups', methods=['POST'])
def addUserToGroups():
    userId = request.json['userId']
    groups, admin = request.json['form']['group'], request.json['form']['admin']
    print('addUserToGroups')
    print(userId)
    print(groups)
    print(admin)
    return {
        'code':200,
        'msg': '添加成功',
        'data': [
            {
                'id': '1',
                'name': 'group1',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
            {
                'id': '2',
                'name': 'group2',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
            {
                'id': '3',
                'name': 'group3',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
            {
                'id': '4',
                'name': 'group4',
                'total': 100,
                'cost': 20,
                'left': 80,
                'users': [{'name': 'addGroupUser1', 'admin': False}, {'name': 'user2', 'admin': True}]
            },
        ]
    }

if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0')