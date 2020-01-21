const router = require('express').Router()
const Op = require('sequelize').Op
const {Item, Category, Review, User} = require('../db/models')
const isUser = require('./middleware/isUser')

module.exports = router

//GET all items
router.get('/:id', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {itemId: req.params.id},
      include: [
        {
          model: User
        }
      ]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

//post new review
router.post('/', isUser, async (req, res, next) => {
  try {
    const review = await Review.create(req.body.review)
    await review.setUser(await User.findByPk(req.body.userId))
    await review.setItem(await Item.findByPk(req.body.itemId))
    console.log(
      await Item.findByPk(req.body.itemId, {include: [Category, Review]})
    )
    res
      .status(201)
      .json(await Item.findByPk(req.body.itemId, {include: [Category, Review]}))
  } catch (err) {
    next(err)
  }
})
