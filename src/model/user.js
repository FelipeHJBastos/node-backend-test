import Sequelize from 'sequelize';
import { sequelize } from '../../db';

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    unique: true,
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

export { User };