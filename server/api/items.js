const router = require('express').Router()
const {
  models: { Character, Item },
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

// api/items/character/:id
// GET ALL USER'S ITEMS BY CHARACTERID
router.get('/character/:id', async (req, res, next) => {
  try {
    const characterId = req.params.id
    const items = await Item.findAll({
      include: {
        model: Character,
        attributes: ['id'],
        where: { id: characterId },
      },
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// api/items/equip/:characterId/:itemId
// EQUIP ITEM BY CHARACTERID AND ITEMID
router.put('/equip/:characterId/:itemId', async (req, res, next) => {
  try {
    const characterId = req.params.characterId
    const itemId = req.params.itemId

    // Find item and check if belongs to character
    const item = await Item.findByPk(itemId, {
      include: {
        model: Character,
        attributes: ['id'],
        where: { id: characterId },
      },
    })
    if (item === null) {
      res.send('Item does not belong to character')
    }

    // Find character and check if item is already equipped, else equip item and modify combat skill
    const character = await Character.findByPk(characterId)
    let newCombatSkill = character.combatSkill
    switch (item.type) {
      case 'weapon':
        if (character.weapon === item.id) {
          res.send('Item is already equipped')
        } else {
          if (character.weapon) {
            // If unequipping previous item, modify combat skill
            const unequippedItem = await Item.findByPk(character.weapon)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await character.update({
            weapon: item.id,
            combatSkill: newCombatSkill,
          })
        }
        break
      case 'head':
        if (character.head === item.id) {
          res.send('Item is already equipped')
        } else {
          if (character.head) {
            const unequippedItem = await Item.findByPk(character.head)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await character.update({ head: item.id, combatSkill: newCombatSkill })
        }
        break
      case 'chest':
        if (character.chest === item.id) {
          res.send('Item is already equipped')
        } else {
          if (character.chest) {
            const unequippedItem = await Item.findByPk(character.chest)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await character.update({
            chest: item.id,
            combatSkill: newCombatSkill,
          })
        }
        break
      case 'leg':
        if (character.leg === item.id) {
          res.send('Item is already equipped')
        } else {
          if (character.leg) {
            const unequippedItem = await Item.findByPk(character.leg)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await character.update({ leg: item.id, combatSkill: newCombatSkill })
        }
        break
      case 'ring':
        if (character.ring === item.id) {
          res.send('Item is already equipped')
        } else {
          if (character.ring) {
            const unequippedItem = await Item.findByPk(character.ring)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await character.update({ ring: item.id, combatSkill: newCombatSkill })
        }
        break
    }
    res.json(item)
  } catch (err) {
    next(err)
  }
})

// api/items/unequip/:characterId/:slot
// UNEQUIP ITEM BY CHARACTERID AND SLOT
router.put('/unequip/:characterId/:slot', async (req, res, next) => {
  try {
    const characterId = req.params.characterId
    const slot = req.params.slot

    // Find character and check if item is in slot, then unequip item and modify combat skill
    const character = await Character.findByPk(characterId)
    let newCombatSkill = character.combatSkill
    switch (slot) {
      case 'weapon':
        if (!character.weapon) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(character.weapon)
          newCombatSkill -= unequippedItem.combatSkill
          await character.update({ weapon: null, combatSkill: newCombatSkill })
        }
        break
      case 'head':
        if (!character.head) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(character.head)
          newCombatSkill -= unequippedItem.combatSkill
          await character.update({ head: null, combatSkill: newCombatSkill })
        }
        break
      case 'chest':
        if (!character.chest) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(character.chest)
          newCombatSkill -= unequippedItem.combatSkill
          await character.update({ chest: null, combatSkill: newCombatSkill })
        }
        break
      case 'leg':
        if (!character.leg) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(character.leg)
          newCombatSkill -= unequippedItem.combatSkill
          await character.update({ leg: null, combatSkill: newCombatSkill })
        }
        break
      case 'ring':
        if (!character.ring) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(character.ring)
          newCombatSkill -= unequippedItem.combatSkill
          await character.update({ ring: null, combatSkill: newCombatSkill })
        }
        break
    }
    res.json(character)
  } catch (err) {
    next(err)
  }
})

// api/items/loadout/:characterId/
// GET ALL ITEMS CHARACTER HAS EQUIPPED
router.get('/loadout/:characterId/', async (req, res, next) => {
  try {
    const characterId = req.params.characterId
    const loadOut = {
      weapon: null,
      head: null,
      chest: null,
      leg: null,
      ring: null,
    }

    // Get character
    const character = await Character.findByPk(characterId)

    // Check each slot for item, find item info and add to loadout if found
    if (character.weapon) {
      const weapon = await Item.findByPk(character.weapon)
      loadOut.weapon = weapon
    }
    if (character.head) {
      const head = await Item.findByPk(character.head)
      loadOut.head = head
    }
    if (character.chest) {
      const chest = await Item.findByPk(character.chest)
      loadOut.chest = chest
    }
    if (character.leg) {
      const leg = await Item.findByPk(character.leg)
      loadOut.leg = leg
    }
    if (character.ring) {
      const ring = await Item.findByPk(character.ring)
      loadOut.ring = ring
    }

    // Return loadout
    res.json(loadOut)
  } catch (err) {
    next(err)
  }
})
