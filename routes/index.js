const router = require('express').Router();

router.use('/email', require('./email'));

module.exports = router;