import Controller from './controller';
const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/insight connected" }));

router.get('/fetchProducts', Controller.fetchProducts); // req.query
router.get('/fetchReviewForEachProduct', Controller.fetchReviewForEachProduct); // req.query.reviewIds

export default router;