const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('Users')

// options 是一个对象文字，包含控制从请求中提取或验证令牌的方式的选项。
var opts = {}
// jwtFromRequest（REQUIRED）接受请求作为唯一参数并将JWT作为字符串返回或返回null的函数。
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// secretOrKey是一个字符串或缓冲区，包含用于验证令牌签名的秘密（对称）或PEM编码的公钥（非对称）。除非secretOrKeyProvider提供，否则必须提供。
opts.secretOrKey = 'secret'


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        //jwt_payload 是包含已解码的JWT有效负载的对象文字。
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)// done(error, user, info)
                } else {
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
    }))
}