module.exports = (req, res, next) => {
  if (req.user.userType === 'admin') next()
  else res.send(403).send('Access denied')
}
