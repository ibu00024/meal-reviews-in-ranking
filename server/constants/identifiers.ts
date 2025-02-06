const SERVICE_IDENTIFIER = {
    CONFIG: Symbol.for("Config"),
    MYSQL_CONNECTION: Symbol.for("MySQLConnection"),
    RESTAURANT_REPOSITORY: Symbol.for("RestaurantRepository"),
    RESTAURANT_SERVICE: Symbol.for("RestaurantService"),
};

export default SERVICE_IDENTIFIER;