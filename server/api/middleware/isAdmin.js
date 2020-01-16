const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    //proceed onto the route
    next()
  } else {
    //throw some sort of error
    res.send(404).send('some useful message')
  }
}

module.exports = isAdmin
