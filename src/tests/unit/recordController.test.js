const mockingoose = require('mockingoose');
const Record = require('../../models/record');
const recordController = require('../../controllers/recordsController');
const recordService = require('../../services/recordService');
const recordsMock = require('../records-mock');

describe('recordController', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    describe('recordController.fetchRecords', () => {
        it('should call the recordService', async () => {
            const req = {
                body: [
                    {
                        startDate: '3000-01-26',
                        endDate: '2018-02-02',
                        minCount: 2700,
                        maxCount: 3000,
                    },
                ],
            };

            const res = { send: jest.fn() };

            let spy = jest
                .spyOn(recordService, 'fetchRecords')
                .mockImplementation(() => Promise.resolve(recordsMock));

            await recordController.records(req, res);

            expect(res.send).toHaveBeenCalled();

            spy.mockRestore();
        });
    });
});
