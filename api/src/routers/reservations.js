import express from 'express';
import knex from '../database_client.js';

const router = express.Router();

// Route: GET /api/reservations - Returns all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await knex('reservation').select('*');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch reservations'});
    }
});

// Route: POST /api/reservations - Adds a new reservation to the database
router.post('/', async (req, res) => {
    try {
        const newReservation = req.body;
        const [id] = await knex('reservation').insert(newReservation);
        const insertedReservation = await knex('reservation')
            .where({id})
            .first();
        res.status(201).json(insertedReservation);
    } catch (error) {
        res.status(500).json({error: 'Failed to add reservation'});
    }
});

// Route: GET /api/reservations/:id - Returns a reservation by ID
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;
