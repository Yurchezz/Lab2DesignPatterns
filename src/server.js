const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');

const insurance = require('./routes/insurance.route');

const express = require('express');
const dotenv = require('dotenv');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

//app.use(`/api/v1/orders`, orderRouter);
app.use(`/api/v1/insurance`, insurance);
// app.use('/api/v1/driver_per_order',driverRouter);
// app.use('/api/v1/users',driverRouter);
// app.use('/api/v1/fuel',fuelRouter);
// app.use('/api/v1/oil',oilRouter);
//app.use('/api/v1/wheel_preasure',wheelPreasureRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.set('views', './views')
app.set('view engine', 'pug')
// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
