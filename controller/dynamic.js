'use strict';
// const mongoose = require('mongoose');
const Router = require("koa-router");
const router = new Router();
const Dynamic = require('../schemas/dynamicSchema');
const Lover = require('../schemas/loverSchema');
const Home = require('../schemas/loveHomeSchema');
// const utils = require('../utils');

// 查询
/*
 * * @desc 查询
 * @url '/community_manage/dynamic/search'
 * @params [String] _id @desc _id
 * */
router.get('/search', async (ctx) => {
  let id = ctx.request.query.id;
  console.log(id)
  const dynamic = await Dynamic.find({home: id},{},{news:true}).skip(0).limit(10).populate('author').exec();
  if (dynamic) {
    ctx.body = {
      code: 200,
      message: 'find succeed.',
      data: dynamic
    }
  }
});

// 查询
/*
 * * @desc 查询
 * @url '/community_manage/dynamic/save'
 * @params [String] authorId @desc 创建者id
 * @params [String] homeId @desc 小屋id
 * */
router.post('/save', async (ctx) => {
  let homeId = ctx.request.body.homeId;
  let authorId = ctx.request.body.authorId;
  let content = ctx.request.body.content;
  const dynamic = new Dynamic({
    author: authorId,
    home: homeId,
    content: content,
    type: 1 // 默认私有
  });
  dynamic.save();
  const lover = await Lover.findOne({_id:authorId}).exec();
  lover.dynamic.push(dynamic);
  lover.save();
  const home = await Home.findOne({_id:homeId}).exec();
  home.dynamic.push(dynamic);
  home.save();
  ctx.body = {
    code: 200,
    message: 'save succeed',
    data: null
  };
});

module.exports = router;