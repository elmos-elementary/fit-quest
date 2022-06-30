const Sequelize = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.INTEGER,
  },
  experience: {
    type: Sequelize.INTEGER,
  },
  lives: {
    type: Sequelize.INTEGER,
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Character;
