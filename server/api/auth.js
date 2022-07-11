const router = require('express').Router();
const {
  models: { User, Opponent},
} = require('../db');
module.exports = router;
const generateOpponentName = require('./tools/opponentNameGenerator')

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
    // Create initial opponent for user
    const opponent = await Opponent.create({
      name: generateOpponentName(),
      totalHealth: 3,
      currentHealth: 3,
      level: 1,
    })
    opponent.setCharacter(user)
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
