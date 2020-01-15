const router = require('express').Router()
//const Op = require('Sequelize').Op
const {Order, OrderItem, User, Item} = require('../db/models')
module.exports = router

//GET all orders--see if additional models should be included
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [User]
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

//GET all orders associated to a specific user
router.get('/orderHistory/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//GET or CREATE a new cart for a user; runs at first login ideally
router.get('/cart/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'carted'
      },
      include: [Item]
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/cart/changeQuantity', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findOne({
      where: {
        orderId: req.body.orderId,
        itemId: req.body.itemId
      }
    })
    await orderItem.update({
      quantity: orderItem.quantity + req.body.change
    })
    console.log(orderItem)
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
