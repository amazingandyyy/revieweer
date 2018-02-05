import Authentication from '../controllers/authentication';
import Middlewares from './middlewares';
import api from './api';

const router = require('express').Router();

router.use('/api', Middlewares.loginRequired, api);
router.post('/signupWithEmail', Authentication.signupWithEmail);
router.post('/verifyEmailToken', Authentication.verifyEmailToken);
router.post('/signin', Authentication.signin);
router.post('/signup/:tokenParams', Authentication.signup);

export default router;