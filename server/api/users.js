const router = require('express').Router()
const {User, Address} = require('../db/models')
module.exports = router

//GET all users
router.get('/', async (req, res, next) => {
  //Authenticate that the user is an admin in order to access all users
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'admin', 'firstName', 'lastName'],
      include: [
        {
          //Confirm naming of address model
          model: Address
        }
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET specific user
router.get('/:id', async (req, res, next) => {
  //Authenticate - only admin and the specific user should have access to the user
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//Register new user - MOVE TO AUTH ROUTE
// router.post('/', async (req, res, next) => {
//   try {
//     const {firstName, lastName, email, password} = req.body
//     res.status(201)
//     res.json(
//       await User.create({firstName, lastName, email, password, admin: false})
//     )
//   } catch (error) {
//     next(error)
//   }
// })

//Update user information - admin and the user should be able to update, not other users
//Admin should be able to promote other users to admins
router.put('/:id', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    const updatedUser = await User.update(
      {firstName, lastName, email, password},
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

//DELETE user as an admin
router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
