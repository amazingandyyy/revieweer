import Product from '../models/product';
import { itemLookUp } from '../services';

export default {
  createOneProductFromAmazonLink: (req, res, next) => {
    const {source} = req.query;
    if(!source) return next('403:source is required');
    createOneProductFromAmazonLinkToRevieer()
      .then(id => res.send(id))
      .catch(next);
  },
  getOneProductFromAmazon: (req, res, next) => {
    const {source} = req.query;
    if(!source) return next('403:source is required');
    itemLookUp(source)
      .then(p=>res.send(p))
      .catch(next);
  },
  getOneProductFromRevieweer: (req, res, next) => {
    Product.findById(req.params.id)
    .then(p=>res.send(p))
    .catch(next);
  }
}

export const createOneProductFromAmazonLinkToRevieer = (link) => {
  return new Promise((resolve, reject)=> {
    itemLookUp(link)
    .then(p=>{
      const {imageURL,title,link,price,seller} = p;
      if(!imageURL || !title || !link || !price || !seller) return reject('404:Product Is Not Found On Amazon');
      const product = new Product({
        basic_info: {
          imageURL,title,link,price,seller
        }
      });
      product.save()
      .then(savedProduct => {
        resolve(savedProduct._id);
      })
      .catch(err=>{
        return reject(err);
      });
    })
    .catch((err)=>{
      return reject(err);
    })
  });
}