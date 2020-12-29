const express = require('express');
const monk = require('Monk');
const Joi = require('joi');

const db = monk(process.env.MONGO_URI);
const records = db.get('records');

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
});

const router = express.Router();

//Read Records
router.get('/records/', async (req, res, next) => {
    try{
        const items = await records.find({});
        res.json(items);
    }catch (error) {
        next(error);
    }
});

//Read Record
router.get('/records/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const items = await records.findOne({
            _id: id,
        });
        if (!item) return next();
        return res.json(item);
    } catch (error) {
        next(error);
    }
});

//Create Record
router.post('/records/', async(req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await records.insert(value);
        res.json(inserted)
    } catch (error) {
        next(error);
    }
});

//Delete Record
router.delete('/records/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await records.remove({_id: id});
        res.json({
            message: 'Success',
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;
