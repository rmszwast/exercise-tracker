'use strict';

import 'dotenv/config';
import ValidationError from './exercises_model.mjs';
import * as exercises from './exercises_model.mjs';
import express from 'express';

// create express app
const PORT = process.env.PORT;
const app = express();
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// parses incoming requests with JSON payloads
app.use(express.json());

// handler for POST (create) requests
app.post('/exercises', async (req, res) => {
    try {
        const doc = await exercises.createExercise(req.body);
        res.status(201).json(doc);
    } catch(error) {
        if (error instanceof ValidationError) {
            res.status(400).json({Error: 'Invalid request'});
        } else {
            res.status(500).json({Error: 'Something went wrong'});
        }
        console.log(error);
    }
})

// handler for GET (read) requests not specifying an id
app.get('/exercises', async (req, res) => {
    try {
        const result = await exercises.findExercises({});
        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({Error: 'Something went wrong'});
        console.log(error);
    }
})

// handler for GET (read) requests specifying an id
app.get('/exercises/:id', async (req, res) => {
    try {
        const result = await exercises.findExercises({_id: req.params.id});
        if (Object.keys(result).length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({Error: 'Not found'})
        }
    } catch(error) {
        res.status(500).send({Error: 'Something went wrong'});
    }
})

// handler for PUT (update) requests
app.put('/exercises/:id', async (req, res) => {
    try {
        const result = await exercises.updateExercise(
            {_id: req.params.id}, 
            req.body
        );
        if (result.matchedCount === 1) {
            const response = await fetch(`http://localhost:3000/exercises/${req.params.id}`);
            res.status(200).json(await response.json());
        } else {
            res.status(404).json({Error: 'Not found'})
        }
    } catch(error) {
        if (error instanceof ValidationError) {
            res.status(400).json({Error: 'Invalid request'});
        } else {
            res.status(500).json({Error: 'Something went wrong'});
        }
        console.log(error);
    }
})

// handler for DELETE requests
app.delete('/exercises/:id', async (req, res) => {
    try {
        const result = await exercises.deleteExercise({_id: req.params.id});
        if (result.deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({Error: 'Not found'})
        }
    } catch (error) {
        res.status(500).json({Error: 'Something went wrong'});
        console.log(error);
    }
})
