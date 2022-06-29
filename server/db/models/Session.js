const Sequelize = require('sequelize');
const db = require('../db');

const Session = db.define('session', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.DATEONLY
  },
  totalSessionTime: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    // allowNull: false
  }
})

module.exports = Session
