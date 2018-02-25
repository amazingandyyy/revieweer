import Controller from './controller';
const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/review connected" }));

router.get('/startOne', Controller.startOne); // req.query.type
router.get('/fetchOne', Controller.fetchOne);
router.get('/fetchOwnList', Controller.fetchOwnList);

// router.get('/fetchAll', adminReuired, Controller.fetchAll);

export default router;