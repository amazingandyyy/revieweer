import user from './user/router';
import product from './product/router';
import caseRouter from './case/router';
// import admin from './admin';
// import Middleware from './middlewares';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api connected" }));

router.use('/user', user)
router.use('/product', product)
router.use('/case', caseRouter)

// router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

export default router;