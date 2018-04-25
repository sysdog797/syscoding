const models = require('./db');
const express = require('express');

var moment = require('moment'); //时间控件
var formidable = require('formidable'); //表单控件
var path = require('path');

const router = express.Router();

// 获取文章

// 检查是否登录
router.get('/api/login/checkLogin', (req, res) => {
  var user = req.session.user;
  res.send(user);
})
// 登出
router.get('/api/logout', (req, res) => {
  req.session.user = null;
  res.send('登出成功');
})
// 创建账号接口
router.post('/api/login/createUser', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  console.log(req);
  let newUser = new models.Login({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  // 保存数据newUser数据进mongoDB
  newUser.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send('createUser successed');
    }
  });
});
// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {
  // 通过模型去查找数据库
  models.Login.findOne({
    'username': req.body.username
  }, function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      res.send('用户不存在');
      return
    }
    if (user.password != req.body.password) {
      console.log('密码错误');
      res.send('密码错误');
      return
    }
    console.log(user);
    console.log(req.session)
    req.session.user = user;
    res.send(user);
  })
});
// 获取文章
router.get('/api/getArticle', (req, res) => {
  models.Post.find({}, function (err, data) {
    if (err) {
      console.log('读取文章出错');
    }
    res.send(data);
  })
});
// 文章详情
router.get('/api/getDetail', (req, res) => {
  var id = req.query.id;
  if (id && id != '') {
    models.Post.update({
      "_id": id
    }, {
      $inc: {
        "pv": 1
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return res.redirect("back");
      };
      console.log("浏览数量+1");
    });

    models.Post.findById(id, function (err, data) {
      if (err) {
        console.log('查看文章详细信息出错');
        console.log(err);
        //req.flash('error', '查看文章详细信息出错');
        return res.redirect('/');
      }
      res.send({
        //success: console.log('success'),
        //error: console.log('error'),
        post: data,
        img: path.dirname(__dirname) + '/public/images/' + data.postImg
      })
    });
  }
})
// 发布文章
router.post('/api/post', (req, res) => {
  var imgPath = path.dirname(__dirname) + '/public/images/';
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = 'utf-8'; //设置编辑
  form.uploadDir = imgPath; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
  form.type = true;
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      //req.flash('error', '图片上传失败');
      return;
    }
    var file = files.postImg; //获取上传文件信息
    if (file.size != 0) {
      if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'image/jpg') {
        console.log('上传文件格式错误，只支持png,jpeg,gif');
        //req.flash('error', '上传文件格式错误，只支持png,jpeg,gif');
        //return res.redirect('/post');
        res.send('上传格式错误');
      }
    }
    var title = fields.title;
    var author = req.session.user.username;
    var article = fields.article;
    var postImg = file.path.split(path.sep).pop();
    var pv = fields.pv;
    // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题');
      }
      if (!article.length) {
        throw new Error('请填写内容');
      }
    } catch (e) {
      //req.flash('error', e.message);
      console.log(e);
      //return res.redirect('back');
      res.send(e);
    }
    var post = new models.Post({
      title: title,
      author: author,
      article: article,
      postImg: postImg,
      publishTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString(),
      pv: pv
    });
    post.save(function (err) {
      if (err) {
        console.log('文章发表出现错误');
        //req.flash('err', '文章发表出现错误');
        //return res.redirect('/post');
        res.send(err);
      }
      console.log('文章录入成功');
      //req.flash('success', '文章录入成功');
      //res.redirect('发布成功');
      res.redirect('/');
    });
  });
})

module.exports = router;
