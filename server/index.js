const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')

app.use(require('cors')()) //允许跨域
app.use(express.json())

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