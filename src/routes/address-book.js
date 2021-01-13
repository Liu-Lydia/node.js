const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../modules/db_connect2");

router.get('/list', async (req, res) => {
  //   const output = {
  //     perPage: 10, //一頁幾筆
  //   };
  const perPage = 10;

  //幾筆資料
  //   const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
  //   output.totalRows = t_rows[0].num;

  const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
  const totalRows = t_rows[0].num;

  //總共頁數
  //   output.totalPages = Math.ceil(output.totalRows / output.perPage);

  const totalPages = Math.ceil(totalRows / perPage);

  let page = parseInt(req.query.page) || 1; //頁面=整數

  let rows = []; //在外面宣告rows 
  if(totalRows > 0){
    if(page < 0) page = 1;
    //{return res.redirect('/address-book/list');}
    if(page > totalPages) page = totalPages;
    //{return res.redirect(`/address-book/list?page=${totalPages}`);}

    [rows] = await db.query(
      "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT ?, ?",
      [(page - 1) * perPage, perPage] 
    );
  }

  //   const [rows] = await db.query(
  //     "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT ?, ?",
  //     [(page - 1) * output.perPage, output.perPage] //從第幾筆開始,幾筆
  //   );

  // const [rows] = await db.query(
  //   "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT ?, ?",
  //   [(page - 1) * perPage, perPage] //從第幾筆開始,幾筆
  // );

  //   output.rows = rows;

  res.render('address-book/list', {
    perPage,
    totalRows,
    totalPages,
    page,
    rows,
  });

  // res.json({
  //   perPage,
  //   totalRows,
  //   totalPages,
  //   rows,
  // });

});

module.exports = router;
