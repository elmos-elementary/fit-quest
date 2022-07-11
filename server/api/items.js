const router = require('express').Router()
const {
  models: { Character, Item, CharacterItem },
} = require('../db')
module.exports = router

// api/items/
// GET ALL ITEMS
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// api/items/:id
// GET SPECIFIC ITEM BY ITEMID
router.get('/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id
    const item = await Item.findByPk(itemId)
    res.json(item)
  } catch (err) {
    next(err)
  }
})

// api/items/chracter/:id
// GET ALL USER'S ITEMS BY CHARACTERID
router.get('/character/:id', async (req, res, next) => {
  try {
    const characterId = req.params.id
    const items = await Item.findAll({
      include: {model: Character, attributes: ['id'], where: {id: characterId}}
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})
