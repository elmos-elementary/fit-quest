const router = require('express').Router()
const {
  models: { SessionExercise, Exercise, Session, User },
} = require('../db')
module.exports = router

// api/sessionexercises/
// GET ALL SESSION EXERCISES
router.get('/', async (req, res, next) => {
  try {
    const sessionExercises = await SessionExercise.findAll({
      include: [Exercise, Session, User],
    })
    res.json(sessionExercises)
  } catch (err) {
    next(err)
  }
})

// api/sessionexercises/user/:userId
// GET ALL SESSION EXERCISES FOR USER SESSION
router.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const currentSession = await Session.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    })
    const currentSessionId = currentSession.id
    const sessionExercises = await SessionExercise.findAll({
      where: { userId: userId, sessionId: currentSessionId },
    })
    res.json(sessionExercises)
  } catch (err) {
    next(err)
  }
})

// api/sessionExercises/:sessionExerciseId
// MODIFY SESSION EXERCISE
router.put('/:sessionExerciseId', async( req, res, next) => {
  try {
    const reps = req.body.reps
    const sets = req.body.sets
    const weight = req.body.weight
    const sessionExerciseId = req.params.sessionExerciseId
    const sessionExercise = await SessionExercise.findByPk(sessionExerciseId)
    await sessionExercise.update({reps, sets, weight})
    res.json(sessionExercise)
  } catch (err) {
    next(err)
  }
})

// api/sessionExercises/history/:userId/:exerciseId
// MODIFY SESSION EXERCISE
router.get('/history/:userId/:exerciseId', async( req, res, next) => {
  try {
    const userId = req.params.userId
    const exerciseId = req.params.exerciseId
    const sessionExercises = await SessionExercise.findAll({where: {userId: userId, exerciseId: exerciseId}})
    res.json(sessionExercises)
  } catch (err) {
    next(err)
  }
})
