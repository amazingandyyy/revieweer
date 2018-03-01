import Review from '../model';
import Product from '../../product/model';
import {progressStatus} from '../progress';

export default function(req,res,next) {
  const {productId} = req.query;
    if(!productId) return next('403:No productId');
    Review.findOne({
      user: req.user._id,
      product: productId
    })
    .then(r=>{
      if(!r){
        // the first visit
        // create review
        Review.create({
          user: req.user._id,
          product: productId,
          progress: progressStatus['viewed'],
          payload: {
            viewed: 1
          }
        }).then(review=>{
          Product.findByIdAndUpdate(productId, {
            $addToSet: {
              reviews: review._id
            }
          })
          .then(p=>{
            return res.send(review._id);
          })
        })
        .catch(next)
      }else{
        // not the first visit AND not visited yet
        res.send(r._id);
      }
    })
    .catch(next)
}