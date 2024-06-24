import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { USER_ROLE } from './user.const';

const router = express.Router();
router.post(
  '/create',
  validateRequest(userValidation.createUserValidationSchema),
  userController.create
);

router.get('/getUsers', AuthorizeRequest(USER_ROLE.admin), userController.getAll);
router.get('/getUser', userController.getSingle);
router.put('/accessToken', userController.getAccessToken);

export const userRoutes = router;
