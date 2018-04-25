// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const postSchema = mongoose.Schema({
  title: String, //标题
  author: String, //作者
  article: String, //文章内容
  publishTime: String, //发表时间
  postImg: String, //封面
  comments: [{
    name: String,
    time: String,
    content: String
  }], //评论
  pv: Number //访问次数
})

/************** 定义模型Model **************/
const Models = {
  Login: mongoose.model('Login', loginSchema),
  Post: mongoose.model('Post', postSchema)
}

module.exports = Models;
