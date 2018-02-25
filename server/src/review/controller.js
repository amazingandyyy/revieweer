import Review from './model';
import {progressStatus} from './progress';

export default {
  startOne: (req, res, next) => {
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
        }).then(r=>{
          return res.send(r._id);
        }).catch(next)
      }else{
        // not the first visit AND not started yet
        if(r.progress == progressStatus['viewed']){
          // update viewing counts
          // in order to analyze how many times users check but not yet start.
          Review.findByIdAndUpdate(r._id, {
            $inc : { 'payload.viewed' : 1 }
          }).then((r)=>{
            res.send(r._id);
          })
        }
      }
    })
    .catch(next)
  },
  fetchOne: (req, res, next) => {
    const {reviewId} = req.query;
    if(!reviewId) return next('403:No reviewId');
    Review.findOne({
      _id: reviewId,
      user: req.user._id
    }).then(r=>{
      if(r.progress == progressStatus['viewed']){
        if(!r)return next('500:No Review For You')
        // update viewing counts
        // in order to analyze how many times users check but not yet start.
        Review.findByIdAndUpdate(r._id, {
          $inc : { 'payload.viewed' : 1 }
        }).then((r)=>{
          res.send(r);
        })
      }
    })
    .catch(next)
  },
  fetchOwnList: (req, res, next) => {
    console.log(req.user._id);
    Review.find({ user: req.user._id })
    .sort({createdAt: -1})
    .populate('product')
    .then(r=>{
      console.log(r);
      res.send(r);
    })
    .catch(next)
  }
}


// switch (type) {
//   case progressStatus['started']:
//     break;
//   case progressStatus['ordered']:
//     break;
//   case progressStatus['reviewed']:
//     break;
//   case progressStatus['payouted']:
//     break;
//   case progressStatus['finished']:
//     break; 
//   default:
//     break;
// }