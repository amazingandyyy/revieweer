import Product from '../models/product';

export default {
  newProduct: (req, res, next) => {
    const {keyword, link} = req.body;
    if(!keyword) return next('403:keyword is required');
    if(!keyword) return next('403:link is required');
    const product = new Product({
      keyword,
      link
    });

    product.save().then((savedProduct) => {
      res.send(savedProduct._id);
    }).catch(next);
  }

}