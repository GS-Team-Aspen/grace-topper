//as of 1/16, not using this -Kristen

const router = require('express').Router()
const {Item, Category, Review} = require('../db/models')
module.exports = router

//GET all reviews for a specific item
router.get('/1', async (req, res, next) => {
  try {
    const category = await Category.findByPk(1)
    res.json(category)
  } catch (error) {
    next(error)
  }
})
