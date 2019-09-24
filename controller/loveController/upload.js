const Router = require("koa-router");
const router = new Router();

router.post('/', async (ctx) => {
    ctx.body = {
        message: 'upload succeed.',
        code: 200,
        data: ctx.request.files
    };
});

module.exports = router;