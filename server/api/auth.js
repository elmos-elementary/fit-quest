const router = require('express').Router();
const {
  models: { User, Character, Opponent},
} = require('../db');
module.exports = router;
const generateName = require('./tools/opponentNameGenerator')

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    // Create character for user
    const character = await Character.create({name: user.firstName})
    user.setCharacter(character)
    // Create initial opponent for user
    const opponent = await Opponent.create({
      name: generateName(),
      totalHealth: 3,
      currentHealth: 3,
      level: 1,
    })
    opponent.setCharacter(character)
    // Token stuff
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    // console.log('req :>> ', req.headers);
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    console.log('in router get error');
    next(ex);
  }
});
