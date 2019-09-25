const Router = require("koa-router");
const router = new Router();
var koaBody = require("koa-body");
const path = require('path');
const { getUploadDirName, getUploadFileExt, mkdirAsync, checkMimeType, handleFileName } = require('../../utils');

let middleware = {
  multipart:true, // 支持文件上传
  encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'../../public/uploads'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // 获取文件后缀
      // const ext =getUploadFileExt(file.name);
      const mimetype = checkMimeType(file.type);
      console.log(__dirname)
      // 最终要保存到的文件夹目录
      const dir = path.join(__dirname,`../../public/uploads/${mimetype}/${getUploadDirName()}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      mkdirAsync(dir, () => {});
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${handleFileName(file.name)}`;
    },
  }
};

router.post('/', koaBody(middleware), async (ctx) => {
  const files = ctx.request.files.file;
  let urls = [];
  let complete = false;
  if (Number(ctx.request.body.count) === (Number(ctx.request.body.index) + 1)) {
    complete = true;
  }
  if (Array.isArray(files)) {
    files.forEach(item => {
      let pathArr = item.split('\\public\\uploads');
      let path = `public/uploads${pathArr[1]}`.replace(/^public(\\|\/)/, '/');
      urls.push((path.replace(/\\/g,'\/')));
    });
  } else {
    let pathArr = files.path.split('\\public\\uploads');
    let path = `public/uploads${pathArr[1]}`.replace(/^public(\\|\/)/, '/');
    urls.push((path.replace(/\\/g,'\/')));
  }
  
  ctx.body = {
    message: 'upload succeed.',
    code: 200,
    data: {
      complete: complete,
      urls: urls
    }
  };
});

module.exports = router;