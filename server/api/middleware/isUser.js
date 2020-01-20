module.exports = (req, res, next) => {
  if (req.user.userType === 'user' || req.user.userType === 'admin') next()
  else res.send(403).send('Please log in to access this information')
}
