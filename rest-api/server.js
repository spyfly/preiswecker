require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');

const schedulerApp = express();
const app = express();

/* var corsOptions = {
  origin: "http://localhost:5000"
}; */

app.use(cors());
schedulerApp.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
schedulerApp.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
schedulerApp.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require('./app/routes/user.routes')(app);
require('./app/routes/pricealerts.routes')(schedulerApp);
require('./app/routes/auth.routes')(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// set port, listen for requests
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const PORT_SCHEDULER = process.env.API_PORT_SCHEDULER || 5001;
schedulerApp.listen(PORT_SCHEDULER, () => {
  console.log(`Server (for Scheduler) is running on port ${PORT_SCHEDULER}.`);
});