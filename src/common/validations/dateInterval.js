const { body, validationResult } = require('express-validator');
const ValidationError = require('../exceptions/ValidationError');

module.exports = {
    validateRules: () => {
        return [
            body('startDate')
                .trim()
                .isDate({ format: 'YYYY-MM-DD', strictMode: true }),
            body('endDate')
                .trim()
                .isDate({ format: 'YYYY-MM-DD', strictMode: true })
                .custom((endDate, { req }) => {
                    const startDate = req.body.startDate;
                    if (Date.parse(startDate) >= Date.parse(endDate)) {
                        return false;
                    }
                    return true;
                }),
        ];
    },
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            new ValidationError(
                res,
                2,
                'startDate and endDate must have a valid date interval'
            );
            return;
        }
        next();
    },
};
