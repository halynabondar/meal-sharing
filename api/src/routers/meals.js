import express from 'express';
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Route: GET /api/meals - Returns all meals
mealsRouter.get('/', async (req, res, next) => {
    try {
        let query = knex('meal');
        const {
            maxPrice, minPrice, availableReservations,
            title, dateAfter, dateBefore, limit, sortKey, sortDir
        } = req.query;

        // Validations
        if (maxPrice && isNaN(parseFloat(maxPrice))) return res.status(400).json({ error: 'Invalid maxPrice' });
        if (limit && isNaN(parseInt(limit))) return res.status(400).json({ error: 'Invalid limit' });
        if (dateAfter && isNaN(Date.parse(dateAfter))) return res.status(400).json({ error: 'Invalid dateAfter' });
        if (dateBefore && isNaN(Date.parse(dateBefore))) return res.status(400).json({ error: 'Invalid dateBefore' });
        if (sortDir && !['asc', 'desc'].includes(sortDir)) return res.status(400).json({ error: 'Invalid sortDir' });

        // Filters
        if (minPrice) query.where('price', '>=', parseFloat(minPrice));
        if (maxPrice) query.where('price', '<=', parseFloat(maxPrice));
        if (availableReservations) {
            const hasSpots = availableReservations === "true";
            query.leftJoin("reservation", "meal.id", "reservation.meal_id")
                .select("meal.*")
                .groupBy("meal.id")
                .havingRaw(hasSpots ? "COUNT(reservation.id) < meal.max_reservations" : "COUNT(reservation.id) >= meal.max_reservations");
        }
        if (title) query.where('title', 'like', `%${title}%`);
        if (dateAfter) query.where('when', '>=', dateAfter);
        if (dateBefore) query.where('when', '<=', dateBefore);

        // Sorting and limiting results
        if (sortKey) query.orderBy(sortKey, sortDir || 'asc');
        if (limit) query.limit(Math.min(parseInt(limit), 100)); // set an upper limit

        const meals = await query;
        res.json(meals);
    } catch (error) {
        next(error);
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
            const reservations = await knex('reservation').where("meal_id", req.params.id).count('id').first();
            const availableReservations = meal['max_reservations'] - reservations['count(`id`)'];
            meal['available_reservations'] = availableReservations;
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
        // Updating the meal and getting the count of updated rows
        const updated = await knex('meal').where({id: req.params.id}).update(req.body);

        if (updated) {
            // If update was successful, return a success message
            res.json({message: 'Meal updated successfully'});
        } else {
            // If no rows were updated, the meal doesn't exist
            res.status(404).json({error: 'Meal not found'});
        }
    } catch (error) {
        // Handling errors
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

        // Validate if id is a valid format (if needed)
        if (!id || isNaN(id)) {
            return res.status(400).json({error: "Invalid meal ID"});  // Bad Request
        }

        const mealReviews = await knex("review").where("meal_id", id);

        // If no reviews found, return 404
        if (mealReviews.length === 0) {
            return res.status(404).json({message: "No reviews found for this meal"});
        }

        // Return reviews with 200 status
        res.status(200).json(mealReviews);

    } catch (error) {
        // Log error for server logs (optional)
        console.error(error);

        // Forward error to an error handling middleware
        next(error);
    }
});

mealsRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
});

export default mealsRouter;