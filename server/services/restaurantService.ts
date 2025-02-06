import {inject, injectable} from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import {DataSource} from "typeorm";
import {Restaurant} from "../models/restaurant";
import RestaurantRepository from "../repositories/restaurantRepository";

@injectable()
class RestaurantService {
    private restaurantRepository: RestaurantRepository;

    constructor(
        @inject(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY) restaurantRepository: RestaurantRepository
    ) {
        this.restaurantRepository = restaurantRepository;
    }

    public async getAllRestaurants() {
        return await this.restaurantRepository.getAllRestaurants();
    }
}

export default RestaurantService;