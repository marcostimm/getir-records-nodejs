const { body, validationResult } = require('express-validator');
const ValidationError = require('../exceptions/ValidationError');

module.exports = {
    validateRules: () => {
        return [
            body('minCount')
                .trim()
                .customSanitizer((value) => parseInt(value))
                .isNumeric({ min: 0 }),
            body('maxCount')
                .trim()
                .customSanitizer((value) => parseInt(value))
                .isNumeric({ min: 0 })
                .custom((maxCount, { req }) => {
                    const minCount = req.body.minCount;
                    if (minCount > maxCount) {
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
                'minCount and maxCount should be a range of valid numbers'
            );
            return;
        }
        next();
    },
};
