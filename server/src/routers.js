import User from './user/controller';
import {loginRequired, apifyRequired} from './middlewares';
import api from './api';
import apify from './apify';

const router = require('express').Router();
router.get('/', (req, res)=>res.send({message: 'connect to server.revieweer.com', webhook: 'https://server.revieweer.com/webhook', openapi:'https://server.revieweer.com/openapi', api: 'https://server.revieweer.com/api'}));
router.get('/webhook', (req, res)=>res.send({connection: true,timestamp: new Date().toUTCString()}));

router.post('/signupWithEmail', User.signupWithEmail);
router.post('/verifyEmailToken', User.verifyEmailToken);
router.post('/signup/:token', User.signup);
router.post('/signin', User.signin);

router.use('/api', loginRequired, api);

router.use('/apify', apifyRequired, apify);

export default router;