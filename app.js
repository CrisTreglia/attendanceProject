const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log('Connected to MongoDB')})
.catch(err => {console.log(`Error connecting to database: ${err}`)});



//View Engines
app.set('view engine', 'ejs');
app.set('views', './views');

//Middleware
app.use(express.static('public'));

app.use((err, res, req, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
    next();
})

//Start Server
app.listen(PORT, () => {
    console.log(`Connected to the http://localhost:${PORT}`);
});