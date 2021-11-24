const { check, validationResult } = require('express-validator')
var bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.user;

checkDuplicateUsername = (value) => {
  var query = User.findOne({ username: value})
  return query.exec().then(user => {
      if (user) {
           return Promise.reject('Username already in use');
      }
  });
}

checkDuplicateEmail = (value) => {
  var query = User.findOne({ email: value})
  return query.exec().then(user => {
      if (user) {
           return Promise.reject('E-mail already in use');
      }
  });
}

const customValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      msg: error.msg,
      param: error.param,
      location: error.location,
    };
  },
});

const validateUsernameDuplicateRule = [
  check('username')
    .custom(checkDuplicateUsername)
    .withMessage('Username already exists!')
    .bail(),
];
 
const validateUsernameDuplicate = [
  validateUsernameDuplicateRule,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(409).json({errors: errors.array()});
    }
    next();
  },
];

const validateEmailDuplicateRule = [
  check('email')
    .custom(checkDuplicateEmail)
    .withMessage('Email already exists!')
    .bail(),
];

const validateEmailDuplicate = [
  validateEmailDuplicateRule,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(409).json({errors: errors.array()});
    }
    next();
  },
];

const validateDuplicates = [
  validateUsernameDuplicateRule,
  validateEmailDuplicateRule,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(409).json({errors: errors.array()});
    }
    next();
  },
];

const validateUsernameRules = [
  check('username')
    .trim()
    .notEmpty()
    .withMessage('No username given!')
    .bail()
    .isString()
    .withMessage('No String given!')
    .bail()
    .isLength({min: 3, max: 50})
    .withMessage('Name should have min. 3 and max. 50 characters!')
    .bail()
    .matches(/^[a-zA-Z0-9_.-]*$/)
    .withMessage('Only letters, numbers, underscores, points and dashes are allowed!')
    .escape(),
];

const validateUsername = [
  validateUsernameRules,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

const validateEmailRules = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('No email address given!')
    .bail()
    .isString()
    .withMessage('No String given!')
    .bail()
    .isEmail()
    .withMessage("Invalid email address!")
    .normalizeEmail()
    .bail()
];

const validateEmail = [
  validateEmailRules,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

const validatePasswordRules = [
  check('password')
    .notEmpty()
    .withMessage('No Password given!')
    .bail()
    .isString()
    .withMessage('No String given!')
    .bail()
    .isLength({min: 8})
    .withMessage('Minimum 8 characters required!')
    .bail()
];

const validatePassword = [
  validatePasswordRules,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

const validateDataSignUp = [
  validateUsernameRules,
  validateEmailRules,
  validatePasswordRules,
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

const validateDataSignIn = [
  check('identifier')
    .trim()
    .notEmpty()
    .withMessage('No identifier (username/email) given!')
    .bail()
    .isString()
    .withMessage('No String given!')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage('No Password given!')
    .bail()
    .isString()
    .withMessage('No String given!')
    .bail(),
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

checkUserExists = (value, {req} ) => {
  var queryUsername = User.findOne({ username: value})
  return queryUsername.exec().then(user => {
      if (!user) {
        var queryEmail = User.findOne({ email: value.toLowerCase()})
        return queryEmail.exec().then(user2 => {
          if (!user2) {
               return Promise.reject('User doesnt exist!');
          }else{
            req.currentUser =  user2 ;
          }
      });
      }else{
        req.currentUser =  user ;
      }
  });
}

const validateUserExists = [
  check('identifier')
    .trim()
    .custom(checkUserExists)
    .withMessage('No user with this identifier (email/username) found!')
    .bail(),
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(404).json({errors: errors.array()});
    }
    next();
  },
];

checkPasswordForUser = (value, {req}) => {
  var passwordIsValid = bcrypt.compareSync(
    value,
    req.currentUser.password
  );
  if (!passwordIsValid) {
    throw new Error('Password is wrong!');
  }
  return true;
}

const validatePasswordForUser = [
  check('password')
    .trim()
    .custom(checkPasswordForUser)
    .withMessage('Password is wrong!')
    .bail(),
  (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()){
      return res.status(401).json({errors: errors.array()});
    }
    next();
  },
];

const verifyUserData = {
  validateDataSignUp,

  validateUsername,
  validateEmail,
  validatePassword,

  validateDuplicates,

  validateUsernameDuplicate,
  validateEmailDuplicate,

  validateDataSignIn,

  validateUserExists,
  validatePasswordForUser
};

module.exports = verifyUserData;
