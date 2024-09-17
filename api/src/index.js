import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

// const meals = await knex.raw("SELECT * FROM Meal");
// console.log(meals);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

// Respond with all meals in the future (relative to the 'when' datetime)
app.get('/future-meals', (req, res) => {
  const now = new Date();
  const futureMeals = meals.filter(meal => meal.datetime > now);
  res.json(futureMeals);
});

// Respond with all meals in the past (relative to the 'when' datetime)
app.get('/past-meals', (req, res) => {
  const now = new Date();
  const pastMeals = meals.filter(meal => meal.datetime < now);
  res.json(pastMeals);
});

// Respond with all meals sorted by ID
app.get('/all-meals', (req, res) => {
  const sortedMeals = meals.sort((a, b) => a.id - b.id);
  res.json(sortedMeals);
});

// Respond with the first meal (meaning with the minimum id)
app.get('/first-meal', (req, res) => {
  const firstMeal = meals.reduce((min, meal) => (meal.id < min.id ? meal : min), meals[0]);
  res.json(firstMeal);
});

// Respond with the last meal (meaning with the maximum id)
app.get('/last-meal', (req, res) => {
  const lastMeal = meals.reduce((max, meal) => (meal.id > max.id ? meal : max), meals[0]);
  res.json(lastMeal);
});

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
