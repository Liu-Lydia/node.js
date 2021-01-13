const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../modules/db_connect2");

const listHandle = async (req, res) => {
  
  const perPage = 10;

  const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
  const totalRows = t_rows[0].num;

  const totalPages = Math.ceil(totalRows / perPage);

  let page = parseInt(req.query.page) || 1;

  let rows = [];
  if(totalRows > 0){
    if(page < 0) page = 1;
    if(page > totalPages) page = totalPages;

    [rows] = await db.query(
      "SELECT * FROM `address_book` ORDER BY `address_book`.`sid` DESC LIMIT ?, ?",
      [(page - 1) * perPage, perPage] 
    );
  }


  res.render('address-book/list', {
    perPage,
    totalRows,
    totalPages,
    page,
    rows,
  });

};

router.get('/list', listHandle)
router.get('/', listHandle)

module.exports = router;
