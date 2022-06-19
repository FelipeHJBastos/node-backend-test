import Sequelize from 'sequelize';
import { sequelize } from '../../db';
import { Book } from './book'
import { User } from './user'

const RentedBooks = sequelize.define('rentedBooks', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  bookId: {
    type: Sequelize.UUID,
    references: {
      model: Book,
      key: 'id'
    }
  },
})

User.hasMany(RentedBooks)
RentedBooks.belongsTo(User, {
  as: 'User',
  foreignKey: 'userId'
});

Book.hasMany(RentedBooks)
RentedBooks.belongsTo(Book, {
  as: 'Book',
  foreignKey: 'bookId'
});

export { RentedBooks };