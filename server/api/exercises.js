const router = require('express').Router();
const {
  models: { Exercise },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const exercise = await Exercise.findByPk(id);
    res.json(exercise);
  } catch (error) {
    next(error);
  }
});
