const router = require('express').Router()
const {
  models: {
    Session,
    Character,
    Routine,
    Exercise,
    User,
    SessionExercise,
    Opponent,
  },
} = require('../db')
module.exports = router
const generateName = require('./tools/opponentNameGenerator')

// Character Level Experience Table
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

    // Calculate total exp gain based on character level and skill levels, does not include item bonus
    const user = await User.findByPk(userId)
    const characterId = user.characterId
    const character = await Character.findByPk(characterId)
    const charLevel = character.currentLevel
    let expGain = 0
    expGain =
      charLevel *
      (exerciseTypes.chest +
        exerciseTypes.back +
        exerciseTypes.arms +
        exerciseTypes.abdominal +
        exerciseTypes.legs +
        exerciseTypes.shoulders +
        exerciseTypes.cardio +
        exerciseTypes.stretching)

    // Chest Skill exp
    let newChestExp = character.chestExp
    let newChestCurrentLevel = character.chestCurrentLevel
    let newChestCurrentLevelExp = character.chestCurrentLevelExp
    if (exerciseTypes.chest > 0) {
      let chestExpGain = character.chestCurrentLevel
      newChestExp = character.chestExp + chestExpGain
      newChestCurrentLevel = character.chestCurrentLevel
      while (newChestExp >= skillLevelExp[Number(newChestCurrentLevel) + 1]) {
        newChestCurrentLevel++
      }
      newChestCurrentLevelExp =
        newChestExp - skillLevelExp[newChestCurrentLevel]
    }

    // Back Skill exp
    let newBackExp = character.backExp
    let newBackCurrentLevel = character.backCurrentLevel
    let newBackCurrentLevelExp = character.backCurrentLevelExp
    if (exerciseTypes.back > 0) {
      let backExpGain = character.backCurrentLevel
      newBackExp = character.backExp + backExpGain
      newBackCurrentLevel = character.backCurrentLevel
      while (newBackExp >= skillLevelExp[Number(newBackCurrentLevel) + 1]) {
        newBackCurrentLevel++
      }
      newBackCurrentLevelExp = newBackExp - skillLevelExp[newBackCurrentLevel]
    }

    // Arms Skill exp
    let newArmsExp = character.armsExp
    let newArmsCurrentLevel = character.armsCurrentLevel
    let newArmsCurrentLevelExp = character.armsCurrentLevelExp
    if (exerciseTypes.arms > 0) {
      let armsExpGain = character.armsCurrentLevel
      newArmsExp = character.armsExp + armsExpGain
      newArmsCurrentLevel = character.armsCurrentLevel
      while (newArmsExp >= skillLevelExp[Number(newArmsCurrentLevel) + 1]) {
        newArmsCurrentLevel++
      }
      newArmsCurrentLevelExp = newArmsExp - skillLevelExp[newArmsCurrentLevel]
    }

    // Abdominals Skill exp
    let newAbdominalsExp = character.abdominalsExp
    let newAbdominalsCurrentLevel = character.abdominalsCurrentLevel
    let newAbdominalsCurrentLevelExp = character.abdominalsCurrentLevelExp
    if (exerciseTypes.abdominal > 0) {
      let abdominalsExpGain = character.abdominalsCurrentLevel
      newAbdominalsExp = character.abdominalsExp + abdominalsExpGain
      newAbdominalsCurrentLevel = character.abdominalsCurrentLevel
      while (
        newAbdominalsExp >= skillLevelExp[Number(newAbdominalsCurrentLevel) + 1]
      ) {
        newAbdominalsCurrentLevel++
      }
      newAbdominalsCurrentLevelExp =
        newAbdominalsExp - skillLevelExp[newAbdominalsCurrentLevel]
    }

    // Legs Skill exp
    let newLegsExp = character.legsExp
    let newLegsCurrentLevel = character.legsCurrentLevel
    let newLegsCurrentLevelExp = character.legsCurrentLevelExp
    if (exerciseTypes.legs > 0) {
      let legsExpGain = character.legsCurrentLevel
      newLegsExp = character.legsExp + legsExpGain
      newLegsCurrentLevel = character.legsCurrentLevel
      while (newLegsExp >= skillLevelExp[Number(newLegsCurrentLevel) + 1]) {
        newLegsCurrentLevel++
      }
      newLegsCurrentLevelExp = newLegsExp - skillLevelExp[newLegsCurrentLevel]
    }

    // Shoulders Skill exp
    let newShouldersExp = character.shouldersExp
    let newShouldersCurrentLevel = character.shouldersCurrentLevel
    let newShouldersCurrentLevelExp = character.shouldersCurrentLevelExp
    if (exerciseTypes.shoulders > 0) {
      let shouldersExpGain = character.shouldersCurrentLevel
      newShouldersExp = character.shouldersExp + shouldersExpGain
      newShouldersCurrentLevel = character.shouldersCurrentLevel
      while (
        newShouldersExp >= skillLevelExp[Number(newShouldersCurrentLevel) + 1]
      ) {
        newShouldersCurrentLevel++
      }
      newShouldersCurrentLevelExp =
        newShouldersExp - skillLevelExp[newShouldersCurrentLevel]
    }

    // Cardio Skill exp
    let newCardioExp = character.cardioExp
    let newCardioCurrentLevel = character.cardioCurrentLevel
    let newCardioCurrentLevelExp = character.cardioCurrentLevelExp
    if (exerciseTypes.cardio > 0) {
      let cardioExpGain = character.cardioCurrentLevel
      newCardioExp = character.cardioExp + cardioExpGain
      newCardioCurrentLevel = character.cardioCurrentLevel
      while (newCardioExp >= skillLevelExp[Number(newCardioCurrentLevel) + 1]) {
        newCardioCurrentLevel++
      }
      newCardioCurrentLevelExp =
        newCardioExp - skillLevelExp[newCardioCurrentLevel]
    }

    // Stretching Skill exp
    let newStretchingExp = character.stretchingExp
    let newStretchingCurrentLevel = character.stretchingCurrentLevel
    let newStretchingCurrentLevelExp = character.stretchingCurrentLevelExp
    if (exerciseTypes.stretching > 0) {
      let stretchingExpGain = character.stretchingCurrentLevel
      newStretchingExp = character.stretchingExp + stretchingExpGain
      newStretchingCurrentLevel = character.stretchingCurrentLevel
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
        characterId: characterId,
        alive: true
      }
    })
    let currentOpponentHealth = currentOpponent.currentHealth
    currentOpponentHealth -= character.currentLevel // USING CURRENT LEVEL TO DAMAGE, CHANGE LATER
    let coins = character.coins
    if (currentOpponentHealth <= 0) {
      await currentOpponent.update({alive: false, currentHealth: 0})
      // Give item
      switch (currentOpponent.type) {
        case 'common':
          break
        case 'uncommon':
          break
        case 'legendary':
          break
        case 'godly':
          break
      }

      // Give coins
      coins += Math.ceil(character.currentLevel * ((Math.random() * 0.1 - 0.05) + 1))

      // Create new opponent
      const name = generateName()
      let totalHealth = character.currentLevel + (Math.ceil(Math.random() * 5) - 3)
      totalHealth > 0 ? totalHealth : totalHealth = 1
      const opponent = await Opponent.create({
        name,
        totalHealth: totalHealth,
        currentHealth: totalHealth,
        level: character.currentLevel
      })
      opponent.setCharacter(character)
    } else {
      await currentOpponent.update({currentHealth: currentOpponentHealth})
    }

    // Add exp gain to character, level up if needed and set currentlLevelExp
    let newCharacterExp = expGain + character.characterExp
    let newCurrentLevel = character.currentLevel
    while (newCharacterExp >= levelExp[Number(newCurrentLevel) + 1]) {
      newCurrentLevel++
    }
    let newCurrentLevelExp = newCharacterExp - levelExp[newCurrentLevel]
    await character.update({
      characterExp: newCharacterExp,
      currentLevel: newCurrentLevel,
      currentLevelExp: newCurrentLevelExp,
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
      coins
    })

    // Assign session as completed
    await session.update({ complete: true })
    res.json(session)
  } catch (err) {
    next(err)
  }
})
