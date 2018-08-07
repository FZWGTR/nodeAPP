// 导入模块
// fs：读取文件
const fs=require('fs');
// http：开启http服务
const http=require('http');
// path：生成绝对路径
const path=require('path');

// 记录网站根目录
let rootPath=path.join(__dirname,'www');
console.log(rootPath);

// 创建服务器
let server=http.createServer((request,response)=>{
    // response.end('hello');
    // 1.生成地址
    let targetPath=path.join(rootPath,request.url)
    console.log(request.url)
    console.log(targetPath);

    // 2.判断文件是否存在
    if(fs.existsSync(targetPath)){

        let stats=fs.stat(targetPath);
        response.setHeader('content-type','text/html;charset=utf-8');
        response.end('存在哦')
    }
    // 不存在
    else{
        response.statusCode=404;
        response.setHeader('content-type','text/html;charset=utf-8');
        response.end(`
        <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
        </body></html>
        `)

    }




})




// 开启服务器
server.listen(8888,'127.0.0.1',()=>{
    console.log('开启成功！')
})