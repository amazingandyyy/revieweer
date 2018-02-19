import config from './config';
import User from './user/model';
import JWT from './user/jwt';

export function loginRequired(req, res, next){
  const h = req.header('Authorization');
  (!h)
  ?next('403:Please make sure your request has an Authorization header.')
  :JWT.verifyToken(h, (err, payload) => {
    if (err) return next(`401:${err.message}`);
    User.findById(payload.sub)
    .then(user => {
      if (!user) return next('404:User not found!');
      req.user = user;
      delete req.user.password;
      next();
    })
    .catch(next)
  })
}
  export function adminReuired({user}, res, next) {
    return (config.admin.list.includes(user.email)) ? next() : next('401:Admin Authorization Failed ')
  }

  export function apifyRequired(req, res, next) {
    const h = req.header('Apify_Authorization');
    if(!h) return next('403:Need Apify_Authorization header.');
    if(h !== 'Apify_Authorization')return next('403:Apify_Authorization is bad.');
    next();
  }