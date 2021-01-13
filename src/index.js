require("dotenv").config(); //將設定檔引入

const express = require("express");

const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session); //session參數

const moment = require("moment-timezone");

const db = require(__dirname + "/modules/db_connect2");
const sessionStore = new MysqlStore({}, db); //{}連線資料庫,上面有了所以不用放物件 但要放空物件

const multer = require("multer");
// const upload = multer({dest:'tmp_uploads/'}); //設定目的地資料夾 ,/ 有無皆可
const upload = require(__dirname + "/modules/upload-imgs");

const app = express();

//原則上set都要放最前面
app.set("view engine", "ejs"); //註冊ejs

//設定session
app.use(
  session({
    secret: "fgfdgfssdfdsemhmh", //加密用的字串
    saveUninitialized: false, //沒設定會warning,還沒初始化session要儲存嗎
    resave: false, //沒變更內容是否強制存回
    store: sessionStore, //存在哪(資料庫)
    cookie: {
      maxAge: 1800000, //可有可無 ,30分鐘(5個0)
    },
  })
);

app.use((req, res, next) => {
  res.locals.baseUrl = req.baseUrl;
  res.locals.url = req.url;
  next();
});

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
  res.json(req.files);
});

//Router處理,這個比下面的嚴謹
app.get("/my-params1/:action/:id", (req, res) => {
  res.json(req.params);
});

app.get("/my-params2/:action?/:id?", (req, res) => {
  res.json(req.params);
});

//設定規則
app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3);
  u = u.split("?")[0]; //query string
  // u = u.split('-').join(''); //Array用法
  u = u.replace(/-/g, ""); //g全域 obj用法
  res.send(u);
});

app.use("/ttt", require(__dirname + "/routes/admins2")); //route本身就是middleware

app.use("/", require(__dirname + "/routes/admins2")); // '/'有跟沒有一樣,與上面是同個router處理

app.get("/try-session", (req, res) => {
  req.session.my_var = req.session.my_var || 0; //有無session 預設為0
  req.session.my_var++;
  res.json({
    my_var: req.session.my_var,
    session: req.session,
  });
});

app.get("/try-moment", (req, res) => {
  const fm = "YYYY-MM-DD HH:mm:ss";
  const m1 = moment();
  const m2 = moment("02/29/20", "MM/DD/YY");
  res.json({
    m1: m1.format(fm),
    m1a: m1.tz("Europe/London").format(fm),
    m2: m2.format(fm),
    m2a: m2.tz("Europe/London").format(fm),
  });
});

// app.get("/try-db", (req, res) => {
//   db.query(
//     "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT 6"
//   ) //promise是陣列[]
    //rows取第1筆資料
    // .then(([rows]) => {
      //沒回應會一直padding
//       res.json(rows);
//     });
// });

app.get("/try-db", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT 6"
  )
   res.json(rows)
});

//第一個address-book是路由模組,第二個是路徑
app.use('/address-book', require(__dirname + '/routes/address-book'));

app.use('/address-book2', require(__dirname + '/routes/address-book2'));

app.use('/address-book3', require(__dirname + '/routes/address-book3'));

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
