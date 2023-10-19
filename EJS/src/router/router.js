const router = require('express').Router();
const knex = require('../../config/db');
const User = require('../controllers/user');

router.post('/login', (res, req) => {
    User.getUser(res, req);
});

router.get('/Users', (req, res) => {
    User.Users(req, res);
});








module.exports = router;