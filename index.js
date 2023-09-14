import express from "express";
import { db_connect } from "./db_connect.js";
import todoRouter from "./To-Do/todo.routes.js";

const app = express();
app.use(express.json());

//!acces control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).json({});
  }

  return next();
});
app.use(todoRouter);
db_connect();

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
