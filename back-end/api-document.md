所有返回数据的格式都为
~~~json
{
    code: ...
    msg: ...,
    data: {
        ...
    },
}
~~~
文档中的返回只指data的值，msg，code的值后端自己定


###### 用户登录
[POST]  /login JSON

~~~json
{
    account: 'admin', //用户账号，必须
    passowrd: 141242, //用户密码，必须
}
~~~
返回
~~~json
成功：
    {
        identity: 'admin', //账号身份，返回'admin'或'user'
        token: 'fasfafa', //token
    }

失败：
    None
~~~

###### 创建账号

[POST]  /createAccount JSON

~~~json
{
		name: '1' //用户名
		group: ['group1', 'group2'] //所属的组名
		email: '1@qq,com' //邮箱
		phone: '11111111111' //电话
}
~~~

返回

~~~
None
~~~

###### 创建课题组

[POST]  /createGroup JSON

~~~json
{
		name: 'group1' //课题组名
		users: ['1', '2'] //课题组成员
}
~~~

返回

~~~
None
~~~

