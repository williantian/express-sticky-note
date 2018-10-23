var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;



passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
  });
  
  
  passport.use(new GitHubStrategy({
      clientID: '6c1140aa8403a2139a16',
      clientSecret: '511fa8a89802abb96ae800bf735cb173d70f2643',
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // });
      done(null, profile);
    }
  ));

/* GET auth. */
router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
  })
  
  router.get('/github',
    passport.authenticate('github'));
  
  router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
      };
      res.redirect('/');
    });

module.exports = router;
