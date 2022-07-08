const Sequelize = require('sequelize');
const db = require('../db');

const SessionExercise = db.define('sessionExercise', {
  reps: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  sets: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  weight: {
    type: Sequelize.FLOAT
  },
  cardioTime: {
    type: Sequelize.INTEGER
  }
})

module.exports = SessionExercise
