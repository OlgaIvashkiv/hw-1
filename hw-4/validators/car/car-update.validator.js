const Joi = require('joi');

const { MIN_CAR_YEAR } = require('../../configs/constants');

module.exports = Joi.object({
    year: Joi.number().integer().min(MIN_CAR_YEAR).max(MIN_CAR_YEAR + 40),
    model: Joi.string().alphanum().min(2).max(50)
});
