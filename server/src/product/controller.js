import Product from './model';
import itemLookUp from './itemLookUp';
import axios from 'axios';

export default {
  searchAmazonByProductId: (req, res, next) => {
    const {productId} = req.query;
    if(!productId) return next('403:productId is required');
    itemLookUp(productId, (err, p)=>{
      if(err) return next;
      res.send(p)
    })
  },
  createOne: (req, res, next) => {
    const obj = req.body;
    if(!obj)return next('500:No Product Details')
    const cleanUpObj = {
      details: {
        imageURL: obj.imageURL,
        title: obj.title,
        link: obj.link,
        price: obj.price,
        seller: obj.seller,
      },
      benefits: {
          cashback: obj.cashback,
          notes: obj.notes || '',
          rewards: obj.rewards,
      },
      productId: obj.productId
    }
    Product.findOneByProductId(obj.productId)
    .then(p=>{
      if(p) {
        return res.send({
          message: 'Existing',
          productId: p.productId
        })
      }
      const product = new Product(cleanUpObj);
      product.save().then(p=>{
        return res.send({
          message: 'New',
          productId: p.productId
        })
      })
    })
    .catch(next)
  },
  getOneByProductId: (req, res, next) => {
    const {productId} = req.query;
    if(!productId) next('404:No Product Id')
    productId
    ?Product.findOneByProductId(productId)
      .then(p=>res.send(p))
      .catch(next)
    :next('404:No Product Id')
  },
  endOneById: (req, res, next) => {
    const {id} = req.query;
    id
    ?Product.findByIdAndUpdate(id, { end: true })
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  updateOneById: (req, res, next) => {
    const {id} = req.query;
    const obj = req.body;
    id
    ?Product.findByIdAndUpdate(id, {$set: dotNotate(obj)})
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  activeOneById: (req, res, next) => {
    const {id} = req.query;
    id
    ?Product.findByIdAndUpdate(id, { end: false })
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  deleteOneById: (req, res, next) => {
    const {id} = req.query;
    id
    ?Product.findByIdAndRemove(id)
    .then(_=>res.send())
    .catch(next)
    :next('404:No Id')
  },
  fetchProductFromApify: (req, res, next) => {
    const {productPendingId} = req.query;
    console.log(productPendingId);
    axios.get(`https://api.apify.com/v1/execs/${productPendingId}/results`)
        .then(p=>res.send(p.data[0].pageFunctionResult))
        .catch(next)
  },
}

function dotNotate(obj,target,prefix) {
  target = target || {},
  prefix = prefix || "";

  Object.keys(obj).forEach(function(key) {
    if ( typeof(obj[key]) === "object" ) {
      dotNotate(obj[key],target,prefix + key + ".");
    } else {
      return target[prefix + key] = obj[key];
    }
  });

  return target;
}