import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create',
  validateRequest(userValidation.createUserValidationSchema),
  userController.create
);

router.get("/getUsers", userController.getAll);
router.get('/getUser', userController.getSingle);



export const userRoutes = router;
