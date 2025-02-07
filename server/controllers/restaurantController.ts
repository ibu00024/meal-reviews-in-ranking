import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers.js";
import RestaurantService from "../services/restaurantService.js";
import { Request, Response } from "express";

@injectable()
class RestaurantController {
  private restaurantService: RestaurantService;

  constructor(
    @inject(SERVICE_IDENTIFIER.RESTAURANT_SERVICE)
    restaurantService: RestaurantService,
  ) {
    this.restaurantService = restaurantService;

    this.getAllRestaurants = this.getAllRestaurants.bind(this);
  }

  public async getAllRestaurants(req: Request, res: Response) {
    try {
      const restaurants = await this.restaurantService.getAllRestaurants();
      res.status(200).json({ success: true, data: restaurants });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }
}

export default RestaurantController;
