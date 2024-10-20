// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { offerControllers } from './offer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { offerValidation } from './offer.validation';


// Initialize router
const router = Router();

router.post("/create-offer",validateRequest(offerValidation.createOfferSchema), offerControllers.createOffer);

const offerRoutes = router;
export default offerRoutes;