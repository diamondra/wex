function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
}

function authenticationRestMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
		//TODO : implement ROLE
        return next()
    }
    res.json('no way !');
  }
}

module.exports = {
	authenticationMiddleware : authenticationMiddleware,
	authenticationRestMiddleware : authenticationRestMiddleware
}