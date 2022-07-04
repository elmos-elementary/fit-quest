const Sequelize = require('sequelize');
const db = require('../db');

const Exercise = db.define('exercise', {
  name: {
    type: Sequelize.STRING,
  },
  exerciseType: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['strength', 'cardio', 'stretching']],
    },
  },
  bodyPart: {
    type: Sequelize.STRING,
    validate: {
      isIn: [
        ['chest', 'back', 'arms', 'abdominal', 'legs', 'shoulders', 'other'],
      ],
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.STRING,
  },
  video: {
    type: Sequelize.STRING,
  },
});

module.exports = Exercise;
