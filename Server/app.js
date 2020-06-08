const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');

const app = express();
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(
//     bodyParser.urlencoded({
//         limit: '50mb',
//         extended: true,
//         parameterLimit: 50000,
//     })
// );

// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));

// }

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(`${__dirname}/uploads`));

//****middleware********
app.use((req, res, next) => {
    next();
});
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// });

app.use('/api/v1/users', userRouter);

module.exports = app;