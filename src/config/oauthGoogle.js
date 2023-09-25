const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const { CreateUsers } = require("./models/user");
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "563321548580-f319flc0f5b2ulhrjhgdcvoe1fv9a7mv.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    // function (accessToken, refreshToken, profile, cb) {
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    //   });
    // }
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
