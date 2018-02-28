import Controller from './controller';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api connected" }));

router.get('/profile', (req, res)=>{
  req.user.password = null;
  return res.send(req.user)
});
router.post('/profile', Controller.updateProfile);

// router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

export default router;