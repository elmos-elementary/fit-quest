const router = require('express').Router()
const {
  models: { Session, Character, Routine, Exercise, User, SessionExercise },
} = require('../db')
module.exports = router

let counter = 10
const levelExp = {}
for (let i = 1; i <= 100; i++) {
  if (i === 1) {
    levelExp[i] = 0
  } else {
    levelExp[i] = counter
    counter += 11
  }
}

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
// CREATE NEW SESSION FOR USER
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
      include: [{model: Routine, include: [Exercise]}]
    })

    // Find all exercise types used in session
    const exerciseTypes = {chest: 0, back: 0, arms: 0, abdominal: 0, legs: 0, shoulders: 0, cardio: 0, stretching: 0}
    const exercises = session.routine.exercises
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i].dataValues
      console.log(exercise.exerciseType)
      const type = exercise.exerciseType === 'strength' ? exercise.bodyPart : exercise.exerciseType
      exerciseTypes[type] = 1
    }
    let exerciseTypeUsed = []
    for (let key in exerciseTypes) {
      if (exerciseTypes[key] > 0) {
        exerciseTypeUsed.push(key)
      }
    }

    // Calculate total exp gain based on character level and skill levels, does not include item bonus
    const user = await User.findByPk(userId)
    const characterId = user.characterId
    const character = await Character.findByPk(characterId)
    const charLevel = character.currentLevel
    let expGain = 0
    expGain = charLevel * (exerciseTypes.chest + exerciseTypes.back + exerciseTypes.arms + exerciseTypes.abdominal + exerciseTypes.legs + exerciseTypes.shoulders + exerciseTypes.cardio + exerciseTypes.stretching)

    // Add exp gain to character, level up if needed and set currentlLevelExp
    let newCharacterExp = expGain + character.characterExp
    let newCurrentLevel = character.currentLevel
    while (newCharacterExp >= levelExp[Number(newCurrentLevel) + 1]) {
      newCurrentLevel++
    }
    let newCurrentLevelExp = newCharacterExp - levelExp[newCurrentLevel]
    await character.update({ characterExp: newCharacterExp, currentLevel: newCurrentLevel, currentLevelExp: newCurrentLevelExp})

    // Assign session as completed
    await session.update({ complete: true })
    res.json(session)
  } catch (err) {
    next(err)
  }
})
