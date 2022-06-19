import { sequelize } from '../db';

import User from './model/user';
import Book from './model/book';
import RentedBooks from './model/rentedBooks';

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const sync = async () => {
  try {
    await sequelize.sync();
    console.log('Database has been synced successfully.');
  } catch (error) {
    console.error('Unable to sync to the database:', error);
  }
}

init();