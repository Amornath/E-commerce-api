export {};
const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../models/user");
// Google Plus Strategy
const googleConfig = {
  clientID:
    "480235287440-1m3asr3cd5reholl931n8hq5rgpodlde.apps.googleusercontent.com", // Your client id
  clientSecret: "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", // Your client secret
};
const googleStrategy = new GooglePlusTokenStrategy(
  googleConfig,
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        const newUser = await User.create({
          email: profile.emails[0].value,
          firstname: profile.displayName,
          password: profile.displayName,
        });
        return done(null, newUser);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

passport.use(googleStrategy);
const authGoogle = passport.authenticate("google-plus-token", {
  session: false,
});

module.exports = authGoogle;
