const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  currentSession: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
  },
  // Character Information
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
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
