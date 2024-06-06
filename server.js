const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dotenv config
dotenv.config();

const app = express();

//DB connection
connectDb();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use('/api/v1/test', require('./routes/testRoutes'))
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'))
app.use('/api/v1/category', require('./routes/categoryRoutes'))
app.use('/api/v1/food', require('./routes/foodRoutes'))


app.get("/", (req, res) => {
  return res.status(200).send("<h1>Server testing</h1>");
});

const PORT = 1024 || 5000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT} `);
});
