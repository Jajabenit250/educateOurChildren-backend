import express from 'express';
import passport from 'passport';
import userController from '../controllers/users';
import Validate from '../helpers/validate';
import isEmailUsed from '../middlewares/auth';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import '../config/passport.config';

const router = express.Router();

router.post('/signin', Validate.signin(), isValid, userController.signIn);
router.post('/signup', Validate.signup(), isValid, isEmailUsed, userController.signup);
router.patch('/logout', verifyToken.headerToken, userController.logout);

export default router;
