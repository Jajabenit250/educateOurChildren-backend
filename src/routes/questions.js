import express from 'express';
import userController from '../controllers/users';
import Validate from '../helpers/validate';
import isEmailUsed from '../middlewares/auth';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import '../config/passport.config';

const router = express.Router();

router.post('/addQuestions', );
router.get('/Questions', );
router.post('/Question/:id', );
export default router;
