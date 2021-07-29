exports.getIndex = (req, res, next) => {
    res.render('pages/home', {});
}

exports.getCatalog = (req, res, next) => {
    res.render('pages/catalog', {});
}

exports.getCart = (req, res, next) => {
    res.render('pages/checkout', {});
}

exports.getCart = (req, res, next) => {
    res.render('pages/checkout', {});
}

exports.getProduct = (req, res, next) => {
    res.render('pages/product-details', {});
}