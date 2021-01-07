const http = require("http");

const fs = require("fs");

const server = http.createServer((req, res) => {
  //非同步
  fs.promises
    .writeFile(__dirname + "headers3.txt", JSON.stringify(req.headers))
    //callback
    .then(() => {
      res.end("ok");
    })
    .catch((ex) => {
      res.end("error:" + ex);
    });
});
server.listen(3000);
