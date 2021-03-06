import 'dotenv/config'
import { Book } from './model/book';

import express from 'express';
import database from './database';
import { loginRouter } from './routes/login';
import { booksRouter } from './routes/books';
import { rentRouter } from './routes/rent';

import passport from 'passport';
import session from 'express-session';
import Auth from '../auth';

Auth(passport);

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  return res.status(401).json({ message: "Not authorized." })
}

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 15 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
app.use('/books', authMiddleware, booksRouter);
app.use('/rent', authMiddleware, rentRouter);

app.listen(3000, () => { console.log('Server is running...') });
