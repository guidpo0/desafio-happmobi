const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { error } = Joi.object({
    climateHour: Joi.number().integer().min(0).max(23)
      .required(),
    climateRain: Joi.number().min(0).required(),
    dateId: Joi.number().integer().min(1).required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
};
