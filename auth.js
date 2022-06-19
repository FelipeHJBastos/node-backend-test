import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './src/model/user'

export default (passport) => {
  const findUser = async (name) => {
    const user = await User.findAll({ where: { name } });
    return user[0].dataValues;
  }

  const findUserById = async (id) => {
    const user = await User.findAll({ where: { id } });
    return user[0].dataValues;
  }

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id);
      done(null, user)
    } catch (error) {
      console.log(error);
      return done(error, null)
    }
  })

  passport.use(new LocalStrategy({
    username: 'name',
    password: 'password',
  }, async (name, password, done) => {
    try {
      const user = await findUser(name);

      if (!user)
        return done(null, false);

      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid)
        return done(null, false);

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error, false)
    }
  }));
}