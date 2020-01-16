const router = require('express').Router()
//const Op = require('Sequelize').Op
const {Order, OrderItem, Item} = require('../db/models')
module.exports = router

//GET all orders--see if additional models should be included
router.get('/', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [Order, Item]
    })
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

//GET specific order; accessible to admin or user that created order
router.get('/:id', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findAll({
      where: {
        orderId: req.params.id
      },
      include: {
        model: Item,
        where: {
          id: orderItem.itemId
        }
      }
    })
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})
