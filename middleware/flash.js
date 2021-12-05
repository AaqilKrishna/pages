module.exports.setFlash = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error'),
        'info': req.flash('info')
    }
    next();
}