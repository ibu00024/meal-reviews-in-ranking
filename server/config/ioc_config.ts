import "reflect-metadata";

import { Container } from "inversify";
import Config from "./config.js";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import RestaurantRepository from "../repositories/restaurantRepository";
import RestaurantService from "../services/restaurantService";
import RestaurantController from "../controllers/restaurantController";
import MinioConnection from "../utils/minioConnection";

let container = new Container();

container.bind<Config>(SERVICE_IDENTIFIER.CONFIG).to(Config).inSingletonScope();
container
  .bind<MySQLConnection>(SERVICE_IDENTIFIER.MYSQL_CONNECTION)
  .to(MySQLConnection)
  .inSingletonScope();
container
    .bind<MinioConnection>(SERVICE_IDENTIFIER.MINIO_CONNECTION)
    .to(MinioConnection)
    .inSingletonScope();
container
  .bind<RestaurantRepository>(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY)
  .to(RestaurantRepository)
  .inSingletonScope();
container
  .bind<RestaurantService>(SERVICE_IDENTIFIER.RESTAURANT_SERVICE)
  .to(RestaurantService)
  .inSingletonScope();
container
  .bind<RestaurantController>(SERVICE_IDENTIFIER.RESTAURANT_CONTROLLER)
  .to(RestaurantController)
  .inSingletonScope();

export default container;
