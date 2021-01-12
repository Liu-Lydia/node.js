//路由模組化,將功能放在這
const express = require('express');
const router = express.Router(); //router命名是習慣用法

//middleware 處理 要有next()接下去
router.use((req, res, next) => {
    res.locals.lydia = '888'; //middleware 裡的訊息用locals包裝
    next();
})

const handle1 = (req, res) =>{
    res.json({
        params:req.params,
        url:req.url,
        baseUrl:req.baseUrl, //基底url
        locals:res.locals,
    })
}

router.get('/admins2/:p1?/:p2?', handle1);
router.get('/admins2a/:p1?/:p2?', handle1);

module.exports = router;