import Product from '../product/model';

export default {
  createOneProduct: (req, res, next) => {
    if(!req.body || !req.body._id || !req.body.actId) return next('500:Not A Valid Apify Request')
    createOneProductFromApify(req.body.data)
      .then(() => res.send())
      .catch(next);
  }
}

function createOneProductFromApify(obj){
  return new Promise((resolve, reject)=>{
    const {imageURL,title,link,price,seller,productId} = obj;
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
  
}