import Product from './controller';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/product connected" }));

router.post('/createFromAmazon', Product.createFromAmazon);
router.get('/searchOneFromAmazon', Product.searchOneFromAmazon);
router.get('/getOneFromRevieweer', Product.getOneFromRevieweer);
router.post('/webhook', Product.getOneFromRevieweer);

export default router;