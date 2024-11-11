import express from 'express';
import knex from '../database_client.js';

const reservationsRouter = express.Router();

// Route: GET /api/reservations - Returns all reservations
reservationsRouter.get('/', async (req, res) => {
    try {
        let query = knex('reservation');

        const {
            dateAfter,
            dateBefore,
            limit,
            sortKey,
            sortDir
        } = req.query;

        // Validation
        if (limit && isNaN(parseInt(limit))) {
            return res.status(400).json({ error: 'Invalid limit: must be an integer.' });
        }

        if (dateAfter && isNaN(Date.parse(dateAfter))) {
            return res.status(400).json({ error: 'Invalid dateAfter: must be a valid date.' });
        }

        if (dateBefore && isNaN(Date.parse(dateBefore))) {
            return res.status(400).json({ error: 'Invalid dateBefore: must be a valid date.' });
        }

        if (sortDir && !['asc', 'desc'].includes(sortDir)) {
            return res.status(400).json({ error: 'Invalid sortDir: must be either "asc" or "desc".' });
        }

        // Filter by date range
        if (dateAfter) {
            query = query.where('created_date', '>=', dateAfter);
        }
        if (dateBefore) {
            query = query.where('created_date', '<=', dateBefore);
        }

        // Sort results
        if (sortKey) {
            query = query.orderBy(sortKey, sortDir);
        }

        // Limit the number of results
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const reservations = await query;
        res.json(reservations);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch reservations'});
    }
});

// Route: POST /api/reservations - Adds a new reservation to the database
reservationsRouter.post('/', async (req, res) => {
    try {
        const newReservation = req.body;
        // newReservation["created_date"] = new Date().toISOString();
        const [id] = await knex('reservation').insert(newReservation)                                                                                                   ;
        const insertedReservation = await knex('reservation')
            .where({id})
            .first();
        res.status(201).json(insertedReservation);
    } catch (error) {
        res.status(500).json({error: 'Failed to add reservation'});
    }
});

// Route: GET /api/reservations/:id - Returns a reservation by ID
reservationsRouter.get('/:id', async (req, res) => {
    try {
        const reservation = await knex('reservation')
            .where({id: req.params.id})
            .first();
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({error: 'Reservation not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch reservation'});
    }
});

// Route: PUT /api/reservations/:id - Updates a reservation by ID
reservationsRouter.put('/:id', async (req, res) => {
    try {
        const updated = await knex('reservation').where({id: req.params.id}).update(req.body);
        if (updated) {
            const updatedReservation = await knex('reservation')
                .where({id: req.params.id})
                .first();
            res.json(updatedReservation);
        } else {
            res.status(404).json({error: 'Reservation not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to update reservation'});
    }
});

// Route: DELETE /api/reservations/:id - Deletes a reservation by ID
reservationsRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await knex('reservation')
            .where({id: req.params.id})
            .del();
        if (deleted) {
            res.json({message: 'Reservation deleted'});
        } else {
            res.status(404).json({error: 'Reservation not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete reservation'});
    }
});

export default reservationsRouter;
