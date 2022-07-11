const Sequelize = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
  },
  characterExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  currentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  currentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  combatSkill: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  coins: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  chestExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  chestCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  chestCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  backExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  backCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  backCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  armsExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  armsCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  armsCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  abdominalsExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  abdominalsCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  abdominalsCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  legsExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  legsCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  legsCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  shouldersExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shouldersCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shouldersCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  cardioExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cardioCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cardioCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  stretchingExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  stretchingCurrentLevelExp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  stretchingCurrentLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  weapon: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  head: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  chest: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  leg: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  ring: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://png.pngtree.com/png-vector/20201228/ourmid/pngtree-a-warrior-boy-clipart-png-image_2659449.jpg'
  }
})

module.exports = Character;
