const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

// Modules
const user = require('./modules/user');
const userModel = require("./modules/user/models/userModel");
const db = require("./config/db");

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/users', user.userRoutes);

(async function () {
  try {
    await userModel.createUsersTableIfNotExists();

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error al iniciar la aplicación:", err);
  }
})();