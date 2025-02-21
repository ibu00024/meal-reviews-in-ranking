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
    this.searchRestaurant = this.searchRestaurant.bind(this);
    this.getRestaurantById = this.getRestaurantById.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
  }

  public async getAllRestaurants(req: Request, res: Response) {
    try {
      const restaurants =
        await this.restaurantService.getAllRestaurantByRanking();
      res.status(200).json({ success: true, data: restaurants });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }

  public async getRestaurantById(req: Request, res: Response) {
    try {
      const restaurantId = req.params.id as unknown as number;
      const restaurants =
        await this.restaurantService.getRestaurantById(restaurantId);
      res.status(200).json({ success: true, data: restaurants });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }

  public async searchRestaurant(req: Request, res: Response) {
    try {
      const name = req.query.name as string;
      if (!name) {
        res.status(400).json({
          success: false,
          message: "Bad Request",
          error: "Name is required in query params",
        });
      }
      const searchResult = await this.restaurantService.searchRestaurant(name);
      res.status(200).json({ success: true, data: searchResult });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }

  public async addRestaurant(req: Request, res: Response) {
    try {
      const restaurant = req.body;
      const newRestaurant =
        await this.restaurantService.addRestaurant(restaurant);
      res.status(200).json({ success: true, data: newRestaurant });
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
