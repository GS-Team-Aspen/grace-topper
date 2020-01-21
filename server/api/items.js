const router = require('express').Router()
const Op = require('sequelize').Op
const paginate = require('./middleware/paginate')
const {Item, Category, Review, User} = require('../db/models')
const isAdmin = require('./middleware/isAdmin')
module.exports = router

//GET all items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      attributes: ['id', 'name', 'price', 'imageUrl'],
      include: [Category, Review],
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
        Category,
        {
          model: Review,
          include: [
            {
              model: User,
              attributes: ['firstName', 'lastName']
            }
          ]
        }
      ]
    })
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//Create a new product - ADMIN ONLY
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const categories = await Promise.all(
      req.body.itemInfo.categories.map(category =>
        Category.findByPk(category.id)
      )
    )
    delete req.body.itemInfo.categories
    const item = await Item.create(req.body.itemInfo)
    await Promise.all(categories.map(category => item.addCategory(category)))
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
})

//Update item information - ADMIN ONLY
//Add functionality to update categories
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const updatedItem = await Item.update(
      {stock: req.body.quantity, price: req.body.price},
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedItem[1])
  } catch (error) {
    next(error)
  }
})

//DELETE item as an admin
router.delete('/', isAdmin, async (req, res, next) => {
  try {
    await Item.destroy({
      where: {
        id: req.body.itemId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
