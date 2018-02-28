import Review from '../model';
import { progressStatus } from '../progress';
import updateReview from './updateReview';
import startOne from './startOne';

export default {
  startOne,
  fetchOne: (req, res, next) => {
    const {reviewId} = req.query;
    if(!reviewId) return next('403:No reviewId');
    Review.findOne({
      _id: reviewId,
      user: req.user._id
    }).then(r=>{
      if(!r) return next('500:No Review For You')
      if(r.progress == progressStatus['viewed']){
        // update viewing counts
        // in order to analyze how many times users check but not yet start.
        Review.findByIdAndUpdate(r._id, {
          $inc : { 'payload.viewed' : 1 }
        }).populate('product').then(r=>res.send(r))
      }else{
        res.send(r);
      }
    })
    .catch(next)
  },
  fetchOwnList: (req, res, next) => {
    Review.find({ user: req.user._id })
    .sort({createdAt: -1})
    .populate('product')
    .then(r=>{
      res.send(r);
    })
    .catch(next)
  },
  updateReview
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