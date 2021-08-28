const { validate } = require("express-validation")

const validateRequest = (validator, errView) => {
  return (req, res, next) => {
    const result = validator.validate(req.body)
    let values = Object.keys(result.value).reduce((r, k) => {
      r[k] = {value: result.value[k]}
      return r;
    }, {})
    let err = result.error.details.reduce((s, er) => {
      s[er.context.key].error = er.message;
      console.log(er)
      return s;
    }, values)
    console.log(err)
    res.render(errView, {err});
  }
}

module.exports = validateRequest