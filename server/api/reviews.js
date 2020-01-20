const router = require('express').Router()
const Op = require('sequelize').Op
const {Item, Category, Review, User} = require('../db/models')
const paginate = require('./middleware/paginate')
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
    //Testing with page 1, limit 10 and only sending the data
    res.json(paginate(reviews, 1, 10).data)
  } catch (err) {
    next(err)
  }
})
