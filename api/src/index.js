import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const meals = await knex.raw("SELECT * FROM Meal");
console.log(meals);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

// Respond with all meals in the future (relative to the 'when' datetime)
app.get('/future-meals', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
    res.json(meals[0].length ? meals[0] : []); // meals[0] because knex.raw returns an array
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Respond with all meals in the past (relative to the 'when' datetime)
app.get('/past-meals', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
    res.json(meals[0].length ? meals[0] : []); // Return empty array if no meals
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Respond with all meals sorted by ID
app.get('/all-meals', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id");
    res.json(meals[0].length ? meals[0] : []);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Respond with the first meal (meaning with the minimum id)
app.get('/first-meal', async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM Meal ORDER BY id LIMIT 1");
    if (meal[0].length) {
      res.json(meal[0][0]); // Return the first meal object
    } else {
      res.status(404).json({ error: 'No meals found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Respond with the last meal (meaning with the maximum id)
app.get('/last-meal', async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meal[0].length) {
      res.json(meal[0][0]); // Return the last meal object
    } else {
      res.status(404).json({ error: 'No meals found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
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