import {inject, injectable} from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import {DataSource} from "typeorm";
import {Restaurant} from "../models/restaurant";
import RestaurantRepository from "../repositories/restaurantRepository";

@injectable()
class RestaurantService {

    constructor(
        @inject(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY) private restaurantRepository: RestaurantRepository
    ) {}

    public async getAllRestaurants() {
        return await this.restaurantRepository.getAllRestaurants();
    }
}

export default RestaurantService;