require("dotenv").config(); //將設定檔引入

const express = require("express");
const multer = require("multer");
// const upload = multer({dest:'tmp_uploads/'}); //設定目的地資料夾 ,/ 有無皆可
const upload = require(__dirname + "/modules/upload-imgs");

const app = express();

//原則上set都要放最前面
app.set("view engine", "ejs"); //註冊ejs

app.use(express.static("public")); //在根目錄
// app.use('/my', express.static('public'));

//Top-level Middleware,放在最前面處理路由,有順序問題
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//有設定路由
app.get("/", (req, res) => {
  res.send("Hello");
});

//建立樣板引擎
app.get("/try-ejs", (req, res) => {
  res.render("a", { name: "Lydia" });
});

app.get("/sales", (req, res) => {
  const sales = require(__dirname + "./../data/sales.json"); //require會存放在記憶體
  // res.json(sales);
  res.render("json", { sales }); //內容變數sales
});

//queryString
app.get("/try-qu", (req, res) => {
  res.json(req.query);
});

//藉由urlencodedParser幫req處理body,urlencoded是body-parser的套件,稱作middleware
// const urlencodedParser = express.urlencoded({extended: false});
// app.post('/try-post', urlencodedParser, (req, res) => {
//     res.json(req.body);
// })
app.post("/try-post", (req, res) => {
  res.json(req.body);
});

//get到這支路由,callback渲染
app.get("/try-post-form", (req, res) => {
  // res.render('try-post-form');
  //res.render('try-post-form', {email:'', password:''}); //塞入空字串
  res.render("try-post-form");
});

app.post("/try-post-form", (req, res) => {
  // res.json(req.body);
  res.render("try-post-form", req.body);
});

app.get("/pending", (req, res) => {});

//上傳單個檔案
app.post("/try-upload", upload.single("avatar"), (req, res) => {
  // res.json(req.file)
  res.json({
    file: req.file,
    body: req.body,
  });
});

//一次上傳多個檔案
app.post("/try-upload2", upload.array("photo"), (req, res) => {
    res.json(req.files)
  });

//錯誤訊息放在所有路由的後面
app.use((req, res) => {
  res.type("text/plain"); //預設會是text/html
  res.status(404).send("找不到頁面");
});

// const port = process.env.PORT || 3000;

app.listen(3000, () => {
  // console.log(`${port}`);
  console.log(3000, new Date());
});
