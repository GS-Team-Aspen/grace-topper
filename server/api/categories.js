const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

//GET all categories
router.get('/', async (req, res, next) => {
  try {
    const category = await Category.findAll()
    res.json(category)
  } catch (error) {
    next(error)
  }
})
