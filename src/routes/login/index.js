import { Router } from 'express';
import passport from 'passport';

const loginRouter = new Router();

loginRouter.get('/', (req, res) => {
  if (req.query.fail)
    return res.status(403).json('User/Password is invalid!');
  else
    return res.status(200).send();
})

loginRouter.post('/', passport.authenticate('local', {
  successRedirect: '/login', 
  failureRedirect: '/login?fail=true'
}))

export { loginRouter };
