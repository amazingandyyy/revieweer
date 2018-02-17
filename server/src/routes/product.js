import Product from '../controllers/product';
import admin from './admin';
import Middleware from './middlewares';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/product connected" }));

router.post('/createFromAmazonSource', Product.createFromAmazonSource);
router.get('/getOneFromAmazon', Product.getOneFromAmazon);
router.get('/getOneFromRevieweer', Product.getOneFromRevieweer);

router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

export default router;