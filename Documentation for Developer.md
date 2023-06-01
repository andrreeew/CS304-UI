# Documentation for Developer

## Front-end

### Requirement

* Vue >= 3.2.0
* Vuex: 4.0.0
* vue-echarts:  6.2.3
* vue-i18n: 9.2.2
* vue-router: 4.0.3
* arco-design/web-vue:  2.37.3
* nprogress: 0.2.0
* ...
* You can see the entire dependency in "package.json"



### Architecture

```
├── back-end # 假后端
├── README.md
├── package.json
├── src
│   ├── api  # 请求接口
│   ├── assets  # 静态资源
│   ├── components  # 通用业务组件
│   ├── layout  # 布局
│   ├── locale  # 国际化语言包
│   ├── pages  # 页面(主要)
│ 	│ 	├── admin # 管理员界面
│   ├── router # 路由配置
│   ├── store  # 状态管理中心
│   └── utils  # 工具库(包含全局配置)
│   └── App.vue  # 视图入口
│   └── main.js # 入口文件
└── tsconfig.json
```

The main code is in pages, and the architecture of pages is

```
├── pages  # 页面(主要)
│ 	├── admin # 管理员界面
│ 	├── error # 错误处理页面，如404
│ 	├── login # 登入页面
│ 	├── user # 用户页面
```

- The naming method of the page folder is the same as the page url

  example： the page file of “/admin/account"  is the "src/pages/admin/account/index.vue"

- You can see entire urls in "src/router/index.js"







## Back-end

### Requirement

* SpringBoot: 2.3.6
* JDK: 1.8
* MySql: 8.0.31
* knife4j: 3.0.3
* jwt: 0.9.1
* ...
* You can see the entire dependency in "porm.xml"



### Architecture

```
├───common # 常用工具类
│   ├───common-util #常用工具
│   └───service-util # 应用工具
├───model # 实体类
└───service-oa # 应用
    ├───src
    │   ├───main
    │   │   ├───java
    │   │   │   └───edu
    │   │   │       └───sustech
    │   │   │           └───auth
    │   │   │               ├───controller # 控制类
    │   │   │               ├───mapper # mapper进行CURD操作
    │   │   │               └───service # 服务
    │   │   │                   └───impl # 实现类
    │   │   └───resources
    │   │       └───xml # 编写sql语句
    │   └───test # 测试类

```

The main api of backend and description of method and paramters can see in  http://10.16.54.166:80/doc.html#/home

