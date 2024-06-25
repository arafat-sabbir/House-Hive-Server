import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { reviewRoute } from "../modules/review/review.route";
import { propertyRoute } from "../modules/property/property.route";
import { offerRoute } from "../modules/offer/offer.route";


const router = Router();

const allRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/review',
    route: reviewRoute,
  },
  {
    path: '/property',
    route: propertyRoute,
  },
  {
    path: '/offer',
    route: offerRoute,
  },

];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
