const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../../models/User')

// GET api/users/test
// 返回请求的json数据
// public
router.get('/login', (req, res) => {
    res.json({ msg: 'login works' })
})

// POST api/users/register
// 返回请求的json数据
// public
router.post('/register', (req, res) => {
    //查询数据库中是否有邮箱
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json('邮箱已被注册')
            } else {
                // 获取头像
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'rg', d: 'mm' })

                const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        avatar,
                        password: req.body.password,
                        identity: req.body.identity
                    })
                    /* bcrypt.genSalt(加密方式，function(){
                        bcrypt.hash(需要加密的密码,salt,箭头函数)
                    }) */
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// POST api/users/login
// 返回token jwt password数据
// public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
        // 查询数据库
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json('用户不存在')
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //jwt.sign('规则','加密名字','过期时间','箭头函数')生成一个token
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        jwt.sign(rule, 'secret', { expiresIn: 36000 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                // 这里token必须加'Bearer '
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        return res.status(400).json('密码错误')
                    }
                })
        })
})

// GET api/users/current
// return current user
// private
// 用passport去验证token
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // passport.js中返回了user，这里就用req.user接受
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})

module.exports = router