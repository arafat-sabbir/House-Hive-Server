import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthorizeRequest from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import { offerController } from './offer.controller';
import { offerValidation } from './offer.validation';

const router = express.Router();

router.post(
  '/add',
  AuthorizeRequest(USER_ROLE.user),
  validateRequest(offerValidation.addOfferSchema),
  offerController.add
);
export const offerRoute = router;
