const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const helmet = require("helmet");
const multer  = require('multer');
const router = require('./routes');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const createRegisters = require('./createRegisters');
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

app.use(multer({
  storage,
  dest: path.join(__dirname,'public/uploads'),
  fileFilter: (req,file,cb) =>{
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);  
    if (mimetype) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
}).single("image"))


app.use(cors({}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, paramsLimit: 10000000 }));

app.use(express.static(path.join(__dirname, 'public/uploads')));
createRegisters.createRegisters();
// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "ok"
  });
});

app.use(router)
module.exports = app;