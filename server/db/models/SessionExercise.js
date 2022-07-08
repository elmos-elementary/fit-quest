const Sequelize = require('sequelize');
const db = require('../db');

const SessionExercise = db.define('sessionExercise', {
<<<<<<< HEAD
  reps: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  sets: {
    type: Sequelize.INTEGER,
    defaultValue: 3
=======
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
>>>>>>> main
  },
  weight3: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  cardioTime: {
    type: Sequelize.INTEGER
  }
})

module.exports = SessionExercise
