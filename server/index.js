const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')

app.use(require('cors')()) //允许跨域
app.use(express.json())

// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Custom-Header, Upgrade-Insecure-Requests");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     if (req.method == "GET") {
//         res.sendStatus(200)
//     } else {
//         next();
//     }
// });

// 引入users.js
const users = require('../src/routes/api/users')
const profiles = require('../src/routes/api/profile')



// 使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const mongoose = require('mongoose') //链接数据库
mongoose.connect('mongodb://localhost:27017/backstage', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})

// passport初始化
app.use(passport.initialize())
    // 把passport传递过去，就可以在另一个文件中写了
require('../config/passport')(passport);

app.use('/api/users', users)
app.use('/api/profiles', profiles)

app.listen(3000, () => {
    console.log('running')
})