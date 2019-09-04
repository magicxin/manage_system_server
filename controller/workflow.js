'use strict';
const mongoose = require('mongoose');
const Router = require("koa-router");
const router = new Router();
const Workflow = require('../schemas/WorkflowSchema');
// 创建资讯
/*
 * * @desc 保存
 * @url '/community_manage/news/save'
 * @params [String] title @desc 标题
 * @params [String] sub @desc 副标题
 * @params [Array] images @desc 图片
 * @params [String] content @desc 正文
 * @params [String] type @desc 资讯类型
 * @params [String] user @desc 用户Oid
 * */
router.post('/save', async(ctx) => {
  let content = ctx.request.body.content
  let _id = ctx.request.body._id
  if(_id) {
    const workflow = await Workflow.findOneAndUpdate({_id:_id, content: content})
    
    if(workflow) {
      ctx.body = {
        code: 200,
        message: '保存成功',
        data: {
            workflow:workflow
          }
        }
    }
  }else {
    const workflow = new Workflow({
      content : content
    })
    workflow.save()
    console.log(workflow)
    ctx.body = {
    code: 200,
    message: '创建成功',
    data: {
        workflow:workflow
      }
    }
  }
})
// 查询详情
/*
 * * @desc 详情
 * @url '/community_manage/news/searchById'
 * @params [String] _id @desc 资讯id
 * */
router.get('/searchById', async(ctx) => {
  let _id = ctx.request.query._id
  let workflow = await Workflow.findOne({_id:_id}).exec()
  
  ctx.body = {
    code: 200,
    message: '查询成功',
    data: workflow
  }
})

module.exports = router;