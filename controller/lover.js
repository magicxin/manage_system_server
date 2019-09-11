'use strict';
const Router = require("koa-router");
const createToken = require("../token/createToken");
const router = new Router();
const Lover = require('../schemas/loverSchema');

/*
 * @desc 查询
 * @url '/community_manage/lover/search'
 * @params [String] pagesize @desc 条数
 * */
router.get('/search', async (ctx) => {
    let _id = ctx.request.query.id;
    let lover = await Lover.find({_id: _id}).exec();
    ctx.body = {
        code: 200,
        message: 'search success.',
        data: {
            user: lover
        }
    }
})
// /*
//  * @desc 查看是否绑定过
//  * @url '/community_manage/lover/valid'
//  * @params [String] pagesize @desc 条数
//  * */
// router.get('/valid', async (ctx) => {
//     let _id = ctx.request.query.id;
//     let lover = await Lover.find({_id: _id}).exec();
//     ctx.body = {
//         code: 200,
//         message: 'search success.',
//         data: {
//             user: lover
//         }
//     }
// })
/*
 * @desc 绑定注册
 * @url '/community_manage/lover/save'
 * @params [String] params @desc 微信的 userInfo
 * @params [String] openid @desc 微信的 openid
 * */
router.post('/save', async (ctx) => {
    let params = ctx.request.body;
    let lover = await Lover.find({openid: params.openid}).exec();
    if (lover.length > 0) {
        ctx.body = {
            code: 501,
            message: 'user already exist.',
            data: {
                user: lover
            }
        }
    } else {
        const lover = new Lover(ctx.request.body);
        await lover.save();
        ctx.body = {
            code: 200,
            message: 'create success.',
            data: {
                user: lover
            }
        }
    }
});

/*
 * @desc 绑定情侣
 * @url '/community_manage/lover/bind'
 * @params [String] ObjectId @desc 情侣的 ObjectId
 * */
router.post('/bind', async (ctx) => {
    let idOwn = ctx.request.body.id1;
    let idHis = ctx.request.body.id2;
    // if (idOwn.match(/^[0-9a-fA-F]{24}$/)) {
    //     // Yes, it's a valid ObjectId, proceed with `findById` call.
    // }
    let lovers = await Lover.find({ _id: { $in: [idOwn, idHis] } }).exec();
    lovers[0].companion = idHis;
    lovers[0].save();
    lovers[1].companion = idOwn;
    lovers[1].save();

    ctx.body = {
        code: 200,
        message: 'bind success.',
        data: {
            user: lovers
        }
    };
});
module.exports = router;