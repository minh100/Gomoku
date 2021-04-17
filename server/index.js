const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// hides connection url from public
const dotenv = require('dotenv');
dotenv.config();

// avoid cors error
app.use(cors());

// makes mongoDB work by allowing json files to be parsed correctly
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// Routing
const roomRoutes = require('./Routes/roomRoute.js');
app.use('/rooms', roomRoutes);

// PORT
const PORT = process.env.PORT || 4001;

// connect to database
mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);