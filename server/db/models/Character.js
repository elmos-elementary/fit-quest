const Sequelize = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
  },
  characterExp: {
    type: Sequelize.INTEGER,
  },
  currentLevelExp: {
    type: Sequelize.INTEGER
  },
  currentLevel: {
    type: Sequelize.INTEGER,
  },
  coins: {
    type: Sequelize.INTEGER,
  },
  chestExp: {
    type: Sequelize.INTEGER
  },
  chestCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  chestCurrentLevel: {
    type: Sequelize.INTEGER
  },
  backExp: {
    type: Sequelize.INTEGER
  },
  backCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  backCurrentLevel: {
    type: Sequelize.INTEGER
  },
  armsExp: {
    type: Sequelize.INTEGER
  },
  armsCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  armsCurrentLevel: {
    type: Sequelize.INTEGER
  },
  abdominalsExp: {
    type: Sequelize.INTEGER
  },
  abdominalsCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  abdominalsCurrentLevel: {
    type: Sequelize.INTEGER
  },
  legsExp: {
    type: Sequelize.INTEGER
  },
  legsCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  legsCurrentLevel: {
    type: Sequelize.INTEGER
  },
  shouldersExp: {
    type: Sequelize.INTEGER
  },
  shouldersCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  shouldersCurrentLevel: {
    type: Sequelize.INTEGER
  },
  cardioExp: {
    type: Sequelize.INTEGER
  },
  cardioCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  cardioCurrentLevel: {
    type: Sequelize.INTEGER
  },
  stretchingExp: {
    type: Sequelize.INTEGER
  },
  stretchingCurrentLevelExp: {
    type: Sequelize.INTEGER
  },
  stretchingCurrentLevel: {
    type: Sequelize.INTEGER
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
