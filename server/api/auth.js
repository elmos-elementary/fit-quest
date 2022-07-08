const router = require('express').Router();
const {
  models: { User, Character },
} = require('../db');
module.exports = router;

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
    const character = await Character.create({name: user.firstName})
    user.setCharacter(character)
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
