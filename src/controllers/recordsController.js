const recordService = require('../services/recordService');

/**
 * Record Controller
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @return {void}
 */
const recordsController = {
    records: async (req, res) => {
        const { startDate, endDate, minCount, maxCount } = req.body;

        const data = await recordService.fetchRecords(
            startDate,
            endDate,
            minCount,
            maxCount
        );

        res.send({
            code: 0,
            msg: 'Success',
            records: data,
        });
    },
};

module.exports = recordsController;
