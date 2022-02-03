const mockingoose = require('mockingoose');
const Record = require('../../models/record');
const recordService = require('../../services/recordService');
const recordsMock = require('../records-mock');

describe('recordService', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    describe('recordService.fetchRecords', () => {
        it('should return a list of records', async () => {
            mockingoose.Record.toReturn(recordsMock, 'aggregate');
            const results = await recordService.fetchRecords(
                '2016-01-26',
                '2018-02-02',
                2700,
                3000
            );

            expect(results[0].totalCount).toBe(2892);
        });
    });
});
