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
    default: 0
  },
  minBackLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  minArmsLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  minAbdominalsLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  minLegsLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  minShouldersLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  minCardioLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  minStretchingLevel: {
    type: Sequelize.INTEGER,
    default: 0
  },
  combatSkill: {
    type: Sequelize.INTEGER
  },
  expBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  coinBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  chestLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  backLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  armsLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  abdominalsLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  legsLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  shouldersLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  cardioLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  stretchingLevelBonus: {
    type: Sequelize.INTEGER,
    default: 0
  },
  tier: {
    type: Sequelize.ENUM('common', 'uncommon', 'legendary', 'godly'),
    default: 'common'
  },
})

module.exports = Item
