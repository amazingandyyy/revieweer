import Authenticator from '../controllers/authenticator';
import Middlewares from './middlewares';
import api from './api';
// import openapi from './openapi';

const router = require('express').Router();
router.get('/', (req, res)=>res.send({message: 'connect to server.revieweer.com', webhook: 'https://server.revieweer.com/webhook', openapi:'https://server.revieweer.com/openapi', api: 'https://server.revieweer.com/api'}));
router.get('/webhook', (req, res)=>res.send({connection: true,timestamp: new Date().toUTCString()}));
router.use('/api', Middlewares.loginRequired, api);
router.post('/signupWithEmail', Authenticator.signupWithEmail);
router.post('/verifyEmailToken', Authenticator.verifyEmailToken);
router.post('/signup/:token', Authenticator.signup);
router.post('/signin', Authenticator.signin);
// router.use('/openapi', openapi);

export default router;