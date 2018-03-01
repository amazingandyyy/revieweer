import Review from '../model';
import {progressStatus, progressStatusOrder} from '../progress';
export default function(req,res,next) {
  const {type} = req.body;
  const {reviewId} = req.query;
  switch (type) {
    case progressStatus['viewed']:
      res.send()
      break;
    case progressStatus['visited']:
      Review.findById(reviewId)
      .then(review=>{
        const needToUpdateTerm = progressStatusOrder.indexOf(type) > progressStatusOrder.indexOf(review.progress);
        if(needToUpdateTerm) review.progress = type;
        if(!review.payload.visited.at) review.payload.visited.at = req.body.payload.timestap || new Date();
        review.payload.visited.last = req.body.payload.timestap || new Date();
        return review.save();
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
    case progressStatus['ordered']:
      Review.findById(reviewId)
      .then(review=>{
        if(req.body.payload.delete){
          review.payload.ordered.at = null;
          review.payload.ordered.screenshot = '';
          review.payload.ordered.orderNumber = '';
          review.progress = progressStatus['visited'];
          return review.save();
        }else{
          const needToUpdateTerm = progressStatusOrder.indexOf(type) > progressStatusOrder.indexOf(review.progress);
          if(needToUpdateTerm) review.progress = type;
          review.payload.ordered.screenshot = req.body.payload.screenshot || '';
          review.payload.ordered.orderNumber = req.body.payload.orderNumber || '';
          review.payload.ordered.at = req.body.payload.timestap || new Date();
          return review.save();
        }
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
    case progressStatus['reviewed']:
      Review.findById(reviewId)
      .then(review=>{
        review.payload = {
          reviewed: {
            at: req.body.payload.timestap || new Date()
          }
        }
        return review.save();
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
    case progressStatus['payouted']:
      Review.findById(reviewId)
      .then(review=>{
        review.payload = {
          payouted: {
            at: req.body.payload.timestap || new Date(),
            venmoId: 'venmoId'
          }
        }
        return review.save();
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
    case progressStatus['finished']:
      Review.findById(reviewId)
      .then(review=>{
        review.payload = {
          payouted: {
            at: req.body.payload.timestap || new Date(),
            feedback: req.body.payload.feedbackScores
          }
        }
        return review.save();
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
      
    default:
      Review.findById(reviewId)
        .then(r=>res.send(r._id))
      break;
  }
}