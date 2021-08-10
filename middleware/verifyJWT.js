const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1] || req.headers["x-access-token"]
      const decoded = jwt.verify(token, config.get('jwtSecretKey'))
      req.userId = decoded.id
      next()
   } catch(e) {
      res.status(401)
   }
}