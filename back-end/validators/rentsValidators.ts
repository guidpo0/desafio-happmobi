const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { error } = Joi.object({
    dateName: Joi.string().min(5).max(5).required(),
    districtId: Joi.number().integer().min(1).required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
};
