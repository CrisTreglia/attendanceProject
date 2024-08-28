const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');

//Swagger Documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log('Connected to MongoDB')})
.catch(err => {console.log(`Error connecting to database: ${err}`)});

//View Engines
app.set('view engine', 'ejs');
app.set('views', './views');

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', authRoutes);
app.use('/', studentRoutes);



//Global Error Handling
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('Internal Server Error', err);
    next();
});

//Start Server
app.listen(PORT, () => {
    console.log(`Connected to the http://localhost:${PORT}`);
});