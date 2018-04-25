const models = require('./db');
const express = require('express');

var moment = require('moment'); //时间控件
var formidable = require('formidable'); //表单控件
var path = require('path');

// remarkable
const Remarkable = require('remarkable');
var md = new Remarkable();

var request = require('request');
const router = express.Router();

// 获取文章
router.get('/api/getArticle/:id', (req, res) => {
  var id = req.params.id;
  console.log('request begin...')
  var options = {
    url: 'https://api.github.com/repos/Ganother/blog/issues/' + id,
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var content = JSON.parse(body);
      var html = md.render(content.body);
      var result = {
        html: html,
        user: content.user.login,
        title: content.title,
        created: content.created_at,
        number: content.number
      }
      res.send(result);
    }
  })
})

module.exports = router;
