const SERVICE_IDENTIFIER = {
  CONFIG: Symbol.for("Config"),
  MYSQL_CONNECTION: Symbol.for("MySQLConnection"),
  MINIO_CONNECTION: Symbol.for("MiniOConnection"),
  RESTAURANT_REPOSITORY: Symbol.for("RestaurantRepository"),
  RESTAURANT_SERVICE: Symbol.for("RestaurantService"),
  RESTAURANT_CONTROLLER: Symbol.for("RestaurantController"),
  IMAGE_CONTROLLER: Symbol.for("ImageController"),
  IMAGE_SERVICE: Symbol.for("ImageService"),
  IMAGE_REPOSITORY: Symbol.for("ImageRepository"),
  MAP_SERVICE: Symbol.for("MapService"),
  CATEGORY_CONTROLLER: Symbol.for("CategoryController"),
  CATEGORY_REPOSITORY: Symbol.for("CategoryRepository"),
};

export default SERVICE_IDENTIFIER;
