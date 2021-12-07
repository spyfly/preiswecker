require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
require('./app/routes/pricealerts.routes')(app);
require('./app/routes/auth.routes')(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});