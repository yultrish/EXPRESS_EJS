const User = require('../model/user');


// login user
exports.getUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(403).json({ message: 'Enter email and password' });
        }

        const mail = await User.query().where('email', email).first();
        const usr = await User.query().where('username', username).first();
        const passwrd = await User.query().where('password', password).first()

        if (usr && mail && passwrd) {
            return res.status(200).json(mail);
        } else {
            return res.status(404).json({ message: 'invalid mail' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// get users
exports.getUsers = async (req, res) => {
    try {
        const Users = await User.query();
        if (!Users) {
            throw new Error("Check the database connection, the user table doesn't exist.");
        }
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};


// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please provide email, username, and password.' });
        }

        // Check if the user with the provided email or username already exists
        const existingEmail = await User.query().where('email', email).first();
        const existingUsername = await User.query().where('username', username).first();

        if (existingEmail || existingUsername) {
            return res.status(409).json({ message: 'User with that email or username already exists.' });
        }

        // If email and username are not already in use, create a new user
        const newUser = await User.query().insert({
            email,
            username,
            password, // You should hash the password before storing it in the database
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
