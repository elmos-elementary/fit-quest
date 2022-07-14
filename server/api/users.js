const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put('/email', async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({where: {email: email}});
    if (user) {
      res.send('User found')
    }
    res.send('No user found');
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    await findUser.update(req.body);
    res.json(findUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    await findUser.destroy();
    res.send(findUser);
  } catch (error) {
    next(error);
  }
});
