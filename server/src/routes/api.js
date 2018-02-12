import Authenticator from '../controllers/authenticator';
import admin from './admin';
import Middleware from './middlewares';

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send({
        'message': '/api connected'
    });
})

router.get('/userProfile', (req, res)=>{
    res.send(req.user);
})

router.post('/userProfile', Authenticator.updateProfile);

router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

export default router;