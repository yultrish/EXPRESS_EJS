const router = require('express').Router();
const knex = require('../../config/db');
const User = require('../controllers/user');
const Order = require('../controllers/order');
const Meal = require('../controllers/meal');

router.post('/login', (res, req) => {
    User.getUser(res, req);
});

router.post('/signup', (res, req) => {
    User.registerUser(res, req);
});

router.get('/Users', (req, res) => {
    User.Users(req, res);
});


router.get('/v1/getMeals', async(req, res) => {
    const meals = await knex('meals').select('*').orderBy('id', 'desc');
    res.status(200).json({meal: meals});
});


//orders
router.get('/allOrders/:username', Order.allOrders)
//get single order
router.get('/get-order/:username/:orderId', Order.getOrderById)

router.post('/Order', Order.Order);

router.delete('/deleteOrder/:id', Order.deleteOrderById)
//delete all orders
router.delete('/deleteAllOrders', Order.deleteAllOrders)

router.patch('/updateOrder/:id', Order.updateOrder )

router.get('/test-end',  Order.test)

//meals
router.get('/v1/getMeals', Meal.getMeals)
router.get('/v1/getMeal/:id', Meal.getMealById)
router.post('/v1/createMeal', Meal.createMeal)
router.delete('/v1/deleteMeal/:id', Meal.deleteMeal)
router.patch('/v1/updateMeal/:id', Meal.updateMeal)
router.get('/test-meal',  Meal.test)
router.get('/test-meal-order/:username',  Meal.getOrders)



module.exports = router;









module.exports = router;