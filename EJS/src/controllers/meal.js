const knex = require('../../config/db')

const mealController = {

    landingPage: async (req, res    ) => {

        try {

            let usr = req.query.username;
            // if usr is not null or usr is not empty redirect to login page
            // select ur from users where username = usr
            // const user = await knex('users').select('*').where('username', usr);

            if (!usr) {
                res.redirect('/login');
            } else {
                let cuisine = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Pescetarian'];

                const orders = await knex('orders')
                .select('orders.*', 'meals.name', 'meals.price')
                .leftJoin('meals', 'meals.id', 'orders.meal_id' )
                .where('orders.username', usr);

                // get meals from db
                const meals = await knex('meals').select('*').orderBy('id', 'desc');
                // console.log(meals);

                if(!meals){
                    res.render('pages/notFound', {    title: "Not Found",
                    user: usr,});
                }


                res.render('pages/home', {
                    title: "Home",
                    user: usr,
                    kitchen: cuisine,
                    meals: meals,
                    orders: orders 

                }); 
            }

        } catch {
            (err => {
                console.log(err);
            })

        }
    },



    getMeals: async(req, res) => {

        // return res.json({ message: "getting meals from endpoint" });
         const meals = await knex('meals')
         .select("*")
         .orderBy('id', 'desc')

         if (!meals) {
            res.status(409).json({ message: "No orders found" });
          }
          res.status(200).json({ meals: meals });
       
    },
    getMealById: async(req, res) => {
        const meal = await knex('meals').select('*').where('id', req.params.id);
        if(!meal){
            return res.status(404).json({
                message: 'Meal not found'
            });
        }
        return res.status(200).json({
            meal: meal
        });
    },

    createMeal: async(req, res) => {
        const {name, price, description, image_url} = req.body;
        const meal = await knex('meals').insert({
            name: name,
            price: price,
            description: description,
            image_url: image_url
        });
        if(!meal){
            return res.status(500).json({
                message: 'Something went wrong'
            });
        }
        return res.status(201).json({
            message: 'Meal created successfully',
            meal: meal
        });
    },

     deleteMeal: async(req, res) => {
        const meal = await knex('meals').where('id', req.params.id).del();
        if(!meal){
            return res.status(404).json({
                message: 'Meal not found'
            });
        }
        return res.status(200).json({
            message: 'Meal deleted successfully'
        });
    },

    updateMeal: async(req, res) => {
        const {name, price, description, image_url} = req.body;
        const meal = await knex('meals').where('id', req.params.id).update({
            name: name,
            price: price,
            description: description,
            image_url: image_url
        });
        if(!meal){
            return res.status(404).json({
                message: 'Meal not found'
            });
        }
        return res.status(200).json({
            message: 'Meal updated successfully'
        });
    },
    test: (req, res) => {
        res.json({ message: "this is a test endpoint" });
      },
      getOrders: async (req, res) => {
        let username = req.params.username;

        return res.json({ message: "this is a test endpoint", username: username });
        //get all orders from table where username = username
        const orders = await knex("orders")
          .select("*")
          .where("username", username)
          .leftJoin("meals", "meals.id", "orders.meal_id");
    
        if (!orders) {
          res.status(409).json({ message: "Order not found" });
        }
        res.status(200).json({ orders: orders });
      },



};

//export controller
module.exports = mealController;