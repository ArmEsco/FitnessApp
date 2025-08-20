const passport = require("passport");
const LocalStrategy = require("passport-local");

// Mac and Window use
const path = require("path");
const { comparePassword } = require(path.resolve(__dirname, "./HashPassword"));
const { Users } = require(path.resolve(__dirname, "../models"));

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ where: { Email: email } });

        if (!user) {
          return done(null, false);
        }

        const matchPassword = comparePassword(password, user.Password);

        if (!matchPassword) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.UserID);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
