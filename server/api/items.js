const router = require('express').Router()
const Op = require('sequelize').Op
const {Item, Category, Review} = require('../db/models')
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
    res.json(items)
  } catch (err) {
    next(err)
  }
})

//GET specific item
router.get('/:id', async (req, res, next) => {
  try {
    console.log('HERE IN GET ROUTE')
    const item = await Item.findByPk(req.params.id, {
      //Unsure if this is the proper format
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
    const categories = await Promise.all(
      req.body.itemInfo.categories.map(category =>
        Category.findByPk(category.id)
      )
    )
    console.log(categories)
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
router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body)
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
