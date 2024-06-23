import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";


const router = Router();

const allRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },

];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
