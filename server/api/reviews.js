const router = require('express').Router()
const Op = require('sequelize').Op
const {Item, Category, Review, User} = require('../db/models')
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
router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body.review)
    review.setUser(await User.findByPk(req.body.userId))
    review.setItem(await Item.findByPk(req.body.itemId))
    res.status(201)
    res.json(review)
  } catch (err) {
    next(err)
  }
})
