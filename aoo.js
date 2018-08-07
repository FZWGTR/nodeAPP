// 1.导入模块

// 1.1读取文件
const fs = require('fs');
// 1.2开启http服务
const http = require('http');
// 1.3生成绝对路径
const path = require('path');
// 1.4引入第三方模块
const mime = require('mime')

// 2.记录网站根目录
let rootPath = path.join(__dirname, 'www');
// console.log(rootPath);

// 3.创建服务器
let server = http.createServer((request, response) => {

    // 5.生成地址(拼接根目录地址与请求文件的地址)
    let targetPath = path.join(rootPath, request.url)
    console.log(targetPath);
    console.log(request.url);

    // 6.判断文件是否存在
    if (fs.existsSync(targetPath)) {

        // 7.判读是文件还是文件夹
        fs.stat(targetPath, (err, stats) => {

            // 8.是文件则直接读取并且返回
            if (stats.isFile()) {

                // 8.1.使用mime设置类型
                response.setHeader('content-type', mime.getType(targetPath));

                // 8.2.读取文件并返回
                fs.readFile(targetPath, (err, data) => {
                    // 8.3.数据读取完毕（返回）
                    response.end(data);
                })
            }
            // 9.是文件夹，则渲染出列表
            if (stats.isDirectory()) {

                // 10.读取文件夹信息
                fs.readdir(targetPath, (err, files) => {

                    // 10.1声明一个变量存储模板
                    let tem = '';

                    // 10.2遍历读取到的文件夹
                    for (let i = 0; i < files.length; i++) {
                        tem += `
                        <li>
                            <a href="${request.url}${request.url == '/' ? '' : '/'}${files[i]}">${files[i]}</a>
                        </li>
                        `
                    }


                    // 11.读取完毕之后再返回
                    response.end(`
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                <html>
              
                <head>
                  <title>Index of/ </title>
                </head>
              
                <body>
                  <h1>Index of ${request.url}</h1>
                  <ul>
                      ${tem}
                  </ul>
                </body>
              
                </html>
                `);


                })

            }

        })

    }
    // 6.1如果不存在
    else {

        // 6.2状态码显示为404
        response.statusCode = 404;
        response.setHeader('content-type', 'text/html;charset=utf-8');
        // 6.3返回请求体
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


// 4.开启服务器
server.listen(3300, '127.0.0.1', () => {
    console.log('开启成功！')
})