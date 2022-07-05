const router = require('express').Router()
const {
  models: { Session, Routine, Exercise, User, SessionExercise },
} = require('../db')
module.exports = router

// api/sessions/
// GET ALL SESSIONS
router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      include: [Routine, SessionExercise],
    })
    res.json(sessions)
  } catch (err) {
    next(err)
  }
})

// api/sessions/:id
// GET SESSION BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const session = await Session.findByPk(id)
    res.json(session)
  } catch (err) {
    next(err)
  }
})

// api/sessions/all/:userId
// GET ALL SESSION FROM USER
router.get('/all/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const sessions = await Session.findAll({
      where: {
        userId: userId,
      },
      include: [Routine, SessionExercise],
    })
    res.json(sessions)
  } catch (err) {
    next(err)
  }
})

// api/sessions/current/:userId
// GET CURRENT SESSION FROM USER
router.get('/current/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const session = await Session.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    })
    if (!session) {
      res.send("User has no active session!")
    } else {
      res.json(session)
    }
  } catch (err) {
    next(err)
  }
})

// api/sessions/start/:userId
// CREATE NEW SESSION FOR USER (NO REQ.BODY REQUIRED)
// req.body needs date and routineId (example: {date: 2022-06-29, routineId: 2)
router.post('/start/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const check = await Session.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    })
    // Check if there is a current session for user. If so, return session
    if (check) {
      res.json(check)
    } else {
      // If no current session for user, create session along with session exercises, then returns it
      const user = await User.findByPk(userId)
      const date = req.body.date
      const routineId = req.body.routineId
      const session = await Session.create({ date, routineId })
      const routine = await Routine.findByPk(routineId, { include: [Exercise] })
      for (let i = 0; i < routine.exercises.length; i++) {
        await SessionExercise.create({
          exerciseId: routine.exercises[i].id,
          userId,
          sessionId: session.id,
        })
      }
      await user.addSession(session)
      res.json(session)
    }
  } catch (err) {
    next(err)
  }
})

// api/sessions/complete/:userId
// COMPLETE CURRENT SESSION FOR USER
router.put('/complete/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const session = await Session.findOne({
      where: {
        userId: userId,
        complete: false,
      },
    })
    await session.update({ complete: true })
    res.json(session)
  } catch (err) {
    next(err)
  }
})
