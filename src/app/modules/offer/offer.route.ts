import express from 'express';
import { propertyController } from '../property/property.controller';
import validateRequest from '../../middlewares/validateRequest';
import { propertyValidation } from '../property/property.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post(
  '/add',
  AuthorizeRequest(USER_ROLE.user),
  validateRequest(propertyValidation.addPropertySchema),
  propertyController.add
);
export const offerRoute = router;
