const SERVICE_IDENTIFIER = {
    CONFIG: Symbol.for("Config"),
    MYSQL_CONNECTION: Symbol.for("MySQLConnection"),
    RESTAURANT_REPOSITORY: Symbol.for("RestaurantRepository"),
};

export default SERVICE_IDENTIFIER;