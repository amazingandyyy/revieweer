import Controller from './controller';
const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/review connected" }));

router.get('/startOne', Controller.startOne); // req.query.type
router.get('/fetchOne', Controller.fetchOne);
router.get('/fetchOwnList', Controller.fetchOwnList);
router.post('/updateReview', Controller.updateReview);

export default router;