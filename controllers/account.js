exports.getAccount = (req, res, next) => {
    res.render('pages/account', {});
}

exports.getLogin = (req, res, next) => {
    res.render('pages/login', {});
}

exports.getAccInfo = (req, res, next) => {
    res.render('pages/profile-info', {});
}

exports.getWishList = (req, res, next) => {
    res.render('pages/wishlist', {});
}
