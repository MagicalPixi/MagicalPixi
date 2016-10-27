
module.exports = (req, res, next) => {
  if (!req.custom) {
    req.custom = {}
  }
  next()
}
