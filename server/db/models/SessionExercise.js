const Sequelize = require('sequelize');
const db = require('../db');

const SessionExercise = db.define('sessionExercise', {
  reps: {
    type: Sequelize.INTEGER
  },
  sets: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.FLOAT
  },
  cardioTime: {
    type: Sequelize.INTEGER
  }
})

module.exports = SessionExercise
