const router = require('express').Router()
const {
  models: { User, Item },
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

// api/items/user/:id
// GET ALL USER'S ITEMS BY USERID
router.get('/user/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const items = await Item.findAll({
      include: {
        model: User,
        attributes: ['id'],
        where: { id: userId },
      },
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// api/items/equip/:userId/:itemId
// EQUIP ITEM BY USERID AND ITEMID
router.put('/equip/:userId/:itemId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const itemId = req.params.itemId

    // Find item and check if belongs to user
    const item = await Item.findByPk(itemId, {
      include: {
        model: User,
        attributes: ['id'],
        where: { id: userId },
      },
    })
    if (item === null) {
      res.send('Item does not belong to user')
    }

    // Find user and check if item is already equipped, else equip item and modify combat skill
    const user = await User.findByPk(userId)
    let newCombatSkill = user.combatSkill
    switch (item.type) {
      case 'weapon':
        if (user.weapon === item.id) {
          res.send('Item is already equipped')
        } else {
          if (user.weapon) {
            // If unequipping previous item, modify combat skill
            const unequippedItem = await Item.findByPk(user.weapon)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await user.update({
            weapon: item.id,
            combatSkill: newCombatSkill,
          })
        }
        break
      case 'head':
        if (user.head === item.id) {
          res.send('Item is already equipped')
        } else {
          if (user.head) {
            const unequippedItem = await Item.findByPk(user.head)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await user.update({ head: item.id, combatSkill: newCombatSkill })
        }
        break
      case 'chest':
        if (user.chest === item.id) {
          res.send('Item is already equipped')
        } else {
          if (user.chest) {
            const unequippedItem = await Item.findByPk(user.chest)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await user.update({
            chest: item.id,
            combatSkill: newCombatSkill,
          })
        }
        break
      case 'leg':
        if (user.leg === item.id) {
          res.send('Item is already equipped')
        } else {
          if (user.leg) {
            const unequippedItem = await Item.findByPk(user.leg)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await user.update({ leg: item.id, combatSkill: newCombatSkill })
        }
        break
      case 'ring':
        if (user.ring === item.id) {
          res.send('Item is already equipped')
        } else {
          if (user.ring) {
            const unequippedItem = await Item.findByPk(user.ring)
            newCombatSkill -= unequippedItem.combatSkill
          }
          newCombatSkill += item.combatSkill
          await user.update({ ring: item.id, combatSkill: newCombatSkill })
        }
        break
    }
    res.json(item)
  } catch (err) {
    next(err)
  }
})

// api/items/unequip/:userId/:slot
// UNEQUIP ITEM BY USERID AND SLOT
router.put('/unequip/:userId/:slot', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const slot = req.params.slot

    // Find user and check if item is in slot, then unequip item and modify combat skill
    const user = await User.findByPk(userId)
    let newCombatSkill = user.combatSkill
    switch (slot) {
      case 'weapon':
        if (!user.weapon) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(user.weapon)
          newCombatSkill -= unequippedItem.combatSkill
          await user.update({ weapon: null, combatSkill: newCombatSkill })
        }
        break
      case 'head':
        if (!user.head) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(user.head)
          newCombatSkill -= unequippedItem.combatSkill
          await user.update({ head: null, combatSkill: newCombatSkill })
        }
        break
      case 'chest':
        if (!user.chest) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(user.chest)
          newCombatSkill -= unequippedItem.combatSkill
          await user.update({ chest: null, combatSkill: newCombatSkill })
        }
        break
      case 'leg':
        if (!user.leg) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(user.leg)
          newCombatSkill -= unequippedItem.combatSkill
          await user.update({ leg: null, combatSkill: newCombatSkill })
        }
        break
      case 'ring':
        if (!user.ring) {
          res.send('No item equipped')
        } else {
          const unequippedItem = await Item.findByPk(user.ring)
          newCombatSkill -= unequippedItem.combatSkill
          await user.update({ ring: null, combatSkill: newCombatSkill })
        }
        break
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// api/items/loadout/:userId/
// GET ALL ITEMS USER HAS EQUIPPED
router.get('/loadout/:userId/', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const loadOut = {
      weapon: null,
      head: null,
      chest: null,
      leg: null,
      ring: null,
    }

    // Get user
    const user = await User.findByPk(userId)

    // Check each slot for item, find item info and add to loadout if found
    if (user.weapon) {
      const weapon = await Item.findByPk(user.weapon)
      loadOut.weapon = weapon
    }
    if (user.head) {
      const head = await Item.findByPk(user.head)
      loadOut.head = head
    }
    if (user.chest) {
      const chest = await Item.findByPk(user.chest)
      loadOut.chest = chest
    }
    if (user.leg) {
      const leg = await Item.findByPk(user.leg)
      loadOut.leg = leg
    }
    if (user.ring) {
      const ring = await Item.findByPk(user.ring)
      loadOut.ring = ring
    }

    // Return loadout
    res.json(loadOut)
  } catch (err) {
    next(err)
  }
})
