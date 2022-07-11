const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  level: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.ENUM('weapon', 'head', 'chest', 'leg', 'ring')
  },
  minChestLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minBackLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minArmsLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minAbdominalsLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minLegsLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minShouldersLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minCardioLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  minStretchingLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  combatSkill: {
    type: Sequelize.INTEGER
  },
  expBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  coinBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  chestLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  backLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  armsLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  abdominalsLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  legsLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shouldersLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cardioLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  stretchingLevelBonus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tier: {
    type: Sequelize.ENUM('common', 'uncommon', 'legendary', 'godly'),
    defaultValue: 'common'
  },
})

module.exports = Item
