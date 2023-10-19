const User = require('../model/user');


// login user
exports.getUser = async (req, res) => {
    try {
        const { email, username } = req.body;

        if (!email || !username) {
            return res.status(403).json({ message: 'Enter email and password' });
        }

        const mail = await User.query().where('email', email).first();
        const usr = await User.query().where('username', username).first();

        if (usr && mail) {
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