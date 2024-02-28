module.exports = {
  generalErrorHandler (error, req, res, next) {
    if (error instanceof Error) {
      req.flash('error_msg', `${error.name}: ${error.message}`)
    } else {
      req.flash('error_msg', `${error}`)
    }
    res.redirect('back')
    next(error)
  }
}
