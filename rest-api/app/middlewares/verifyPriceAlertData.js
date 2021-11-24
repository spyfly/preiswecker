const { check, validationResult } = require('express-validator')

const customValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            msg: error.msg,
            param: error.param,
            location: error.location,
        };
    },
});

const validateNameRules = [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('No name given!')
      .bail()
      .isString()
      .withMessage('No String given!')
      .bail()
      .isLength({min: 3, max: 200})
      .withMessage('Name should have min. 3 and max. 200 characters!')
      .bail()
      .escape(),
  ];
  
  const validateName = [
    validateNameRules,
    (req, res, next) => {
      const errors = customValidationResult(req);
      if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
      }
      next();
    },
  ];

  const validateFilterUrlRules = [
    check('filterUrl')
      .trim()
      .notEmpty()
      .withMessage('No filter-url given!')
      .bail()
      .isString()
      .withMessage('No String given!')
      .bail()
      .escape(),
  ];
  
  const validateFilterUrl = [
    validateFilterUrlRules,
    (req, res, next) => {
      const errors = customValidationResult(req);
      if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
      }
      next();
    },
  ];

  const validateTargetPriceRules = [
    check('targetPrice')
      .trim()
      .notEmpty()
      .withMessage('No target price given!')
      .bail()
      .isFloat({ min: 0, max: 999999 })
      .withMessage('No float number in range between 0 and 999999 given!')
      .bail()
      .escape(),
  ];

  const validateTargetPrice = [
    validateTargetPriceRules,
    (req, res, next) => {
      const errors = customValidationResult(req);
      if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
      }
      next();
    },
  ];

const validatePriceAlertCreation = [
    validateName,
    validateFilterUrl,
    validateTargetPrice,
    (req, res, next) => {
        const errors = customValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];

const verifyUserData = {
    validatePriceAlertCreation,

    validateName,
    validateFilterUrl,
    validateTargetPrice,
};

module.exports = verifyUserData;
