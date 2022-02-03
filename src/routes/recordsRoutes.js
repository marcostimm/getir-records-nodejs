const express = require('express');
const RecordsController = require('../controllers/recordsController');
const dateInterval = require('../common/validations/dateInterval');
const counterInterval = require('../common/validations/counterInterval');

const router = express.Router();

router.post(
    '/records',
    // Validation Middlewares
    dateInterval.validateRules(),
    dateInterval.validate,
    counterInterval.validateRules(),
    counterInterval.validate,
    // Route Controller
    RecordsController.records
);

module.exports = router;
