const express = require('express');
const path = require('path');
const route = require('./route');
const authRouter = require('./src/router/router')
const cors = require('cors')
// const router = require('./src/router/routes')
const bodyParser = require('body-parser');
const app = express();
//require ejs layout
const expressLayouts = require('express-ejs-layouts');
const { render } = require('ejs');

//middleware
//use body-parser
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
  }))

//set view engine
app.set('view engine', 'ejs');
//set layout
app.use(expressLayouts);
app.set('layout', 'layouts/main');
//global static files path
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRouter); 
app.use('/', route);

app.get('/', (req, res) => {
    res.render('pages/index', {title: "Login",} );
});

const PORT = 6070
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

