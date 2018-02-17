const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/admin connected" }));

export default router;