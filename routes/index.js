var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginData
  if(req.session.user){
      loginData = {
      isLogin: true,
      user: {
        avatar: req.session.user.avatar,
        name: req.session.user.name
      }
    }
  }else{
    loginData ={
      isLogin: false
    }
  }
  
  res.render('index', loginData);
});

module.exports = router;
