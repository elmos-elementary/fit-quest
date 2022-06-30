const router = require('express').Router()
const {
  models: {Routine, Exercise}
} = require('../db')
module.exports = router

// api/routines/
// GET ALL ROUTINES
router.get('/', async(req, res, next) => {
  try {
    const routines = await Routine.findAll({include: [Exercise]})
    res.json(routines)
  } catch (err) {
    next(err)
  }
})

// api/routines/:id
// GET SPECIFIC ROUTINE BY ROUTINEID
router.get('/:id', async(req, res, next) => {
  try {
    const routineId = req.params.id
    const routine = await Routine.findByPk(routineId, {include: [Exercise]})
    res.json(routine)
  } catch (err) {
    next(err)
  }
})
