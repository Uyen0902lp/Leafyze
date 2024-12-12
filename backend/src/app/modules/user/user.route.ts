import express from 'express';
import { UsersController } from './user.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post('/register',UsersController.userRegister);
router.post('/login',UsersController.userLogin);
router.patch('/update-profile/:id', auth(), UsersController.updateUser);
router.post('/change-password',auth(),UsersController.changePassword);
router.get('/show-all', auth(), UsersController.showAllUsers);

export const UserRoutes = router; 