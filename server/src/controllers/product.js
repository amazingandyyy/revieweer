import Product from '../models/product';
import { itemLookUp,itemLookUpStream } from '../services';

export default {
  createFromAmazonSource: (req, res, next) => {
    const {source} = req.query;
    if(!source) return next('403:source is required');
    createFromAmazonSourceToRevieer(source)
      .then(id => res.send(id))
      .catch(next);
  },
  getOneFromAmazon: (req, res, next) => {
    const {source} = req.query;
    if(!source) return next('403:source is required');
    itemLookUp(source)
      .then(p=>res.send(p))
      .catch(next);
  },
  getOneFromRevieweer: (req, res, next) => {
    const {productId} = req.query;
    Product.findById(productId)
      .then(p=>res.send(p))
      .catch(next);
  },
  endOneProductById: (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { end: true })
    .then(_=>res.send())
    .catch(next);
  },
  activeOneProductById: (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { end: false })
    .then(_=>res.send())
    .catch(next);
  }
}

export const createFromAmazonSourceToRevieer = (link) => {
  return new Promise((resolve, reject)=> {
    itemLookUpStream(link)
    .then(p=>{
      const {imageURL,title,link,price,seller,productId} = p;
      const product = new Product({
        basic_info: {
          imageURL,title,link,price,seller
        },
        productId
      });
      product.save()
      .then(savedProduct => {
        resolve(savedProduct._id);
      })
      .catch(err=>{
        if(err.code == 11000) return reject(['The product is existing', err.op.end]);
        reject(err);
      });
    })
    .catch((err)=>{
      return reject(err);
    })
  });
}