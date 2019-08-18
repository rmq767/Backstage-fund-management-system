const express = require('express')
const router = express.Router()
const passport = require('passport')
const Profile = require('../../../models/Profile')

// GET api/profiles/test
// 返回请求的json数据
// public
// router.get('/test', (req, res) => {
//     res.json({ msg: 'profile works' })
// })

// POST api/profiles/add
// 创建信息接口
// Private
// 私密的传，需要token
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    new Profile(profileFields).save().then(profile => { res.json(profile) })
})

// GET api/profiles
// 获取所有信息
// Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有获取到信息')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// GET api/profiles/:id
// 获取单个信息
// Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有获取到信息')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// POST api/profiles/edit
// 获取单个信息
// Private
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileFields }, //更新的内容
            { new: true } //是否是新的
        )
        .then(profile => { res.json(profile) })
})

// GET api/profiles/delete
// 获取所有信息
// Private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id }).then(profile => {
            profile.save().then(profile => res.json('删除成功'))
        })
        .catch(err => res.status(404).json('删除失败'))
})

module.exports = router