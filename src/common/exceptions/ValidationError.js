class ValidationError {
    constructor(res, code, msg) {
        res.status(400).json({ code: code, msg: msg });
    }
}

module.exports = ValidationError;
