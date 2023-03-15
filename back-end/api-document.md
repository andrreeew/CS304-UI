所有返回数据的格式都为
~~~
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
~~~
{
    account: 'admin', //用户账号，必须
    passowrd: 141242, //用户密码，必须
}
~~~
返回
~~~
成功：
    {
        identity: 'admin', //账号身份，返回'admin'或'user'
        token: 'fasfafa', //token
    }

失败：
    None
~~~


