// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { propertyControllers } from './property.controller';
import validateRequest from '../../middlewares/validateRequest';
import { propertyValidation } from './property.validation';


// Initialize router
const router = Router();

router.post("/create-property",validateRequest(propertyValidation.createPropertySchema), propertyControllers.createProperty);

const propertyRoutes = router;
export default propertyRoutes;