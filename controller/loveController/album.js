'use strict';
const Router = require("koa-router");
const router = new Router();
const Album = require('../../schemas/albumSchema');
/*
 * @desc 查询
 * @url '/community_manage/lover/search'
 * @params [String] id @desc Lover id
 * */
router.get('/list', async (ctx) => {
  let _id = ctx.request.query.id;
  let album = await Album.find({ home: _id }).exec();
  if (album) {
    ctx.body = {
      code: 200,
      message: 'list success.',
      data: {
        album: album
      }
    }
  }
})

module.exports = router;