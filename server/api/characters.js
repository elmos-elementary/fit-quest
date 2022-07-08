const router = require('express').Router();
const {
  models: { Character, Item },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const character = await Character.findByPk(id);
    res.json(character);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.json(newCharacter);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateCharacter = await Character.findByPk(req.params.id);
    await updateCharacter.update(req.body);
    res.json(updateCharacter);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteCharacter = await Character.findByPk(req.params.id);
    await deleteCharacter.destroy();
    res.send(deleteCharacter);
  } catch (error) {
    next(error);
  }
});
