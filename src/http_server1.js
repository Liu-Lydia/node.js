const http = require("http"); //命名沒有一定要字首大寫,'http'是套件id

const server = http.createServer((req, res) => {
  //200是http狀態碼,200是正常狀態
  //設定檔頭
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  res.end(`<h2>Hello 你好</h2>
             <p>${req.url}</p>
             `);
});

server.listen(3000);
