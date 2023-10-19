const knex = require('../../config/db')

const mealController = {
    landingPage: async (req, res) => {
        try {

            let usr = req.query.username;

            if (!usr) {
                res.redirect('/login');
            } else {
                let cuisine = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Pescetarian'];

                const meals = await knex('meals').select('*').orderBy('id', 'desc');
                console.log(meals);

                if (!meals) {
                    res.render('pages/notFound', {
                        title: "Not Found",
                        user: usr,
                    });
                }

                res.render('pages/home', {
                    title: "Home",
                    user: usr,
                    kitchen: cuisine,
                    meals: meals
                });
            }
        } catch (err) {
            console.log(err);
        }
    },

    getMeal: (req, res) => {
        res.render('pages/meal', {
            title: "Meals",
        });
    },

    deleteMeal: (req, res) => {
        res.render('pages/meals', {
            title: "Meals",
        });
    }

};


module.exports = mealController;