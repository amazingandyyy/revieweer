import Product from './controller';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/product connected" }));

router.post('/createFromAmazon', Product.createFromAmazon);
router.get('/getOneFromAmazon', Product.getOneFromAmazon);
router.get('/getOneFromRevieweer', Product.getOneFromRevieweer);

export default router;