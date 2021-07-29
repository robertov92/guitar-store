const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const shopRoutes = require('./routes');
const accountRoutes = require('./routes/account');



const app = express();

app.use(express.static('public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use('/account', accountRoutes)
    .use('/', shopRoutes);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});