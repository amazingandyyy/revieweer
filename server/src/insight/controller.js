import Product from '../product/model';
import Review from '../review/model';

export default {
  fetchProducts: (req, res, next) => {
    const {query, options} = req.body;
    fetchProductPromise(query, options)
    .then(list=>{
      res.send(list);
    })
    .catch(next)
  },
  fetchReviewForEachProduct: (req, res, next) => {
    const field = req.query.field;
    const {product, reviews} = req.body;

    switch (field) {
      case 'products':
      break;
      case 'reviews':
      break;
      default:
      return next('404:No Function Available');
    }
    const productsPromise = Product.find(product.query,product.projection,product.options);
    const reviewsPromise = Review.find(reviews.query,reviews.projection,reviews.options);
    Promise.all(productsPromise, reviewsPromise)
    .then(list=>{
      res.send({
        total: list.length,
        list
      })
    })
    .catch(next)
  },
  fetchReviews: (req, res, next) => {
    const {query, options} = req.body;
    fetchReviewsPromise(query, options)
    .then(list=>{
      res.send(list);
    })
    .catch(next)
  },
}

function fetchProductPromise(query={}, options=null, config={}){
  return new Promise((resolve, reject)=> {
    let query = {
      createdAt: {$gt: generateDay(config.days)}
    }
    Product.find(query, options)
    .sort({createdAt: -1})  // latest is first
    .then(list=>resolve(list))
    .catch(err=>reject(err))
  })
}
function fetchReviewsPromise(query={}, options=null, config={}){
  return new Promise((resolve, reject)=> {
    
    let query = {
      createdAt: {$gt: generateDay(config.days)}
    }
    Review.find(query, options)
    .sort({createdAt: -1})  // latest is first
    .then(list=>resolve(list))
    .catch(err=>reject(err))
  })
}

function generateDay(days=14){
    let d = new Date(); // now
    d.setDate(d.getDate() - days);
    return d.toISOString();
}


// const sampleBody = {
//   options: 'details.imageURL details.link benefits',
//   filter: {
//       days: 7
//   }
//     ended: false
//   },
// }