const GitHubStrategy = require("passport-github2").Strategy;
// const { CreateUsers } = require("./models/user");
const passport = require("passport");

const GITHUB_CLIENT_ID = "684282d497ff409c114d";
const GITHUB_CLIENT_SECRET = "51465eb8f8ff46a659ca319b2e73de2224b1ccba";

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
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
