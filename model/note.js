const Sequelize = require('sequelize');
var path = require('path');
const sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
    //sqlite 不需要用户名 其他的需要配置
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') //存储路径
  //按文档配置会报错 打不开database文件
});

// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

//测试用的代码
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  }); */


  // 1  hello  createAtDate
  var Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING,
      
    },
    uid: {
        type: Sequelize.STRING,
    }
});
//Note.sync({force:true})
/*
  Note.sync().then(function () {//sync({force: true}) 如果存在表 先删除再创建一个新的
    // Table created
    Note.create({texy:'hello world'})
}).then(function(){
    Note.findAll({raw:true}).then(function(notes){
        console.log(notes)
        //findAll({raw:true}) 找到原始数据
      })
})
*/

/* Note.findAll({raw:true, where:{id:2}}).then((notes)=>{
    console.log(notes)
}) */

module.exports = Note