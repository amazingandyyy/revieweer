import Product from './model';
import itemLookUp from './itemLookUp';
import axios from 'axios';

export default {
  searchOneFromAmazon: (req, res, next) => {
    const {source} = req.query;
    if(!source) return next('403:source is required');
    itemLookUp(source, (err, p)=>{
      if(err) return next;
      res.send(p)
    })
  },
  createOne: (req, res, next) => {
    const obj = req.body;
    if(!obj)return next('500:No Product Details')
    const product = new Product(obj);
    product.save()
      .then(p=>res.send(p))
      .catch(next)
  },
  getOneById: (req, res, next) => {
    const {productId} = req.query;
    productId
    ?Product.findById(productId)
      .then(p=>res.send(p))
      .catch(next)
    :next('404:No Product Id')
  },
  endOneById: (req, res, next) => {
    const {productId} = req.query;
    productId
    ?Product.findByIdAndUpdate(productId, { end: true, changeBy: req.user._id })
    .then(_=>res.send())
    .catch(next)
    :next('404:No Product Id')
  },
  activeOneById: (req, res, next) => {
    const {productId} = req.query;
    productId
    ?Product.findByIdAndUpdate(productId, { end: false, changeBy: req.user._id })
    .then(_=>res.send())
    .catch(next)
    :next('404:No Product Id')
  },
  fetchProductFromApify: (req, res, next) => {
    const {productPendingId} = req.query;
    console.log(productPendingId);
    axios.get(`https://api.apify.com/v1/execs/${productPendingId}/results`)
        .then(p=>res.send(p.data[0].pageFunctionResult))
        .catch(next)
  },
}
