module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  req.flash('success', '請在此登入')
  return res.redirect('/login')
}
