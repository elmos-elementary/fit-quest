const Sequelize = require('sequelize');
const db = require('../db');

const SessionExercise = db.define('sessionExercise', {
  set1: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  set2: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  set3: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  weight1: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  weight2: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  weight3: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  cardioTime: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = SessionExercise
