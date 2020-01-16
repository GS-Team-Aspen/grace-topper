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
