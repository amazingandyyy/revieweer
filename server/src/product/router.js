import Controller from './controller';
import {adminReuired} from '../middlewares';
const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/product connected" }));

router.get('/searchOneFromAmazon', adminReuired, Controller.searchOneFromAmazon);
router.post('/createOne', adminReuired, Controller.createOne);
router.get('/getOneById', Controller.getOneById); //req.query.productId
router.get('/getOneByProductId', Controller.getOneByProductId); //req.query.productId
router.get('/endOneById', adminReuired, Controller.endOneById); //req.query.productId
router.get('/activeOneById', adminReuired, Controller.activeOneById); //req.query.productId
router.get('/fetchProductFromApify', Controller.fetchProductFromApify); //req.query.productId

export default router;