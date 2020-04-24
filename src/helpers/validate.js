import { check } from 'express-validator';

class Validate {
  static signup() {
    return [
      check('firstName', 'First name should be valid.').isString(),
      check('lastName', 'Last name should be valid.').isString(),
      check('email', 'Invalid email address, example: example@gmail.com.').isEmail(),
      check('password', 'Password should be provided and must be alphanumeric with atleast 8 charactors.').isLength({ min: 8 })
    ];
  }

  static signin() {
    return [
      // username must be an email
      check('email', 'Invalid email address, example: example@gmail.com.').isEmail(),
      // password must be at least 5 chars long
      check('password', 'Invalid password, your password should be alphanumeric with atleast 8 charactors.').isLength({ min: 8 })
    ];
  }
}

export default Validate;
