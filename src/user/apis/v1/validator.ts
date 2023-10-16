import { body } from "express-validator";

export const userValidationLoginRules = () => {
  return [
    body("email").isEmail().isLength({ max: 30 }),
    body("password").isLength({ max: 24 }),
  ];
};

export const userValidationRegisterRules = () => {
  return [
    body("name").isString().notEmpty(),
    body("email").isEmail().notEmpty(),
    body("password").isLength({ max: 24 }).notEmpty(),
    body("isAdmin").isBoolean().optional(),
  ];
};
