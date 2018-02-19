import Product from './model';
import itemLookUp from './itemLookUp';

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
    const {source} = req.query;
    if(!source) return next('403:source is required');
    createFromAmazonToRevieer(source)
      .then(id => res.send(id))
      .catch(next);
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
  }
}

function createFromAmazonToRevieer(link){
  return new Promise((resolve, reject)=> {
    itemLookUp(link)
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
        if(err.code == 11000) return reject('500:The product existing');
        reject(err);
      });
    })
    .catch((err)=>{
      return reject(err);
    })
  });
}