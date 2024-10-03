import express from 'express';
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Route: GET /api/meals - Returns all meals
mealsRouter.get('/', async (req, res, next) => {
    try {
        let query = knex('meal');

        const {
            maxPrice,
            availableReservations,
            title,
            dateAfter,
            dateBefore,
            limit,
            sortKey,
            sortDir
        } = req.query;

        // Filtering by maxPrice
        if (maxPrice) {
            query = query.where('price', '<=', parseFloat(maxPrice));
        }

        // Filtering by availability
        if (availableReservations) {
            query = query.where('available_reservations', '>', 0);
        }

        // Filtering by title
        if (title) {
            query = query.where('title', 'like', `%${title}%`);
        }

        // Filtering by dateAfter and dateBefore
        if (dateAfter) {
            query = query.where('date', '>=', dateAfter);
        }
        if (dateBefore) {
            query = query.where('date', '<=', dateBefore);
        }

        // Sorting
        if (sortKey) {
            query = query.orderBy(sortKey, sortDir);
        }

        // Limiting the results
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const meals = await query;
        res.json(meals);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to fetch meals'});
    }
});

// Route: POST /api/meals - Adds a new meal to the database
mealsRouter.post('/', async (req, res, next) => {
    try {
        const newMeal = req.body;
        const [mealId] = await knex('meal').insert(newMeal);
        res.status(201).json({message: "Meal created successfully.", mealId});
    } catch (error) {
        next(error);
    }
});

// Route: GET /api/meals/:id - Returns a meal by ID
mealsRouter.get('/:id', async (req, res) => {
    try {
        const meal = await knex('meal').where({id: req.params.id}).first();
        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({error: 'Meal not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch meal'});
    }
});

// Route: PUT /api/meals/:id - Updates a meal by ID
mealsRouter.put('/:id', async (req, res) => {
    try {
        const updated = await knex('meal').where({id: req.params.id}).update(req.body);
        if (updated) {
            const updatedMeal = await knex('meal').where({id: req.params.id}).first();
            res.json(updatedMeal);
        } else {
            res.status(404).json({error: 'Meal not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to update meal'});
    }
});

// Route: DELETE /api/meals/:id - Deletes a meal by ID
mealsRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await knex('meal').where({id: req.params.id}).del();
        if (deleted) {
            res.json({message: 'Meal deleted'});
        } else {
            res.status(404).json({error: 'Meal not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete meal'});
    }
});

// GET api/meals/:meal_id/reviews - Returns all reviews for a specific meal.
mealsRouter.get("/:meal_id/reviews", async (req, res, next) => {
    try {
        const id = req.params.meal_id;
        const mealReviews = await knex("review").where("meal_id", id);
        if (mealReviews.length === 0) {
            res.json({ message: "Meal not found" });
        } else {
            res.json(mealReviews);
        }
    } catch (error) {
        next(error);
    }
})

export default mealsRouter;