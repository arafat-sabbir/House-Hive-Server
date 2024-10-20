// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { wishlistControllers } from './wishlist.controller';
import validateRequest from '../../middlewares/validateRequest';
import { wishlistValidation } from './wishlist.validation';


// Initialize router
const router = Router();

router.post("/create-wishlist",validateRequest(wishlistValidation.createWishlistSchema), wishlistControllers.createWishlist);

const wishlistRoutes = router;
export default wishlistRoutes;