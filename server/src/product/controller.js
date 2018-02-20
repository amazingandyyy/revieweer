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
    const cleanUpObj = {
      productId: obj.productId,
      basic_info: {
        ...obj
      }
    }
    const product = new Product(cleanUpObj);
    product.save()
      .then(p=>{
        return res.send({
          message: 'New Created',
          productId: p._id
        })
      })
      .catch(err=>{
        if(err.code == 11000) {
          Product.findOne({
            productId: cleanUpObj.productId
          })
          .then(p=>{
            return res.send({
              message: 'Already Exists',
              productId: p._id
            })
          })
          .catch(next)
        }else{
          return next(err);
        }
      });
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
