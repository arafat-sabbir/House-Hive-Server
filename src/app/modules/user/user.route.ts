// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';


// Initialize router
const router = Router();

router.post("/create-user",validateRequest(userValidation.createUserSchema), userControllers.createUser);

const userRoutes = router;
export default userRoutes;