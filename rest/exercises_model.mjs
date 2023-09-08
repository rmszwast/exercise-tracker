'use strict';

import 'dotenv/config';
import mongoose from 'mongoose';

// define ValidationError
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

// connect to the database
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// define the collection schema
const exercisesSchema = {
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
};

// creates a Model constructor compiled from the schema definition
// an instance of a model is a document
const Exercise = mongoose.model('Exercise', exercisesSchema);

/**
 * Validates request parameters.
 * @param {string} name 
 * @param {string} reps 
 * @param {string} weight 
 * @param {string} unit 
 * @param {string} date 
 */
const validateParams = (name, reps, weight, unit, date) => {
    if (!name || name.length <= 0) {
        throw new ValidationError('Invalid exercise name');
    }
    if (!Number.isInteger(Number(reps)) || reps <= 0) {
        throw new ValidationError('Invalid reps value');
    }
    if (!Number.isInteger(Number(weight)) || weight <= 0) {
        throw new ValidationError('Invalid weight value');
    }
    if (!['kgs', 'lbs'].includes(unit)) {
        throw new ValidationError('Invalid unit value');
    }
    if (!/^\d\d-\d\d-\d\d$/.test(date)) {
        throw new ValidationError('Invalid date value');
    }
}

/**
 * Creates an exercise. 
 * @param {object} param - a Javascript object containing name, reps, weight, unit, and date properties.
 * @returns A promise. Resolves to a JavaScript object.
 */
const createExercise = async ({name, reps, weight, unit, date}) => {
    validateParams(name, reps, weight, unit, date);
    const exercise = new Exercise({name, reps, weight, unit, date});
    return exercise.save();
}

/**
 * Finds the documents meeting the filter criteria.
 * @param {object} filter
 * @returns A promise. Resolves to JavaScript object.
 */
const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

/**
 * Updates the document meeting the filter criteria
 * @param {object} filter 
 * @param {object} update 
 * @returns A promise. Resolves to JavaScript object.
 */
const updateExercise = async (filter, update) => {
    let {name, reps, weight, unit, date} = update;
    validateParams(name, reps, weight, unit, date);
    const query = await Exercise.updateOne(filter, update);
    return query;
}

/**
 * Deletes the document meeting the filter criteria.
 * @param {object} conditions 
 * @returns A promise. Resolves to JavaScript object.
 */
const deleteExercise = async (conditions) => {
    const query = await Exercise.deleteMany(conditions);
    return query;
}

export default ValidationError;
export {createExercise, findExercises, updateExercise, deleteExercise};
