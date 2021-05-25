rollup.config.js
改moduleName 为export出来的类名

package.json
改name为要输出的文件名

本sdk框架采用config接口注入权限校验配置的方法

接入文档模板参考 https://www.showdoc.cc/893799497216534?page_id=4777858918867418

验证服务器需实现
一个接口

/generateJSSDKTicket

一个中间件

/verify-sdk-sign

上传文件
需要在common/upload那里更改上传的目标文件目录名
执行
```
npm run upload
```


