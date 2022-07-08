const Sequelize = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
  },
  characterExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  currentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  currentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  coins: {
    type: Sequelize.INTEGER,
    default: 0
  },
  chestExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  chestCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  chestCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  backExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  backCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  backCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  armsExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  armsCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  armsCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  abdominalsExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  abdominalsCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  abdominalsCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  legsExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  legsCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  legsCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  shouldersExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  shouldersCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  shouldersCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  cardioExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  cardioCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  cardioCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  stretchingExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  stretchingCurrentLevelExp: {
    type: Sequelize.INTEGER,
    default: 0
  },
  stretchingCurrentLevel: {
    type: Sequelize.INTEGER,
    default: 1
  },
  weapon: {
    type: Sequelize.INTEGER,
    default: null
  },
  head: {
    type: Sequelize.INTEGER,
    default: null
  },
  chest: {
    type: Sequelize.INTEGER,
    default: null
  },
  leg: {
    type: Sequelize.INTEGER,
    default: null
  },
  ring: {
    type: Sequelize.INTEGER,
    default: null
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Character;
