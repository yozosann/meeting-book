var request = require('request');
var moment = require('moment');

var url = 'https://123.sankuai.com/meeting/api/meeting/saveAppointment';

var paramJson = {
  "title": "周会",
  "startTime": null,
  "endTime": null,
  "atUser": [
    { "email": "yangtianjie@meituan.com", "name": "杨天杰", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile1/a2b096f1-9eba-48c3-835a-e42d21af39b7_200_200", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null }
  ],
  "notifyTime": 10,
  "bookType": 2,
  "room": null
};

var opt = {
  url: url,
  header: {
    'Origin': 'https://123.sankuai.com',
    'content-type': 'application/json',
    'accept': 'application/json',
    'Referer': 'https://123.sankuai.com/huiyi/',
    'Connection': 'keep-alive'
  },
  jar: null,
  json: null
};

function meeting(setTime, bookTime, minutes, weekday, room, cookieString, atUser) {
  var timer;

  var j = request.jar();
  var cookie = request.cookie(cookieString);
  j.setCookie(cookie, url);

  opt.jar = j;

  paramJson.room = room;

  if(atUser) {
    paramJson.user = atUser;
  }

  return function cycleBook() {
    timer = setInterval(function() {
      if(moment().weekday() == weekday && moment() > moment().set(bookTime)) {
        console.log('开始预定...');

        // 因为最多只能抢13天后的会议室
        startTime = moment().add(13, 'days').set(setTime);
        
        paramJson.startTime = startTime.valueOf();
        paramJson.endTime = startTime.add(minutes, 'minute').valueOf();

        opt.json = paramJson;

        book(opt, function() {
          console.log('预定成功...');
          clearInterval(timer);
          setTimeout(cycleBook, 60 * 60 * 24 * 7 * 1000 - 500);
        });
      } else {
        // console.log('时间未到...');
      }
    }, 1000)
  }
}

function book(options, cb) {
  request.post(options, function (err, response, body) {
    if (err) {
      console.log(err);
      return;
    }

    body && console.log(body.data);

    if(!body.data.errorCode) {
      cb();
    } else {
      console.log('下一秒继续抢...')
    };
  })
}

module.exports = meeting;