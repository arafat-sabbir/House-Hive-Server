import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { reviewRoute } from "../modules/review/review.route";


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

];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
