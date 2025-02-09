import "reflect-metadata";

import { Container } from "inversify";
import Config from "./config.js";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import RestaurantRepository from "../repositories/restaurantRepository";
import RestaurantService from "../services/restaurantService";
import RestaurantController from "../controllers/restaurantController";
import MinioConnection from "../utils/minioConnection";
import ImageController from "../controllers/imageController";
import ImageRepository from "../repositories/imageRepository";
import ImageService from "../services/imageService";

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
container
  .bind<ImageController>(SERVICE_IDENTIFIER.IMAGE_CONTROLLER)
  .to(ImageController)
  .inSingletonScope();
container
  .bind<ImageService>(SERVICE_IDENTIFIER.IMAGE_SERVICE)
  .to(ImageService)
  .inSingletonScope();
container
  .bind<ImageRepository>(SERVICE_IDENTIFIER.IMAGE_REPOSITORY)
  .to(ImageRepository)
  .inSingletonScope();
export default container;
