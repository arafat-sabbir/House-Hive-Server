import express from 'express';
import { reviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(reviewValidation.createReviewValidationSchema),
  reviewController.create
);
export const reviewRoute = router;