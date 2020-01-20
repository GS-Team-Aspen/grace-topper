const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const Item = require('../db/models/item')
const OrderItem = require('../db/models/orderItem')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const oldUser = await User.findByPk(req.body.userId, {
        include: [
          {
            model: Order,
            include: [Item]
          }
        ]
      })
      if (oldUser.orders.length === 1) {
        await oldUser.destroy()
      }
      const userCart = await Order.findOne({
        where: {status: 'carted', userId: user.id},
        include: [Item]
      })
      const oldUserCart = oldUser.orders.filter(
        order => order.status === 'carted'
      )[0]
      if (oldUserCart.items.length === 0) {
        await oldUserCart.destroy()
      } else if (userCart.items.length === 0) {
        await userCart.destroy()
        oldUserCart.update({
          userId: user.id
        })
      } else {
        await Promise.all(
          oldUserCart.items.map(item => {
            const oldItem = userCart.items.filter(temp => temp.id === item.id)
            if (oldItem.length === 1) {
              //theoretically want to add quantities to new orderItem so it has updated quantity, right now cannot update orderItem no matter what is tried
              return oldItem[0].update({
                quantity: oldItem[0].quantity + item.quantity
              })
            }
            return OrderItem.create({
              quantity: item.orderItem.quantity,
              itemId: item.id,
              orderId: userCart.id
            })
          })
        )
        await Promise.all(
          oldUserCart.items.map(item => item.orderItem.destroy())
        )
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  const user = req.user
    ? [req.user]
    : await User.findOrCreate({
        where: {
          sessionId: req.session.id,
          firstName: 'Guest',
          lastName: 'User',
          email: `${req.session.id}@guestmail.com`,
          userType: 'guest'
        }
      })
  res.json(user[0])
})

router.use('/google', require('./google'))
