const router = require('express').Router()
//const Op = require('Sequelize').Op
const {Order, Item, User} = require('../db/models')
module.exports = router

//GET all orders--see if additional models should be included
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [User, Item]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//GET specific order; accessible to admin or user that created order
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [User, Item]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//**needs to capture userId; get info to OrderItems
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    // const orderitem = await OrderItem.create(req.body)
    res.status(201)
    res.json(order)
  } catch (error) {
    next(error)
  }
})
