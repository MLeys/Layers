const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, done) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    try {
      let user = await User.findOne({ googleId: profile.id});

      if(user) return done(null, user); 
      
      
      user = await User.create({
        name: profile.displayName,
				googleId: profile.id,
				email: profile.emails[0].value,
				avatar: profile.photos[0].value
      })
      return done(null, user);

    } catch(err) {
      console.log(err);
      console.log('ERROR TERMINAL ---> passport.js');
      return done(err)
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});


passport.deserializeUser(function(userId, done){
  // this function opens up the session cookie,
  // grabs the userId, ^ the argument userId, is from the session cookie
  // and will attach the user document to req.user, 
  // which will be abailible in every single controller function
  User.findById(userId, function(err, userDoc){
    if(err) return done(err);
    done(null, userDoc); // this assigns the user document that we just found from the database to req.user
  // req.user = userDocemployee})
  })
})


// passport.deserializeUser(function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

// });



