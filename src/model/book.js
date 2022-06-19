import Sequelize from 'sequelize';
import { sequelize } from '../../db';

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  synopsis: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

export { Book };