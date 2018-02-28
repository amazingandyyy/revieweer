import Review from '../model';
import {progressStatus} from '../progress';

export default function(req,res,next) {
  const {type} = req.body;
  const {reviewId} = req.query;
  switch (type) {
    case progressStatus['viewed']:
      res.send()
      break;
    case progressStatus['started']:
      Review.findById(reviewId)
      .then(review=>{
        review.payload = {
          started: {
            at: new Date()
          }
        }
        return review.save();
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
    case progressStatus['ordered']:
      Review.findById(reviewId)
      .then(review=>{
        review.payload = {
          ordered: {
            screenshot: req.payload.screenshot || '',
            orderNumer: req.payload.orderNumer || ''
          }
        }
        return review.save();
      })
      .then(r=>res.send(r._id))
      .catch(next);
      break;
    case progressStatus['reviewed']:
      Review.findById(reviewId)
      .then(review=>{
        review.payload = {
          reviewed: {
            at: new Date()
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
            at: new Date(),
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
            at: new Date(),
            feedback: req.payload.feedbackScores
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