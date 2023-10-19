const router = require('express').Router();
const knex = require('../../config/db');
const User = require('../controllers/user');

router.post('/login', (res, req) => {
    User.getUser(res, req);
});

router.get('/Users', (req, res) => {
    User.Users(req, res);
});


router.get('/v1/getMeals', async(req, res) => {
    const meals = await knex('meals').select('*').orderBy('id', 'desc');
    res.status(200).json({meal: meals});
});









module.exports = router;