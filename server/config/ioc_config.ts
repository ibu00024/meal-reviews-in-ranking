import "reflect-metadata";

import { Container } from "inversify";
import Config from "./config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import RestaurantRepository from "../repositories/restaurantRepository";

let container = new Container();

container.bind<Config>(SERVICE_IDENTIFIER.CONFIG).to(Config).inSingletonScope();
container.bind<MySQLConnection>(SERVICE_IDENTIFIER.MYSQL_CONNECTION).to(MySQLConnection).inSingletonScope();
container.bind<RestaurantRepository>(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY).to(RestaurantRepository).inSingletonScope();

export default container;