const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const videoRoute = require("./routes/videos");
const listRoute = require("./routes/lists");
const bookingRoute = require("./routes/bookings");

dotenv.config();

const PORT = process.env.PORT || 8800

// For Production only
const cors = require('cors');

app.use(cors());   //By default, this allows requests from all origins.

/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://management-app-xssl.onrender.com/');
  next();
});
*/


app.use((req, res, next) => {
  const allowedOrigins = ['https://management-app-xssl.onrender.com/', 'http://localhost:3000/'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  next();
});

/*
// you can customize the CORS options 
const corsOptions = {
  origin: 'https://management-app-xssl.onrender.com/', // Replace with your real website URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Specify the allowed HTTP methods
  // allowedHeaders: ['Content-Type', 'token'], // Specify the allowed request headers
  allowedHeaders: ['token'], // Specify the allowed request headers
  credentials: true

};
app.use(cors(corsOptions));
*/

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/lists", listRoute);
app.use("/api/bookings", bookingRoute);

/*
// For Development
app.listen(8800, () => {
  console.log(`Server started at port http://localhost:8800`)
});
*/

// For Production
app.listen(PORT, () => {
  console.log(`Server started at ${process.env.URL || `http://localhost:${PORT}`}`)
});



