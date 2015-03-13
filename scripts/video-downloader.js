var _ = require('underscore');
var Download = require('download');
var phantom = require('phantom');
var async = require('async');
var fs = require('fs');

var videos = {
  "手机": ["http://v.youkuxia.com/v_show/id_XNTkzNjkzMDAw.html"],
  "何以笙箫默": [
    "http://v.youkuxia.com/v_show/id_XODY4NjkyOTQ4.html",
    "http://v.youkuxia.com/v_show/id_XODY4NzAwMjk2.html",
    "http://v.youkuxia.com/v_show/id_XODY5MzMyMjky.html",
    "http://v.youkuxia.com/v_show/id_XODY5MzM3NTEy.html",
    "http://v.youkuxia.com/v_show/id_XODcwMjc3ODI4.html",
    "http://v.youkuxia.com/v_show/id_XODcwMjg4NjI0.html",
    "http://v.youkuxia.com/v_show/id_XODcxMDA5MjA4.html",
    "http://v.youkuxia.com/v_show/id_XODcxMDY5ODYw.html",
    "http://v.youkuxia.com/v_show/id_XODcxNzYzMTQ0.html",
    "http://v.youkuxia.com/v_show/id_XODcxNzg0NzYw.html",
    "http://v.youkuxia.com/v_show/id_XODcyNDE2NjQw.html",
    "http://v.youkuxia.com/v_show/id_XODcyNDQwMDI0.html",
    "http://v.youkuxia.com/v_show/id_XODczMTQ5OTQw.html",
    "http://v.youkuxia.com/v_show/id_XODczMTYzMTYw.html",
    "http://v.youkuxia.com/v_show/id_XODczMjI2MTI0.html",
    "http://v.youkuxia.com/v_show/id_XODczMjMzOTg4.html",
    "http://v.youkuxia.com/v_show/id_XODczMjQyMzQ4.html",
    "http://v.youkuxia.com/v_show/id_XODczMjQ4Nzky.html",
    "http://v.youkuxia.com/v_show/id_XODc1MjA3NDI4.html",
    "http://v.youkuxia.com/v_show/id_XODc1MjE1ODky.html",
    "http://v.youkuxia.com/v_show/id_XODc1MjIzNjIw.html",
    "http://v.youkuxia.com/v_show/id_XODc1MjMxOTM2.html",
    "http://v.youkuxia.com/v_show/id_XODc2NTg5NjQw.html",
    "http://v.youkuxia.com/v_show/id_XODc2NjA0NTIw.html",
    "http://v.youkuxia.com/v_show/id_XODc3NDE5ODg0.html",
    "http://v.youkuxia.com/v_show/id_XODc3NDgzMTY4.html",
    "http://v.youkuxia.com/v_show/id_XODc4MTY5ODQ4.html",
    "http://v.youkuxia.com/v_show/id_XODc4MTg5NDQ0.html",
    "http://v.youkuxia.com/v_show/id_XODc4ODIwNDgw.html",
    "http://v.youkuxia.com/v_show/id_XODc4ODU5NjEy.html",
    "http://v.youkuxia.com/v_show/id_XODc5NDcwMzIw.html",
    "http://v.youkuxia.com/v_show/id_XODc5NTE0NDUy.html",
    "http://v.youkuxia.com/v_show/id_XODgwMTk4ODcy.html",
    "http://v.youkuxia.com/v_show/id_XODgwMjQ2MTE2.html",
    "http://v.youkuxia.com/v_show/id_XODgwODc5Mjk2.html",
    "http://v.youkuxia.com/v_show/id_XODgwOTEyMDky.html"
  ], "武媚娘": [
    "http://v.youkuxia.com/v_show/id_XODUzODAwMzg4.html",
    "http://v.youkuxia.com/v_show/id_XODUzODQyNTY0.html",
    "http://v.youkuxia.com/v_show/id_XODUzODAxMjMy.html",
    "http://v.youkuxia.com/v_show/id_XODU0NDQ1MDM2.html",
    "http://v.youkuxia.com/v_show/id_XODU0NDY2MTE2.html",
    "http://v.youkuxia.com/v_show/id_XODU0NTAzMjky.html",
    "http://v.youkuxia.com/v_show/id_XODU1MTY1NzEy.html",
    "http://v.youkuxia.com/v_show/id_XODU1MjAxMzYw.html",
    "http://v.youkuxia.com/v_show/id_XODU1MjU0NjU2.html",
    "http://v.youkuxia.com/v_show/id_XODU1OTgwMzAw.html",
    "http://v.youkuxia.com/v_show/id_XODU2MDE0ODI0.html",
    "http://v.youkuxia.com/v_show/id_XODU2MDUyODQ0.html",
    "http://v.youkuxia.com/v_show/id_XODU2NzcwNTM2.html",
    "http://v.youkuxia.com/v_show/id_XODU2Nzk0Mjky.html",
    "http://v.youkuxia.com/v_show/id_XODU2ODI2MTUy.html",
    "http://v.youkuxia.com/v_show/id_XODU3NTAwNzIw.html",
    "http://v.youkuxia.com/v_show/id_XODU4MjM5NTky.html",
    "http://v.youkuxia.com/v_show/id_XODYyMjA4MTky.html",
    "http://v.youkuxia.com/v_show/id_XODYyMjYwOTAw.html",
    "http://v.youkuxia.com/v_show/id_XODYyMzAzODQ0.html",
    "http://v.youkuxia.com/v_show/id_XODYyOTU1NTQ0.html",
    "http://v.youkuxia.com/v_show/id_XODYzNjk3MDY4.html",
    "http://v.youkuxia.com/v_show/id_XODY0NTAyNDE2.html",
    "http://v.youkuxia.com/v_show/id_XODY0NTM0NTY0.html",
    "http://v.youkuxia.com/v_show/id_XODY0NTc5Nzg0.html",
    "http://v.youkuxia.com/v_show/id_XODY1Mjc0Nzgw.html",
    "http://v.youkuxia.com/v_show/id_XODY1MzI5NTA4.html",
    "http://v.youkuxia.com/v_show/id_XODY1MzY0MTA4.html",
    "http://v.youkuxia.com/v_show/id_XODY2MDUzMTI4.html",
    "http://v.youkuxia.com/v_show/id_XODY2MDg0MzQw.html",
    "http://v.youkuxia.com/v_show/id_XODY2MTIxNDEy.html",
    "http://v.youkuxia.com/v_show/id_XODY2NzYzMTQ4.html",
    "http://v.youkuxia.com/v_show/id_XODY2NzkzMzY0.html",
    "http://v.youkuxia.com/v_show/id_XODY2ODM5ODg0.html",
    "http://v.youkuxia.com/v_show/id_XODY3NDkzNzky.html",
    "http://v.youkuxia.com/v_show/id_XODY3NTM0Njk2.html",
    "http://v.youkuxia.com/v_show/id_XODY3NTYxOTA0.html",
    "http://v.youkuxia.com/v_show/id_XODY4MTc3ODc2.html",
    "http://v.youkuxia.com/v_show/id_XODY4ODYzNDIw.html",
    "http://v.youkuxia.com/v_show/id_XODY5NTgwMTcy.html",
    "http://v.youkuxia.com/v_show/id_XODY5NjI0MTg0.html",
    "http://v.youkuxia.com/v_show/id_XODY5Njc2NDM2.html",
    "http://v.youkuxia.com/v_show/id_XODcwNDkwNzEy.html",
    "http://v.youkuxia.com/v_show/id_XODcwNDkwODUy.html",
    "http://v.youkuxia.com/v_show/id_XODcwNDkwODky.html",
    "http://v.youkuxia.com/v_show/id_XODcxMTI4NjM2.html",
    "http://v.youkuxia.com/v_show/id_XODcxMTYzMTYw.html",
    "http://v.youkuxia.com/v_show/id_XODcxMjA2ODgw.html",
    "http://v.youkuxia.com/v_show/id_XODcxODY1Mzcy.html",
    "http://v.youkuxia.com/v_show/id_XODcxOTA0MjI0.html",
    "http://v.youkuxia.com/v_show/id_XODcxOTQ4MTk2.html",
    "http://v.youkuxia.com/v_show/id_XODcyNjEwMjk2.html",
    "http://v.youkuxia.com/v_show/id_XODcyNjgwMjM2.html",
    "http://v.youkuxia.com/v_show/id_XODcyNjg0NzQ4.html",
    "http://v.youkuxia.com/v_show/id_XODczMjc1OTcy.html",
    "http://v.youkuxia.com/v_show/id_XODczOTM1MzI4.html",
    "http://v.youkuxia.com/v_show/id_XODc0NTc0NDc2.html",
    "http://v.youkuxia.com/v_show/id_XODc0NjM2MzA4.html",
    "http://v.youkuxia.com/v_show/id_XODc0NjgwMjky.html",
    "http://v.youkuxia.com/v_show/id_XODc1MzA0ODk2.html",
    "http://v.youkuxia.com/v_show/id_XODc1MzM2NjM2.html",
    "http://v.youkuxia.com/v_show/id_XODc1Mzc2MzUy.html",
    "http://v.youkuxia.com/v_show/id_XODc1OTk3NTU2.html",
    "http://v.youkuxia.com/v_show/id_XODc2MDI0OTA0.html",
    "http://v.youkuxia.com/v_show/id_XODc2MDY2Mjc2.html",
    "http://v.youkuxia.com/v_show/id_XODc2NzM3ODgw.html",
    "http://v.youkuxia.com/v_show/id_XODc2Nzc0NTY4.html",
    "http://v.youkuxia.com/v_show/id_XODc2Nzk2NTQ4.html",
    "http://v.youkuxia.com/v_show/id_XODc3NDI2NDcy.html",
    "http://v.youkuxia.com/v_show/id_XODc3NDgxMjYw.html",
    "http://v.youkuxia.com/v_show/id_XODc3NTIxMTgw.html",
    "http://v.youkuxia.com/v_show/id_XODc4MTQwMTQ0.html",
    "http://v.youkuxia.com/v_show/id_XODc4ODAxODcy.html",
    "http://v.youkuxia.com/v_show/id_XODc5NDc3NDAw.html",
    "http://v.youkuxia.com/v_show/id_XODc5NTE3MjA0.html",
    "http://v.youkuxia.com/v_show/id_XODc5NTY0Mzc2.html",
    "http://v.youkuxia.com/v_show/id_XODgwMTk0MTIw.html",
    "http://v.youkuxia.com/v_show/id_XODgwMjQyOTcy.html",
    "http://v.youkuxia.com/v_show/id_XODgwMjgyNDI0.html",
    "http://v.youkuxia.com/v_show/id_XODgwOTAwNDg0.html",
    "http://v.youkuxia.com/v_show/id_XODgwOTE2MzUy.html",
    "http://v.youkuxia.com/v_show/id_XODgwOTQ5NDQ4.html",
    "http://v.youkuxia.com/v_show/id_XODgxNjAwODA4.html",
    "http://v.youkuxia.com/v_show/id_XODgxNjgyMjQ4.html",
    "http://v.youkuxia.com/v_show/id_XODgxNjg1Mzk2.html",
    "http://v.youkuxia.com/v_show/id_XODgyMzI5MDQ0.html",
    "http://v.youkuxia.com/v_show/id_XODgyMzY3Njk2.html",
    "http://v.youkuxia.com/v_show/id_XODgyNDQwMDY4.html",
    "http://v.youkuxia.com/v_show/id_XODgzMDQzODA0.html",
    "http://v.youkuxia.com/v_show/id_XODgzNzE4NjE2.html",
    "http://v.youkuxia.com/v_show/id_XODg0NDMxNjIw.html",
    "http://v.youkuxia.com/v_show/id_XODg0NDkyNzg0.html",
    "http://v.youkuxia.com/v_show/id_XODg1MTg3NjY0.html",
    "http://v.youkuxia.com/v_show/id_XODg1MjU0MTc2.html",
    "http://v.youkuxia.com/v_show/id_XODg1OTEzNzAw.html",
    "http://v.youkuxia.com/v_show/id_XODg1OTQ5MDc2.html"
  ], "雪豹": [
    "http://v.youkuxia.com/v_show/id_XMjA3Njc1NjA0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NjgwNjQ0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Njk1NTg0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Njg5OTEy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Njk0NjY0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzAzODEy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzA5MzUy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NjUzNzc2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NjcyMjQw.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NjYyNzYw.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzA2NTky.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzEyMTg4.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzI3MTI4.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzE4Nzg4.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzIxMDk2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzI1MjI0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzMxODk2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzM2OTAw.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzM5NDQ0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzQ2MzUy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzUwMDM2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzU3OTE2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzU3MDk2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzU3MTk2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzY1NjU2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzcyMjA4.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzY2MjI0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzczMTgw.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzc3MzUy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzc3ODMy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzc4ODcy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzgxMTAw.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzg0OTg0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzg0Nzky.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzg1NzM2.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzg4NDI0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzg3NTY0.html",
    "http://v.youkuxia.com/v_show/id_XMjA3Nzg5NDgw.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzkwMzUy.html",
    "http://v.youkuxia.com/v_show/id_XMjA3NzkwNTg4.html",
  ], "石敢当之雄峙天东": [
    "http://v.youkuxia.com/v_show/id_XODkzMTAzMDc2.html",
    "http://v.youkuxia.com/v_show/id_XODkzMTI1MDg0.html",
    "http://v.youkuxia.com/v_show/id_XODkzMTUwNzgw.html",
    "http://v.youkuxia.com/v_show/id_XODkzMTYwNDAw.html",
    "http://v.youkuxia.com/v_show/id_XODkzODU1NTI4.html",
    "http://v.youkuxia.com/v_show/id_XODkzODc0NzEy.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODE1NTA0.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODMyOTky.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODQ3ODYw.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODY5MDAw.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODk2MjUy.html",
    "http://v.youkuxia.com/v_show/id_XODk1OTE2OTYw.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODE1MTY0.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODM3Mzgw.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODU2NjMy.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODg4NzMy.html",
    "http://v.youkuxia.com/v_show/id_XODk1ODk4OTky.html",
    "http://v.youkuxia.com/v_show/id_XODk1OTE4MjU2.html",
    "http://v.youkuxia.com/v_show/id_XODk4NTYzMTMy.html",
    "http://v.youkuxia.com/v_show/id_XODk4NTY1MTAw.html",
    "http://v.youkuxia.com/v_show/id_XODk4NTY3MzMy.html",
    "http://v.youkuxia.com/v_show/id_XODk4NTY3MTMy.html",
    "http://v.youkuxia.com/v_show/id_XODk4NTY4NzMy.html",
    "http://v.youkuxia.com/v_show/id_XODk4NTcwMDQ0.html",
    "http://v.youkuxia.com/v_show/id_XOTAwNzk0ODQ4.html",
    "http://v.youkuxia.com/v_show/id_XOTAwODA0Nzc2.html",
    "http://v.youkuxia.com/v_show/id_XOTAwODE3NDUy.html",
    "http://v.youkuxia.com/v_show/id_XOTAwODI3NTg4.html",
    "http://v.youkuxia.com/v_show/id_XOTAwODM4NDQ0.html",
    "http://v.youkuxia.com/v_show/id_XOTAwODU0OTky.html",
    "http://v.youkuxia.com/v_show/id_XOTAyOTgwNTQ0.html",
    "http://v.youkuxia.com/v_show/id_XOTAyOTg5OTA4.html",
    "http://v.youkuxia.com/v_show/id_XOTAzMDAwNjg4.html",
    "http://v.youkuxia.com/v_show/id_XOTAzMDI5MTQ0.html",
    "http://v.youkuxia.com/v_show/id_XOTAzMDM2ODYw.html",
    "http://v.youkuxia.com/v_show/id_XOTAzMDQ2NDky.html",
    "http://v.youkuxia.com/v_show/id_XOTA0NTU2ODY0.html",
    "http://v.youkuxia.com/v_show/id_XOTA0NTY3NjU2.html",
    "http://v.youkuxia.com/v_show/id_XOTA0NTc2MjAw.html",
    "http://v.youkuxia.com/v_show/id_XOTA0NTg1MzY4.html",
    "http://v.youkuxia.com/v_show/id_XOTA0NTk1MjMy.html",
    "http://v.youkuxia.com/v_show/id_XOTA0NjExMzM2.html",
    "http://v.youkuxia.com/v_show/id_XOTA2MTg0NDIw.html",
    "http://v.youkuxia.com/v_show/id_XOTA2MTk0NjI4.html",
    "http://v.youkuxia.com/v_show/id_XOTA2MjA4OTYw.html",
    "http://v.youkuxia.com/v_show/id_XOTA2MjMxNTI0.html",
    "http://v.youkuxia.com/v_show/id_XOTA4ODczOTM2.html",
    "http://v.youkuxia.com/v_show/id_XOTA4ODgzNDk2.html"
  ], "北京爱情故事": [
    "http://v.youkuxia.com/v_show/id_XMzQwNDczODQw.html",
    "http://v.youkuxia.com/v_show/id_XMzQwNDkzODg4.html",
    "http://v.youkuxia.com/v_show/id_XMzQxMDY0MTc2.html",
    "http://v.youkuxia.com/v_show/id_XMzQxNDAyMTQ4.html",
    "http://v.youkuxia.com/v_show/id_XMzQxNDA1OTI4.html",
    "http://v.youkuxia.com/v_show/id_XMzQxNzQzNDg0.html",
    "http://v.youkuxia.com/v_show/id_XMzQxNzU1NzUy.html",
    "http://v.youkuxia.com/v_show/id_XMzQyMTYzMDI0.html",
    "http://v.youkuxia.com/v_show/id_XMzQyMTc1OTQ4.html",
    "http://v.youkuxia.com/v_show/id_XMzQyNTA0NTg0.html",
    "http://v.youkuxia.com/v_show/id_XMzQyNTE3MDAw.html",
    "http://v.youkuxia.com/v_show/id_XMzQyNjc3MzAw.html",
    "http://v.youkuxia.com/v_show/id_XMzQyNjgxMzYw.html",
    "http://v.youkuxia.com/v_show/id_XMzQzMDI1NTQw.html",
    "http://v.youkuxia.com/v_show/id_XMzQzMDQxNTQ4.html",
    "http://v.youkuxia.com/v_show/id_XMzQzMjk2NzI0.html",
    "http://v.youkuxia.com/v_show/id_XMzQzMzIwMTYw.html",
    "http://v.youkuxia.com/v_show/id_XMzQzNjM1MjEy.html",
    "http://v.youkuxia.com/v_show/id_XMzQzNjM2NjMy.html",
    "http://v.youkuxia.com/v_show/id_XMzQzOTYyOTgw.html",
    "http://v.youkuxia.com/v_show/id_XMzQzOTY1NTEy.html",
    "http://v.youkuxia.com/v_show/id_XMzQ0Mzc5Nzk2.html",
    "http://v.youkuxia.com/v_show/id_XMzQ0Mzg1NTky.html",
    "http://v.youkuxia.com/v_show/id_XMzQ0NjAxNzcy.html",
    "http://v.youkuxia.com/v_show/id_XMzQ0NjA2NTQ4.html",
    "http://v.youkuxia.com/v_show/id_XMzQ0OTc2ODg0.html",
    "http://v.youkuxia.com/v_show/id_XMzQ0OTgwMzE2.html",
    "http://v.youkuxia.com/v_show/id_XMzQ1MzU3NTg4.html",
    "http://v.youkuxia.com/v_show/id_XMzQ1MzYyMzY0.html",
    "http://v.youkuxia.com/v_show/id_XMzQ1NTUzODMy.html",
    "http://v.youkuxia.com/v_show/id_XMzQ1NTU1NjQw.html",
    "http://v.youkuxia.com/v_show/id_XMzQ1ODE3MTQ4.html",
    "http://v.youkuxia.com/v_show/id_XMzQ1ODE5NDg4.html",
    "http://v.youkuxia.com/v_show/id_XMzQ2MDkxMzY0.html",
    "http://v.youkuxia.com/v_show/id_XMzQ2MDk1OTUy.html",
    "http://v.youkuxia.com/v_show/id_XMzQ2MzY0NDg4.html",
    "http://v.youkuxia.com/v_show/id_XMzQ2MzY3MzUy.html",
    "http://v.youkuxia.com/v_show/id_XMzQ2NjMzNjM2.html",
    "http://v.youkuxia.com/v_show/id_XMzQ2NjM4MzE2.html"
  ], "乡村爱情变奏曲": [
    "http://v.youkuxia.com/v_show/id_XNTExODA5NTc2.html",
    "http://v.youkuxia.com/v_show/id_XNTExODEyNDQw.html",
    "http://v.youkuxia.com/v_show/id_XNTExODE1Njg4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODE4NjQw.html",
    "http://v.youkuxia.com/v_show/id_XNTExODIxOTA4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODI1Mzc2.html",
    "http://v.youkuxia.com/v_show/id_XNTExODI4NzY4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODMyNzY4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODM3NDgw.html",
    "http://v.youkuxia.com/v_show/id_XNTExODQ5NTg4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODU0MTg0.html",
    "http://v.youkuxia.com/v_show/id_XNTExODU5MjI4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODY5MjQw.html",
    "http://v.youkuxia.com/v_show/id_XNTExODczODk2.html",
    "http://v.youkuxia.com/v_show/id_XNTExODc5Njgw.html",
    "http://v.youkuxia.com/v_show/id_XNTExODg0NDQ4.html",
    "http://v.youkuxia.com/v_show/id_XNTExODg4Mzk2.html",
    "http://v.youkuxia.com/v_show/id_XNTExODkxMTQw.html",
    "http://v.youkuxia.com/v_show/id_XNTExODk0Mjk2.html",
    "http://v.youkuxia.com/v_show/id_XNTExODk3NDQ4.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTAwOTA0.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTAzNjE2.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTA3MzM2.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTExMTYw.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTE1MzUy.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTE4ODEy.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTIxNjMy.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTI0NTU2.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTI3NzUy.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTMwNzA0.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTM0MDEy.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTM3ODQw.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTQxMzc2.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTQ0MTA0.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTQ3ODYw.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTY1ODc2.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTY3MzA4.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTY5MDIw.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTUwOTky.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTU0NTgw.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTU4MjQ0.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTYxNjg4.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTY1MDgw.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTY4OTg0.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTcyMDQ4.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTc1MTUy.html",
    "http://v.youkuxia.com/v_show/id_XNTEyMTc5MDY0.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTgxMzY0.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTgyMDgw.html",
    "http://v.youkuxia.com/v_show/id_XNTExOTgyODYw.html"
  ], "使徒行者": [
    "http://v.youkuxia.com/v_show/id_XNzYxNzM0MDk2.html",
    "http://v.youkuxia.com/v_show/id_XNzYyMjgwNDY4.html",
    "http://v.youkuxia.com/v_show/id_XNzYyODE5NDg0.html",
    "http://v.youkuxia.com/v_show/id_XNzYzNDYxNTM2.html",
    "http://v.youkuxia.com/v_show/id_XNzY0MjM2Mzcy.html",
    "http://v.youkuxia.com/v_show/id_XNzY5Mzg1MTc2.html",
    "http://v.youkuxia.com/v_show/id_XNzcxNTEwOTYw.html",
    "http://v.youkuxia.com/v_show/id_XNzczMDY2MzQ0.html",
    "http://v.youkuxia.com/v_show/id_XNzczODkzNjEy.html",
    "http://v.youkuxia.com/v_show/id_XNzc0NzYzNzk2.html",
    "http://v.youkuxia.com/v_show/id_XNzc3MzQ0NzA0.html",
    "http://v.youkuxia.com/v_show/id_XNzc4MjM2NTMy.html",
    "http://v.youkuxia.com/v_show/id_XNzc5MDcxMjk2.html",
    "http://v.youkuxia.com/v_show/id_XNzc5OTI4NTI0.html",
    "http://v.youkuxia.com/v_show/id_XNzgwNzM5NzY0.html",
    "http://v.youkuxia.com/v_show/id_XNzgzMTYxMDg4.html",
    "http://v.youkuxia.com/v_show/id_XNzg0MDc2NTMy.html",
    "http://v.youkuxia.com/v_show/id_XNzg0OTAyNDY4.html",
    "http://v.youkuxia.com/v_show/id_XNzg1NzEwODk2.html",
    "http://v.youkuxia.com/v_show/id_XNzg2Mzk3OTMy.html",
    "http://v.youkuxia.com/v_show/id_XNzg4NDEyNDQw.html",
    "http://v.youkuxia.com/v_show/id_XNzg5MTUxMDA4.html",
    "http://v.youkuxia.com/v_show/id_XNzg5ODc4NjY4.html",
    "http://v.youkuxia.com/v_show/id_XNzkwNjY5MjQ0.html",
    "http://v.youkuxia.com/v_show/id_XNzkxMzY2Mzg0.html",
    "http://v.youkuxia.com/v_show/id_XNzkzNzA5MjY4.html",
    "http://v.youkuxia.com/v_show/id_XNzk0MzcyNzI4.html",
    "http://v.youkuxia.com/v_show/id_XNzk0OTYyMzQ4.html",
    "http://v.youkuxia.com/v_show/id_XNzk1NjEyMDI0.html",
    "http://v.youkuxia.com/v_show/id_XNzk2MTgyNzA0.html",
    "http://v.youkuxia.com/v_show/id_XNzk2MjIyNTY4.html"
  ], "秘密花园": [
    "http://v.youkuxia.com/v_show/id_XMjIyMzE0OTI4.html",
    "http://v.youkuxia.com/v_show/id_XMjIyNTc0MTA0.html",
    "http://v.youkuxia.com/v_show/id_XMjI0MDYxNzIw.html",
    "http://v.youkuxia.com/v_show/id_XMjI0MjYyMjQ4.html",
    "http://v.youkuxia.com/v_show/id_XMjI1NzE0ODA4.html",
    "http://v.youkuxia.com/v_show/id_XMjI1OTYzODg0.html",
    "http://v.youkuxia.com/v_show/id_XMjI3NDY1MDgw.html",
    "http://v.youkuxia.com/v_show/id_XMjI3NzA5NDIw.html",
    "http://v.youkuxia.com/v_show/id_XMjI5MTQzNjg0.html",
    "http://v.youkuxia.com/v_show/id_XMjI5MzgwMzI0.html",
    "http://v.youkuxia.com/v_show/id_XMjMwNjk5NDYw.html",
    "http://v.youkuxia.com/v_show/id_XMjMwOTI4MTE2.html",
    "http://v.youkuxia.com/v_show/id_XMjMyMjg5NzUy.html",
    "http://v.youkuxia.com/v_show/id_XMjMyNTMzMjQ0.html",
    "http://v.youkuxia.com/v_show/id_XMjMzOTg1MzYw.html",
    "http://v.youkuxia.com/v_show/id_XMjM0MjI1Nzgw.html",
    "http://v.youkuxia.com/v_show/id_XMjM1NjE3MDc2.html",
    "http://v.youkuxia.com/v_show/id_XMjM1ODQ4ODcy.html",
    "http://v.youkuxia.com/v_show/id_XMjM3MjQzNjcy.html",
    "http://v.youkuxia.com/v_show/id_XMjM3NDcwODA4.html"
  ],
  "后会无期": ['http://v.youkuxia.com/v_show/id_XNzc5NzMwMDQ4.html'],
  "分手大师": ["http://v.youkuxia.com/v_show/id_XNzU3NzY5NjIw.html"],
  "老男孩": ["http://v.youkuxia.com/v_show/id_XMjE4MDU1MDE2.html"],
  "黄飞鸿之英雄有梦": ["http://v.youkuxia.com/v_show/id_XODUwODM2NTI0.html"],
  "赤壁(上)": ["http://v.youkuxia.com/v_show/id_XNjg4MjgzNzU2.html"],
  "归来": ["http://v.youkuxia.com/v_show/id_XNzM3MTYxNDI4.html"],
  "一个人的武林": ["http://v.youkuxia.com/v_show/id_XODQwMTY4NDg0.html"],
  "投名状": ["http://v.youkuxia.com/v_show/id_XNjg4Mjc4NDY4.html"],
  "私人订制": ["http://v.youkuxia.com/v_show/id_XNjY4MTIxMTcy.html"],
  "大腕": ["http://v.youkuxia.com/v_show/id_XNTkzNjgxMDI4.html"],
  "少林足球": ["http://v.youkuxia.com/v_show/id_XMzQ2OTk2Mjky.html"],
  "天下无贼": ["http://v.youkuxia.com/v_show/id_XNDcxNTMzNjc2.html"],
  "赛德克巴莱": ["http://v.youkuxia.com/v_show/id_XNDI2Mjc3NjE2.html"],
  "卧虎藏龙": ["http://v.youkuxia.com/v_show/id_XMjE0OTI2NjA4.html"],
  "心花怒放": ["http://v.youkuxia.com/v_show/id_XODMzOTcyNjg0.html"],
  "放牛班的春天": ["http://v.youkuxia.com/v_show/id_XMTc1MjM2NjE2.html"],
  "倩女幽魂": ["http://v.youkuxia.com/v_show/id_XNzkyNjQ2MzEy.html"],
  "英雄本色": ["http://v.youkuxia.com/v_show/id_XNzk4OTY0ODIw.html"],
  "源代码": ["http://v.youkuxia.com/v_show/id_XMzA4Mjk1MTQ4.html"],
  "热血高校3": ["http://v.youkuxia.com/v_show/id_XODcxMjAxOTYw.html"],
  "精武门": ["http://v.youkuxia.com/v_show/id_XNzk5MDg2MzY0.html"],
  "大内密探零零发": ["http://v.youkuxia.com/v_show/id_XODAzOTY2NDUy.html"],
  "英雄本色2": ["http://v.youkuxia.com/v_show/id_XNzk0MTY3OTQ4.html"],
  "菊次郎的夏天": ["http://v.youkuxia.com/v_show/id_XODc1ODc2NjEy.html"],
  "百变星君": ["http://v.youkuxia.com/v_show/id_XODAzNDM1Mjc2.html"],
  "赌侠大战拉斯维加斯": ["http://v.youkuxia.com/v_show/id_XODAzOTYwODIw.html"],
  "无间道": ["http://v.youkuxia.com/v_show/id_XNTY0ODE0MzU2.html"],
  "爸爸去哪儿": ["http://v.youkuxia.com/v_show/id_XNjgyMDYyNTgw.html"],
  "无间道2": ["http://v.youkuxia.com/v_show/id_XNTY0ODE2MjY4.html"],
  "国王的演讲": ["http://v.youkuxia.com/v_show/id_XMzY5NjM5NzQw.html"],
  "花木兰": ["http://v.youkuxia.com/v_show/id_XNDAzOTYxNTUy.html"],
  "老夫子": ["http://v.youkuxia.com/v_show/id_XODAzOTQ3NDI4.html"],
  "卢旺达饭店": ["http://v.youkuxia.com/v_show/id_XMzU3NTY5MDgw.html"],
  "鬼子来了": ["http://v.youkuxia.com/v_show/id_XNDI4MjAwMzA0.html"],
  "太极旗飘扬": ["http://v.youkuxia.com/v_show/id_XMTk5NTEyNzIw.html"],
  "金陵十三钗": ["http://v.youkuxia.com/v_show/id_XMzM4MTM1OTQw.html"],
  "小兵张嘎": ["http://v.youkuxia.com/v_show/id_XNjI1OTE5Nzc2.html"],
  "风声": ["http://v.youkuxia.com/v_show/id_XNDcxNTYwODcy.html"],
  "西楚霸王": ["http://v.youkuxia.com/v_show/id_XMTQ3NTcxMDY0.html"]
};

var pairs = _.pairs(videos);

phantom.create(function (ph) {
  ph.createPage(function (page) {

    async.eachSeries(pairs, function(pair, seriesFinished) {
      var name = pair[0];
      var list = pair[1];

      var index = 0;
      async.eachSeries(list, function(feilvUrl, episodeFinished){
        index++;

        var fileName = name+(list.length===1?"":index)+'.mp4';
        if (fs.existsSync('videos/'+fileName)) return episodeFinished(null);

        console.log('openning '+feilvUrl);
        page.open(feilvUrl, function (status) {
          console.log("opened website? ", status);
          page.evaluate(function () { return document.querySelector('#result .furl').href; }, function (url) {

            console.log('downloading '+fileName);
            var download = new Download()
                .get(url)
                .dest('videos/')
                .rename(fileName);
             
            download.run(function (err, files) {
              if (err) {
                console.log(err);
              }else{
                console.log(fileName+' downloaded successfully!');
              }
              // page.close();
              // ph.exit();
              episodeFinished(null);
            });
          });
        });          
      }, seriesFinished);
    }, function(err) {
      page.close();
      ph.exit();      
      if (err) return console.log('err'+err);
      console.log('all finished!');
    });
  });
});

