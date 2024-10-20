// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { reviewControllers } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';


// Initialize router
const router = Router();

router.post("/create-review",validateRequest(reviewValidation.createReviewSchema), reviewControllers.createReview);

const reviewRoutes = router;
export default reviewRoutes;