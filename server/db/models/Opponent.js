const Sequelize = require('sequelize');
const db = require('../db');

const Opponent = db.define('opponent', {
  name: {
    type: Sequelize.STRING
  },
  totalHealth: {
    type: Sequelize.INTEGER
  },
  currentHealth: {
    type: Sequelize.INTEGER
  },
  level: {
    type: Sequelize.INTEGER
  },
  tier: {
    type: Sequelize.ENUM('common', 'uncommon', 'legendary', 'godly'),
    default: 'common'
  },
  alive: {
    type: Sequelize.BOOLEAN,
    default: true
  }
})

module.exports = Opponent;
