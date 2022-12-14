

var express = require('express');
var router = express.Router();
const passport = require('passport');

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');


});
//note

// define the Oauth route, 
// this is the route our user will make a request to,
// they will be directed to the oauth consent screen
router.get('/auth/google', passport.authenticate(
  'google', 
  {scope: ['profile', 'email']}
))


// Google OAuth callback route
// this is where google redirects us after the oauth consent screen
// this route has to match your environment for your GOOGLE_CALLBACK,
// which is also registered on Google Authorized redirect domains
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/projects',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  // req.logout <- this is from passport automatically (magic!)
  // destroy the session cookie, so we don't know who the user is anymore

  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;