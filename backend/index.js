import express from 'express';
import cors from "cors"  // a way for browsers and servers to interact

import ChoresRoute from "./routes/chores.js"


const app = express();
app.use(express.json()); // To parse JSON request bodies

const allowedOrigins = ['http://localhost:5173'] // if needed, you can add more origins

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
}));

// Route handlers
app.use(ChoresRoute);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**
 * Status Code Reference:
 * 200 --> OK
 * 201 --> Created
 * 400 --> Bad Request
 * 401 --> Unauthorized
 * 404 --> Not Found
 * 406 --> Not Acceptable
 * 500 --> Internal Server Error
 */