const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');
const bodyParser = require('body-parser');
const recordsMock = require('./records-mock');
const recordsRoutes = require('../routes/recordsRoutes');

const app = express();
app.use(bodyParser.json());

app.use(recordsRoutes);

describe('Records validation rules', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('POST /records - Invalid date range will return an error', async () => {
        const payloadInvalidDateRange = {
            startDate: '3000-01-26',
            endDate: '2018-02-02',
            minCount: 2700,
            maxCount: 3000,
        };

        const { body } = await request(app)
            .post('/records')
            .send(payloadInvalidDateRange);
        expect(body).toEqual({
            code: 2,
            msg: 'startDate and endDate must have a valid date interval',
        });
    });

    it('POST /records - Invalid count range will return an error', async () => {
        const payloadInvalidCounterRange = {
            startDate: '2016-01-26',
            endDate: '2018-02-02',
            minCount: 2700,
            maxCount: 1000,
        };

        const { body } = await request(app)
            .post('/records')
            .send(payloadInvalidCounterRange);

        expect(body).toEqual({
            code: 2,
            msg: 'minCount and maxCount should be a range of valid numbers',
        });
    });

    it('POST /records - Valid payload should pass the validation', async () => {
        const payloadInvalidCounterRange = {
            startDate: '2016-01-26',
            endDate: '2018-02-02',
            minCount: 2700,
            maxCount: 3000,
        };
        mockingoose.Record.toReturn(recordsMock, 'aggregate');

        const { body } = await request(app)
            .post('/records')
            .send(payloadInvalidCounterRange);

        expect(body).toEqual({
            code: 0,
            msg: 'Success',
            records: recordsMock,
        });
    });
});
