const Sequelize = require('sequelize');
const db = require('../db');

const Routine = db.define('routine', {
  name: {
    type: Sequelize.STRING,
  }
})

module.exports = Routine
