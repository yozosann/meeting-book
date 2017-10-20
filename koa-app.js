const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');
const router = require('koa-route');
const koabody = require('koa-body');
const meeting = require('./meeting-booking.js');
const meetingInfo = require('./config');

let book = meeting(meetingInfo.setTime, meetingInfo.bookTime, meetingInfo.minutes, meetingInfo.weekday, meetingInfo.room, meetingInfo.atUser);
let timer;

const main = serve(path.join(__dirname));

let startRouter = router.post('/start', ctx => {
  let data = ctx.request.body;

  timer = book('ssoid=' + data.ssoid + ';misId=yangtianjie;');

  timer && console.log('抢会议室脚本已开始执行...');
  ctx.response.body = '抢会议室脚本已开始执行...';
});

let getRouter = router.get('/get', ctx => {
  if(timer) {
    ctx.response.body = '目前正在抢会议室...';
  }else {
    ctx.response.body = '目前未抢会议室...';
  }
});

let endRouter = router.get('/end', ctx => {
  clearInterval(timer);
  timer = null;

  ctx.response.body = '已结束定时抢会议室...';
});

app.use(koabody({}));
app.use(main);

app.use(getRouter);
app.use(startRouter);
app.use(endRouter);

app.listen(3000);