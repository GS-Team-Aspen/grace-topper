const router = require('express').Router()
const paginate = require('./middleware/paginate')
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
    res.json(paginate(reviews, req.query.page, req.query.limit))
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
    res.status(201).json(
      await Item.findByPk(req.body.itemId, {
        include: [Category, {model: Review, include: User}]
      })
    )
  } catch (err) {
    next(err)
  }
})
