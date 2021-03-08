const express = require('express');
const app = express();

//Settings
app.set('PORT',process.env.PORT || 3000);

//Middleware
app.use(express.json());


//Routes
app.use(require('./routes/employees'));

//Starting the server
app.listen(app.get('PORT'), ()=> {
    console.log('Server on port',app.get('PORT'));
});