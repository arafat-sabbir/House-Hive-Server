import express from 'express';
import { propertyController } from './property.controller';
import validateRequest from '../../middlewares/validateRequest';
import { propertyValidation } from './property.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post('/add',AuthorizeRequest(USER_ROLE.agent), validateRequest(propertyValidation.addPropertySchema), propertyController.add);
export const propertyRoute = router;
