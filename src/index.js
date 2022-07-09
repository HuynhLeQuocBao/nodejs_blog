const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const route = require('./routes/index.js');
const db = require('./config/db/index.js');
const SortMiddleware = require('./app/middlewares/SortMiddleware.js');

//Connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP Loggers
app.use(morgan('combined'))

app.use(SortMiddleware)

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
