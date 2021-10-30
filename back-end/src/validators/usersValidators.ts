const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { error } = Joi.object({
    districtName: Joi.string().required(),
    state: Joi.string().min(2).max(2).required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
};
