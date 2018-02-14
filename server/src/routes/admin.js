const router = require('express').Router();

router.get('/', (req, res, next)=>{
  res.send({
    'message': '/api/admin connected'
  });
})

export default router;