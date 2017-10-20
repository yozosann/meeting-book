var Meeting = require('./meeting-booking.js');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('请输入ssoid：');

// at的同事信息数组
var atUser = [
  { "email": "chenwenbin03@meituan.com", "name": "陈文彬", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile4/e2558f1e-e12c-416d-a440-0a05199fd5d6", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "chufei@meituan.com", "name": "储飞", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile7/b992de3c-78c3-40fa-8b62-29ea538994f1", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "chenjianwei04@meituan.com", "name": "陈建伟", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile10/67b74f70-e5af-4dad-8dd0-d685a9f9811a", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "zhanghanbing@meituan.com", "name": "张寒冰", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile12/d49a5928-149c-4b29-b0e9-99aed223f3fd_200_200", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "luoyunjiao@meituan.com", "name": "罗运姣", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile14/cd14aa20-097e-4b32-b3ea-77c65f112793", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "yangtianjie@meituan.com", "name": "杨天杰", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile1/a2b096f1-9eba-48c3-835a-e42d21af39b7_200_200", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "fangtao04@meituan.com", "name": "方涛", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile6/2ae163f1-e40d-4e5a-942b-dfbd9f575ccd_200_200", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "xiaowensheng@meituan.com", "name": "肖文盛", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile7/d63ec9c6-69b1-4a69-8e0d-e978a38fbeaf", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null },
  { "email": "dangxiaoli@meituan.com", "name": "党晓丽", "empId": null, "icon": "https://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile8/eef9213c-fef8-4831-ada3-ca9b29d2d0bd", "deptName": null, "deptId": null, "mis": null, "phone": null, "admin": null, "tenantId": null }
];
// 抢哪个会议室
var room = {
  "id": 597,
  "email": "room-hd-4b-o-huizhouting@meituan.com",
};
// cookie信息
// var cookieString = 'ssoid=7335701fb2*24d698f0cd9fe7564f637;misId=yangtianjie;';

// 例如我需要抢每周五下午3点到4点的会议室， 那么我需要提前13天抢， 正好那天是周六，每天早上8点可以抢

// 需要抢的那天会议室的使用时间
// var setTime = { 'hour': 7, 'minute': 0, 'second': 0, 'millisecond': 0 };
var setTime = { 'hour': 15, 'minute': 0, 'second': 0, 'millisecond': 0 };

// 什么时候开始抢
// var bookTime = { 'hour': 8, 'minute': 30, 'second': 51, 'millisecond': 0 };
var bookTime = { 'hour': 8, 'minute': 0, 'second': 30, 'millisecond': 0 };

// 周几抢 （例如周五使用的会议室 就应该周六抢）
// var weekday = 5;
 var weekday = 6;

// 会议室使用时间
var minutes = 60;

rl.on('line', function (input) {

  var cycleBook = Meeting(setTime, bookTime, minutes, weekday, room, 'ssoid=' + input + ';misId=yangtianjie;');
  cycleBook(); 

  rl.close();
});

rl.on('close', function() {
  console.log('抢会议室程序开始...');
  // process.exit(0);
});