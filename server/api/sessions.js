const router = require('express').Router()
const {
  models: {
    Session,
    Routine,
    Exercise,
    User,
    SessionExercise,
    Opponent,
    Item,
  },
} = require('../db')
module.exports = router
const generateOpponentName = require('./tools/opponentNameGenerator')
const generateItem = require('./tools/itemGenerator')

// User Level Experience Table
let levelCounter = 10
const levelExp = {}
for (let i = 1; i <= 100; i++) {
  if (i === 1) {
    levelExp[i] = 0
  } else {
    levelExp[i] = levelCounter
    levelCounter += 11
  }
}

// Skill Level Experience Table
let skillCounter = 10
const skillLevelExp = {}
for (let i = 1; i <= 100; i++) {
  if (i === 1) {
    skillLevelExp[i] = 0
  } else {
    skillLevelExp[i] = skillCounter
    skillCounter += 11
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
      include: [Routine, { model: SessionExercise, include: [{ model: Exercise, attributes: ['name'] }] }],
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
      include: [{ model: SessionExercise, include: [{ model: Exercise, attributes: ['name'] }] }],
    })
    if (!session) {
      res.send('User has no active session!')
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
      res.send("User already has a current session")
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
      include: [{ model: Routine, include: [Exercise] }],
    })

    // Checks if there is a current session
    if (!session) {
      res.send('User has no active session!')
    }

    // Find all exercise types used in session
    const exerciseTypes = {
      chest: 0,
      back: 0,
      arms: 0,
      abdominal: 0,
      legs: 0,
      shoulders: 0,
      cardio: 0,
      stretching: 0,
    }
    const exercises = session.routine.exercises
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i].dataValues
      const type =
        exercise.exerciseType === 'strength'
          ? exercise.bodyPart
          : exercise.exerciseType
      exerciseTypes[type] = 1
    }

    // Calculate total exp gain based on user level and skill levels, does not include item bonus
    const user = await User.findByPk(userId, { include: [Item] })
    let expGain = 0
    expGain =
      user.currentLevel *
      (exerciseTypes.chest +
        exerciseTypes.back +
        exerciseTypes.arms +
        exerciseTypes.abdominal +
        exerciseTypes.legs +
        exerciseTypes.shoulders +
        exerciseTypes.cardio +
        exerciseTypes.stretching)

    // Chest Skill exp
    let newChestExp = user.chestExp
    let newChestCurrentLevel = user.chestCurrentLevel
    let newChestCurrentLevelExp = user.chestCurrentLevelExp
    if (exerciseTypes.chest > 0) {
      let chestExpGain = user.chestCurrentLevel
      newChestExp = user.chestExp + chestExpGain
      newChestCurrentLevel = user.chestCurrentLevel
      while (newChestExp >= skillLevelExp[Number(newChestCurrentLevel) + 1]) {
        newChestCurrentLevel++
      }
      newChestCurrentLevelExp =
        newChestExp - skillLevelExp[newChestCurrentLevel]
    }

    // Back Skill exp
    let newBackExp = user.backExp
    let newBackCurrentLevel = user.backCurrentLevel
    let newBackCurrentLevelExp = user.backCurrentLevelExp
    if (exerciseTypes.back > 0) {
      let backExpGain = user.backCurrentLevel
      newBackExp = user.backExp + backExpGain
      newBackCurrentLevel = user.backCurrentLevel
      while (newBackExp >= skillLevelExp[Number(newBackCurrentLevel) + 1]) {
        newBackCurrentLevel++
      }
      newBackCurrentLevelExp = newBackExp - skillLevelExp[newBackCurrentLevel]
    }

    // Arms Skill exp
    let newArmsExp = user.armsExp
    let newArmsCurrentLevel = user.armsCurrentLevel
    let newArmsCurrentLevelExp = user.armsCurrentLevelExp
    if (exerciseTypes.arms > 0) {
      let armsExpGain = user.armsCurrentLevel
      newArmsExp = user.armsExp + armsExpGain
      newArmsCurrentLevel = user.armsCurrentLevel
      while (newArmsExp >= skillLevelExp[Number(newArmsCurrentLevel) + 1]) {
        newArmsCurrentLevel++
      }
      newArmsCurrentLevelExp = newArmsExp - skillLevelExp[newArmsCurrentLevel]
    }

    // Abdominals Skill exp
    let newAbdominalsExp = user.abdominalsExp
    let newAbdominalsCurrentLevel = user.abdominalsCurrentLevel
    let newAbdominalsCurrentLevelExp = user.abdominalsCurrentLevelExp
    if (exerciseTypes.abdominal > 0) {
      let abdominalsExpGain = user.abdominalsCurrentLevel
      newAbdominalsExp = user.abdominalsExp + abdominalsExpGain
      newAbdominalsCurrentLevel = user.abdominalsCurrentLevel
      while (
        newAbdominalsExp >= skillLevelExp[Number(newAbdominalsCurrentLevel) + 1]
      ) {
        newAbdominalsCurrentLevel++
      }
      newAbdominalsCurrentLevelExp =
        newAbdominalsExp - skillLevelExp[newAbdominalsCurrentLevel]
    }

    // Legs Skill exp
    let newLegsExp = user.legsExp
    let newLegsCurrentLevel = user.legsCurrentLevel
    let newLegsCurrentLevelExp = user.legsCurrentLevelExp
    if (exerciseTypes.legs > 0) {
      let legsExpGain = user.legsCurrentLevel
      newLegsExp = user.legsExp + legsExpGain
      newLegsCurrentLevel = user.legsCurrentLevel
      while (newLegsExp >= skillLevelExp[Number(newLegsCurrentLevel) + 1]) {
        newLegsCurrentLevel++
      }
      newLegsCurrentLevelExp = newLegsExp - skillLevelExp[newLegsCurrentLevel]
    }

    // Shoulders Skill exp
    let newShouldersExp = user.shouldersExp
    let newShouldersCurrentLevel = user.shouldersCurrentLevel
    let newShouldersCurrentLevelExp = user.shouldersCurrentLevelExp
    if (exerciseTypes.shoulders > 0) {
      let shouldersExpGain = user.shouldersCurrentLevel
      newShouldersExp = user.shouldersExp + shouldersExpGain
      newShouldersCurrentLevel = user.shouldersCurrentLevel
      while (
        newShouldersExp >= skillLevelExp[Number(newShouldersCurrentLevel) + 1]
      ) {
        newShouldersCurrentLevel++
      }
      newShouldersCurrentLevelExp =
        newShouldersExp - skillLevelExp[newShouldersCurrentLevel]
    }

    // Cardio Skill exp
    let newCardioExp = user.cardioExp
    let newCardioCurrentLevel = user.cardioCurrentLevel
    let newCardioCurrentLevelExp = user.cardioCurrentLevelExp
    if (exerciseTypes.cardio > 0) {
      let cardioExpGain = user.cardioCurrentLevel
      newCardioExp = user.cardioExp + cardioExpGain
      newCardioCurrentLevel = user.cardioCurrentLevel
      while (newCardioExp >= skillLevelExp[Number(newCardioCurrentLevel) + 1]) {
        newCardioCurrentLevel++
      }
      newCardioCurrentLevelExp =
        newCardioExp - skillLevelExp[newCardioCurrentLevel]
    }

    // Stretching Skill exp
    let newStretchingExp = user.stretchingExp
    let newStretchingCurrentLevel = user.stretchingCurrentLevel
    let newStretchingCurrentLevelExp = user.stretchingCurrentLevelExp
    if (exerciseTypes.stretching > 0) {
      let stretchingExpGain = user.stretchingCurrentLevel
      newStretchingExp = user.stretchingExp + stretchingExpGain
      newStretchingCurrentLevel = user.stretchingCurrentLevel
      while (
        newStretchingExp >= skillLevelExp[Number(newStretchingCurrentLevel) + 1]
      ) {
        newStretchingCurrentLevel++
      }
      newStretchingCurrentLevelExp =
        newStretchingExp - skillLevelExp[newStretchingCurrentLevel]
    }

    // Deal damage to opponent. If defeated, give rewards and create new monster
    const currentOpponent = await Opponent.findOne({
      where: {
        userId: userId,
        alive: true,
      },
    })
    let currentOpponentHealth = currentOpponent.currentHealth
    currentOpponentHealth -= user.combatSkill
    let coins = user.coins
    if (currentOpponentHealth <= 0) {
      await currentOpponent.update({ alive: false, currentHealth: 0 })

      // Give coins
      coins += Math.ceil(
        user.currentLevel * (Math.random() * 0.1 - 0.05 + 1)
      )

      // Roll for item
      const currentItems = user.items
      // If user has no item, give an item. Else 25% chance of item
      if (currentItems.length === 0) {
        const newItem = await Item.create(generateItem(user.currentLevel))
        user.addItem(newItem)
      } else {
        if (Math.ceil(Math.random() * 4) === 4) {
          const newItem = await Item.create(
            generateItem(user.currentLevel)
          )
          user.addItem(newItem)
        }
      }

      // Create new opponent
      const name = generateOpponentName()
      let totalHealth =
      user.currentLevel + (Math.ceil(Math.random() * 5) - 3)
      totalHealth > 0 ? totalHealth : (totalHealth = 1)
      const opponent = await Opponent.create({
        name,
        totalHealth: totalHealth,
        currentHealth: totalHealth,
        level: user.currentLevel,
      })
      opponent.setUser(user)
    } else {
      await currentOpponent.update({ currentHealth: currentOpponentHealth })
    }

    // Add exp gain to user, level up if needed and set currentlLevelExp
    let newCharacterExp = expGain + user.characterExp
    let newCurrentLevel = user.currentLevel
    let newCombatSkill = user.combatSkill
    while (newCharacterExp >= levelExp[Number(newCurrentLevel) + 1]) {
      newCurrentLevel++
      newCombatSkill++
      // Roll for item every level up
      if (Math.ceil(Math.random() * 4) === 4) {
        const newItem = await Item.create(generateItem(user.currentLevel))
        user.addItem(newItem)
      }
    }
    let newCurrentLevelExp = newCharacterExp - levelExp[newCurrentLevel]
    await user.update({
      characterExp: newCharacterExp,
      currentLevel: newCurrentLevel,
      currentLevelExp: newCurrentLevelExp,
      combatSkill: newCombatSkill,
      chestExp: newChestExp,
      chestCurrentLevelExp: newChestCurrentLevelExp,
      chestCurrentLevel: newChestCurrentLevel,
      backExp: newBackExp,
      backCurrentLevelExp: newBackCurrentLevelExp,
      backCurrentLevel: newBackCurrentLevel,
      armsExp: newArmsExp,
      armsCurrentLevelExp: newArmsCurrentLevelExp,
      armsCurrentLevel: newArmsCurrentLevel,
      abdominalsExp: newAbdominalsExp,
      abdominalsCurrentLevelExp: newAbdominalsCurrentLevelExp,
      abdominalsCurrentLevel: newAbdominalsCurrentLevel,
      legsExp: newLegsExp,
      legsCurrentLevelExp: newLegsCurrentLevelExp,
      legsCurrentLevel: newLegsCurrentLevel,
      shouldersExp: newShouldersExp,
      shouldersCurrentLevelExp: newShouldersCurrentLevelExp,
      shouldersCurrentLevel: newShouldersCurrentLevel,
      cardioExp: newCardioExp,
      cardioCurrentLevelExp: newCardioCurrentLevelExp,
      cardioCurrentLevel: newCardioCurrentLevel,
      stretchingExp: newStretchingExp,
      stretchingCurrentLevelExp: newStretchingCurrentLevelExp,
      stretchingCurrentLevel: newStretchingCurrentLevel,
      coins,
    })

    // Assign session as completed
    await session.update({ complete: true })
    res.json(session)
  } catch (err) {
    next(err)
  }
})
