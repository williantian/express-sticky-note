var express = require('express');
var router = express.Router();
var Note = require('../model/note.js')

/*
1.获取所有的 note：/api/notes  request:{}  res:{status:0, data:[{}{}]  {status:1, errorMsg:'失败的原因'}
2. 创建一个note：POST: /api/note/add  request:{note：'hello world'} res:{status:0,  {status:1, errorMsg:'失败的原因'}
3. 修改一个 note： POST ：/api/note/edit requuest:{note:'new note', id: 100} 
4.删除一个note ： POST: /api/note/delete request:{id: 100}
*/
/* GET users listing. */
router.get('/notes', function(req, res, next) {
   var query = {
     raw : true
   }
  if(req.session.user){
   query.where={
     uid: req.session.user.uid
   }
  }
  Note.findAll(query).then((notes)=>{
    res.send({status: 0, data: notes})
  })
});


router.post('/notes/add', function(req, res, next) {
  if(!req.session.user){
    return  res.send({status: 1, errorMsg: '请先登陆'})
  }
  var uid = req.session.user.uid
  var note = req.body.note
  Note.create({ text: note, where:{uid:uid}}).then(()=>{
    res.send({status: 0})
  }).catch(()=>{
    res.send({status: 1, errorMsg: '数据库出错'})
  })
  
  console.log('add.....' ,note)
});


router.post('/notes/edit', function(req, res, next) {
  var uid = req.session.user.uid
  if(!req.session.user){
    return  res.send({status: 1, errorMsg: '请先登陆'})
  }
  Note.update({text: req.body.note}, {where: {id: req.body.id, uid: uid}}).then(()=>{
    console.log(arguments)
    res.send({status: 0})
  })
});


router.post('/notes/delete', function(req, res, next) {
  var uid = req.session.user.uid
  if(!req.session.user){
    return  res.send({status: 1, errorMsg: '请先登陆'})
  }
  Note.destroy({where:{id: req.body.id, uid: uid}}).then(()=>{
    res.send({status:0})
  })
});
module.exports = router;
