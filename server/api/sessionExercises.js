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

// api/sessionexercises/:id
// GET SESSION EXERCISE BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const sessionExercise = await SessionExercise.findByPk(id, {include: [Exercise]})
    res.json(sessionExercise)
  } catch (err) {
    next(err)
  }
})

// api/sessionexercises/current/:userId
// GET CURRENT SESSION EXERCISES FROM USER
router.get('/current/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const currentSession = await Session.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    })
    if (!currentSession) {
      res.send('User has no active session!')
    } else {
      const currentSessionId = currentSession.id
      const sessionExercises = await SessionExercise.findAll({
        where: { userId: userId, sessionId: currentSessionId },
        include: [
          { model: Session, attributes: ['date'] }, // returns date of session
          { model: Exercise, attributes: ['name'] }, // returns name of exercise
        ],
      })
      res.json(sessionExercises)
    }
  } catch (err) {
    next(err)
  }
})

// api/sessionexercises/all/:userId
// GET ALL SESSION EXERCISES FROM USER
router.get('/all/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const sessionExercises = await SessionExercise.findAll({
      where: { userId: userId },
      include: [
        { model: Session, attributes: ['date'] }, // returns date of session
        { model: Exercise, attributes: ['name'] }, // returns name of exercise
      ],
    })
    res.json(sessionExercises)
  } catch (err) {
    next(err)
  }
})

// api/sessionExercises/:sessionExerciseId
// MODIFY SESSION EXERCISE
router.put('/:sessionExerciseId', async (req, res, next) => {
  try {
    const set1 = req.body.set1
    const set2 = req.body.set2
    const set3 = req.body.set3
    const weight1 = req.body.weight1
    const weight2 = req.body.weight2
    const weight3 = req.body.weight3
    const sessionExerciseId = req.params.sessionExerciseId
    const sessionExercise = await SessionExercise.findByPk(sessionExerciseId, {include: [Exercise]})
    await sessionExercise.update({ set1, set2, set3, weight1, weight2, weight3 })
    res.json(sessionExercise)
  } catch (err) {
    next(err)
  }
})

// api/sessionExercises/history/:userId/:exerciseId
// GET PAST SESSION EXERCISES FROM USER BY ID
router.get('/history/:userId/:exerciseId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const exerciseId = req.params.exerciseId
    const sessionExercises = await SessionExercise.findAll({
      where: { userId: userId, exerciseId: exerciseId },
      include: [
        { model: Session, attributes: ['date'] }, // returns date of session
        { model: Exercise, attributes: ['name'] }, // returns name of exercise
      ],
    })
    res.json(sessionExercises)
  } catch (err) {
    next(err)
  }
})
