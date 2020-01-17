module.exports = (req, res, next) => {
  console.log(req.body, 'middleware req')
  next()
  // if (req.user.admin) next()
  // else res.send(403).send('Access denied')
}
