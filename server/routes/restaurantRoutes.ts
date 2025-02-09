import express from "express";
import container from "../config/ioc_config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantController from "../controllers/restaurantController";

const restaurantRouter = express.Router();
const restaurantController = container.get<RestaurantController>(
  SERVICE_IDENTIFIER.RESTAURANT_CONTROLLER,
);

restaurantRouter.get("/", restaurantController.getAllRestaurants);
restaurantRouter.get("/search", restaurantController.searchRestaurant);

export default restaurantRouter;
