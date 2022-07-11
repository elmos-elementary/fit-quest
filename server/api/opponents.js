const router = require('express').Router()
const {
  models: { User, Opponent },
} = require('../db')
module.exports = router

// api/opponents
// GET ALL OPPONENTS
router.get('/', async (req, res, next) => {
  try {
    const opponents = await Opponent.findAll()
    res.json(opponents)
  } catch (error) {
    next(error)
  }
})

// api/opponents/all/:userId
// GET ALL USER'S OPPONENTS BY USERID
router.get('/all/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const opponents = await Opponent.findAll({where: {userId: userId}})
    res.json(opponents)
  } catch (error) {
    next(error)
  }
})

// api/opponents/current/:userId
// GET ALL USER'S CURRENT OPPONENT BY USERID
router.get('/current/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const opponents = await Opponent.findOne({where: {userId: userId, alive: true}})
    res.json(opponents)
  } catch (error) {
    next(error)
  }
})
