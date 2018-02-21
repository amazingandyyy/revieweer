import Controller from './controller';
import {adminReuired} from '../middlewares';
const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/product connected" }));

router.get('/searchAmazonByProductId', adminReuired, Controller.searchAmazonByProductId);
router.post('/createOne', adminReuired, Controller.createOne);
// router.get('/getOneById', Controller.getOneById); //req.query.productId
router.get('/getOneByProductId', Controller.getOneByProductId); //req.query.productId
router.get('/endOneById', adminReuired, Controller.endOneById); //req.query.id
router.post('/updateOneById', adminReuired, Controller.updateOneById); //req.query.id
router.delete('/deleteOneById', adminReuired, Controller.deleteOneById); //req.query.id
router.put('/deleteOneById', adminReuired, Controller.deleteOneById); //req.query.id
router.put('/activeOneById', adminReuired, Controller.activeOneById); //req.query.id
router.get('/fetchProductPreview', Controller.fetchProductPreview); //req.query.productId

router.get('/fetchAll', Controller.fetchAll);

export default router;