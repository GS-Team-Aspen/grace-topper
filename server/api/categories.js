const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

//GET all categories
router.get('/', async (req, res, next) => {
  try {
    res.json(await Category.findAll())
  } catch (error) {
    next(error)
  }
})

//GET a specific category
router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.categoryId)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

//ADD a new category
router.post('/add', async (req, res, next) => {
  try {
    res.json(await Category.create({name: req.body.categoryName}))
  } catch (error) {
    next(error)
  }
})
//DELETE a category and remove association to it from items
router.delete('/delete', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.body.categoryId, {
      include: [Item]
    })
    await category.destroy()
    await Promise.all(
      category.items.map(item => item.update({categoryId: null}))
    )
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
