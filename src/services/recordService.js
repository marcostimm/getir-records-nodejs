const Record = require('../models/record');
const InternalError = require('../common/exceptions/InternalError');

/**
 * Record Service
 *
 * @param {String} startDate
 * @param {String} endDate
 * @param {String} minCount
 * @param {String} maxCount
 *
 * @return {Array} Return an array of records
 */
const recordService = {
    fetchRecords: async (startDate, endDate, minCount, maxCount) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return Record.aggregate([
            {
                $project: {
                    key: 1,
                    createdAt: 1,
                    totalCount: {
                        $sum: '$counts',
                    },
                },
            },
            {
                $match: {
                    $and: [
                        { createdAt: { $gte: start, $lte: end } },
                        { totalCount: { $gte: minCount, $lte: maxCount } },
                    ],
                },
            },
        ])
            .then((records) => {
                return records;
            })
            .catch((err) => {
                throw new InternalError(
                    'Could not retrieve data from the database. Check connection.'
                );
            });
    },
};

module.exports = recordService;
