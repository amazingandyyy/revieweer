import config from '../config';
import User from '../models/user';
import {token} from '../services';

export default {
  loginRequired: (req, res, next) => {
    const h = req.header('Authorization');
    (!h)
    ?next('403:Please make sure your request has an Authorization header.')
    :token.verifyToken(h, (err, payload) => {
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
  },
  adminReuired: ({user}, res, next) => (config.admin.list.includes(user.email)) ? next() : next('401:Bad')
}