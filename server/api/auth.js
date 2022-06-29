const router = require('express').Router();
const {
  models: { User, Order },
} = require('../db');
module.exports = router;

// api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// api/auth/login
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const userOrder = await Order.create();
    console.log(userOrder)
    await userOrder.setUser(user.dataValues.id);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// api/auth/login
router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
