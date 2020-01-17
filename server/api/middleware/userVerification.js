module.exports = (req, res, next) => {
  console.log(req.user, 'middleware req')

  if (req.user.admin) next()
  else res.send(403).send('Access denied')
}
