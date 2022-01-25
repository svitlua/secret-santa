const { body, param } = require("express-validator");
const { MIN_WISHES_NUMBER, MAX_WISHES_NUMBER } = require("./constants");

exports.addUserValidation = [
  body("firstname")
    .isLength({ min: 1 })
    .withMessage("Firstname can not be empty")
    .trim(),
  body("lastname")
    .isLength({ min: 1 })
    .withMessage("Lastname can not be empty")
    .trim(),
  body("wishes.*")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Wish can not be empty"),
  body("wishes")
    .isArray({ min: MIN_WISHES_NUMBER, max: MAX_WISHES_NUMBER })
    .withMessage(
      `User can have ${MIN_WISHES_NUMBER} to ${MAX_WISHES_NUMBER} wishes`
    ),
];
