const router = require('express').Router()
const Op = require('sequelize').Op
const {Item, Category} = require('../db/models')
const paginate = require('./middleware/paginate')
module.exports = router

//GET all items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      attributes: ['id', 'name', 'price', 'imageUrl'],
      include: [
        {
          model: Category
        }
      ],
      where: {
        stock: {
          [Op.gt]: 0
        }
      }
    })
    res.json(paginate(items, req.query.page, req.query.limit))
  } catch (err) {
    next(err)
  }
})

//GET specific item
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [
        {
          model: Category
        }
      ]
    })
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//Create a new product - ADMIN ONLY
router.post('/', async (req, res, next) => {
  try {
    const item = await Item.create(req.body)
    res.status(201)
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//Update item information - ADMIN ONLY
//Add functionality to update categories
router.put('/:id', async (req, res, next) => {
  try {
    const updatedItem = await Item.update(req.body, {
      where: {id: req.params.id},
      returning: true,
      plain: true
    })
    res.json(updatedItem)
  } catch (error) {
    next(error)
  }
})

//DELETE item as an admin
router.delete('/:id', async (req, res, next) => {
  try {
    await Item.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
