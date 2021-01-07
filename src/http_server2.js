const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.writeFile(__dirname + '\headers.txt', JSON.stringify(req.headers), (error) => {
        if(! error){
            res.end('ok');
        }else{
            res.end('error:' + error);
        }
    });
})
server.listen(3000);