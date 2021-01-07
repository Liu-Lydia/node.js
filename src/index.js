require('dotenv').config(); //將設定檔引入

const express = require('express');

const app = express();

app.set('view engine', 'ejs'); //註冊ejs註冊ejs

app.use(express.static('public')); //在根目錄
// app.use('/my', express.static('public'));

//有設定路由
app.get('/', (req, res) => {
    res.send('Hello');
})

app.get('/try-ejs', (req, res) => {
    res.render('a', {name:'Lydia'});
})

//錯誤訊息放在所有路由的後面
app.use((req, res) => {
    res.type('text/plain'); //預設會是text/html
    res.status(404).send('找不到頁面');
})

// const port = process.env.PORT || 3000;

app.listen(3000, () => {
    // console.log(`${port}`);
    console.log(3000);
})