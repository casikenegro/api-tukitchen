const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const helmet = require("helmet");
const router = require('./routes');
//const createRegisters = require('./createRegisters');
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, paramsLimit: 10000000 }));
//createRegisters.createRegisters();
// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "ok"
  });
});

app.use(router)
module.exports = app;