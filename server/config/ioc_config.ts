import "reflect-metadata";

import { Container } from "inversify";
import Config from "./config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import RestaurantRepository from "../repositories/restaurantRepository";
import RestaurantService from "../services/restaurantService";

let container = new Container();

container.bind<Config>(SERVICE_IDENTIFIER.CONFIG).to(Config).inSingletonScope();
container.bind<MySQLConnection>(SERVICE_IDENTIFIER.MYSQL_CONNECTION).to(MySQLConnection).inSingletonScope();
container.bind<RestaurantRepository>(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY).to(RestaurantRepository).inSingletonScope();
container.bind<RestaurantService>(SERVICE_IDENTIFIER.RESTAURANT_SERVICE).to(RestaurantService).inSingletonScope();

export default container;