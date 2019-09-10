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
router.get('/search', async(ctx) => {
    let user = null;
    user = await User.find().exec()
    if (user) {
        ctx.body = {
            code:200,
            message: 'success',
            data: {
                user:user
            }
          }
    }
    })
module.exports = router;