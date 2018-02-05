import Authenticator from '../controllers/authenticator';
import Middlewares from './middlewares';
import api from './api';

const router = require('express').Router();

router.use('/api', Middlewares.loginRequired, api);
router.post('/signupWithEmail', Authenticator.signupWithEmail);
router.post('/verifyEmailToken', Authenticator.verifyEmailToken);
router.post('/signup/:tokenParams', Authenticator.signup);
router.post('/signin', Authenticator.signin);

export default router;