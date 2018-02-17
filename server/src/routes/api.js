import Authenticator from '../controllers/authenticator';
import admin from './admin';
import product from './product';
import Middleware from './middlewares';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api connected" }));

router.get('/userProfile', (req, res)=>res.send(req.user));
router.post('/userProfile', Authenticator.updateProfile);

router.use('/product', product)

router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

export default router;