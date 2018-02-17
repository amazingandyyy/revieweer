import Product from '../controllers/product';

const router = require('express').Router();

router.get('/', (req, res)=>res.send({ 'message': '/openapi connected' }));
router.get('/getOneFromAmazon', Product.getOneFromAmazon);

export default router;