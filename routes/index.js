const router = require('express').Router();

router.use('/email', require('./email'));
router.use('/access', require('./access'));

module.exports = router;