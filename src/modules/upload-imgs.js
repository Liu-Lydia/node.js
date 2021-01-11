const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); //將v4更名為uuidv4,隨機固定長度的檔名(uuid是個套件)

//物件 附檔名對應mimetype
const extMap = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
};

//給設定
const storage = multer.diskStorage({
  //存哪裡
  destination: function (req, file, cb) {
    //null位置釋放錯誤用的,沒有先錯誤所以放null
    cb(null, __dirname + "/../../public/img"); //放img客戶端才看得到
  },
  //檔案名稱
  filename: function (req, file, cb) {
    cb(null, uuidv4() + extMap[file.mimetype])
  },
});

//篩選決定要不要存入
const fileFilter = function (req, file, cb) {
  cb(null, !!extMap[file.mimetype]); //字串轉換成布林值,判斷是不是exMap(它是字串)
};

//匯出
module.exports = multer({storage, fileFilter})
