const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const upload = require(__dirname + "/../modules/upload-imgs");
const db = require(__dirname + "/../modules/db_connect2");

//middleware 不同模組各自處理
router.use((req, res, next) => {
  //判斷是不是管理者,否則跳轉至首頁
  if(! req.session.admin){
    return res.redirect('/'); //判斷完直接跳開不執行下面步驟了
  }
  res.locals.baseUrl = req.baseUrl;
  res.locals.url = req.url;
  next();
});

const listHandle = async (req) => {
  const perPage = 10;

  const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
  const totalRows = t_rows[0].num;

  const totalPages = Math.ceil(totalRows / perPage);

  let page = parseInt(req.query.page) || 1;

  let rows = [];
  if (totalRows > 0) {
    if (page < 0) page = 1;
    if (page > totalPages) page = totalPages;

    [
      rows,
    ] = await db.query(
      "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT ?, ?",
      [(page - 1) * perPage, perPage]
    );

    //變更預設日期格式
    rows.forEach((item) => {
      item.birthday = moment(item.birthday).format("YYYY-MM-DD");
    });
  }

  //回傳值
  return {
    perPage,
    totalRows,
    totalPages,
    page,
    rows,
  };
};

router.get("/:sid/edit", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM `address_book` WHERE sid=?", [
    req.params.sid,
  ]);
  if (rows.length !== 1) {
    return res.redirect(res.locals.baseUrl + "/list");
  }

  rows[0].birthday = moment(rows[0].birthday).format("YYYY-DD-MM");
  res.render("address-book/edit", rows[0]);
});

router.post("/:sid/edit", upload.none(), async (req, res) => {
  const { name, email, mobile, birthday, address } = req.body;
  const data = { name, email, mobile, birthday, address };

  const [result] = await db.query("UPDATE `address_book` SET ? WHERE sid=?", [
    data,
    req.params.sid,
  ]);
  //res.json(result);
  res.json({
    success: result.changedRows === 1,
  });
});

router.delete("/:sid", async (req, res) => {
  const [result] = await db.query("DELETE FROM `address_book` WHERE sid=?", [
    req.params.sid,
  ]);
  res.json({
    success: result.affectedRows === 1,
  });
});

router.get("/add", async (req, res) => {
  res.render("address-book/add");
});

router.post("/add", upload.none(), async (req, res) => {
  //const data = { ...req.body }; //解構body

  const { name, email, mobile, birthday, address } = req.body;
  const data = { name, email, mobile, birthday, address };

  data.created_at = new Date();

  const [result] = await db.query("INSERT INTO `address_book` SET ?", [data]);
  console.log(result); //印出加入的陣列

  if (result.affectedRows == 1) {
    res.json({
      success: true,
      body: req.body,
    });
  } else {
    res.json({
      success: false,
      body: req.body,
    });
  }
});

router.get("/list", async (req, res) => {
  const output = await listHandle(req);
  res.render("address-book/list", output);
});

//用json格式
router.get("/api/list", async (req, res) => {
  const output = await listHandle(req);
  res.json(output);
});

module.exports = router;
