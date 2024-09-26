import express from 'express';
import knex from "../database_client.js";

const router = express.Router();

// Route: GET /api/meals - Returns all meals
router.get('/', async (req, res) => {
    try {
        const meals = await knex('meal').select('*');
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

// Route: POST /api/meals - Adds a new meal to the database
router.post('/', async (req, res) => {
    try {
        const newMeal = req.body;
        const [id] = await knex('meal').insert(newMeal);
        const insertedMeal = await knex('meal').where({ id }).first();
        res.status(201).json(insertedMeal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add meal' });
    }
});

// Route: GET /api/meals/:id - Returns a meal by ID
router.get('/:id', async (req, res) => {
    try {
        const meal = await knex('meal').where({ id: req.params.id }).first();
        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meal' });
    }
});

// Route: PUT /api/meals/:id - Updates a meal by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await knex('meal').where({ id: req.params.id }).update(req.body);
        if (updated) {
            const updatedMeal = await knex('meal').where({ id: req.params.id }).first();
            res.json(updatedMeal);
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update meal' });
    }
});

// Route: DELETE /api/meals/:id - Deletes a meal by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await knex('meal').where({ id: req.params.id }).del();
        if (deleted) {
            res.json({ message: 'Meal deleted' });
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete meal' });
    }
});

module.exports = router;