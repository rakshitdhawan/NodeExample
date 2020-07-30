const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const expressHbs=require('express-handlebars')
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");
// app.use((req,res,next) => {
//     console.log('In the middleware');
//     next();                              //Allows the request to comtinue to next middleware in line
// });

// app.engine('hbs',expressHbs({layoutsDir:'views/layouts/',defaultLayout:'main-layout',extname:'hbs'})); Handlebar registration
app.set('view engine', 'ejs'); // Use PUG engine to combine dynamic template
app.set('views','views'); //Where to find these templates , views is the directory name .

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminData.routes);
app.use(shopRoutes);



app.use(express.static(path.join(__dirname,'public',)))
//changing position of adminRoutes and shopRoutes will not change anything because we are using get method in these routes and get method checks for exact match unlike use method.

app.use((req, res, next) => {
  res.status(404).render('404',{pageTitle:'Page Not Found'});
  console.log(rootDir);
});

app.listen(3000);
//app.get and app.post can be used for get and post requests
