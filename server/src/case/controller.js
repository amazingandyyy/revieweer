import Case from './model';
import {progressStatus} from './progress';

export default {
  startOne: (req, res, next) => {
    const {productId} = req.query;
    if(!productId) return next('403:No productId');
    Case.findOne({
      user: req.user._id,
      product: productId
    })
    .then(c=>{
      if(!c){
        // the first visit
        // create case
        Case.create({
          user: req.user._id,
          product: productId,
          progress: progressStatus['viewed'],
          payload: {
            viewed: 1
          }
        }).then(c=>{
          return res.send(c._id);
        }).catch(next)
      }else{
        // not the first visit AND not started yet
        if(c.progress == progressStatus['viewed']){
          // update viewing counts
          // in order to analyze how many times users check but not yet start.
          Case.findByIdAndUpdate(c._id, {
            $inc : { 'payload.viewed' : 1 }
          }).then((c)=>{
            res.send(c._id);
          })
        }
      }
    })
    .catch(next)
  },
  fetchOne: (req, res, next) => {
    const {caseId} = req.query;
    if(!caseId) return next('403:No caseId');
    Case.findOne({
      _id: caseId,
      user: req.user._id
    }).then(c=>{
      if(c.progress == progressStatus['viewed']){
        if(!c)return next('500:No Case For You')
        // update viewing counts
        // in order to analyze how many times users check but not yet start.
        Case.findByIdAndUpdate(c._id, {
          $inc : { 'payload.viewed' : 1 }
        }).then((c)=>{
          res.send(c);
        })
      }
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