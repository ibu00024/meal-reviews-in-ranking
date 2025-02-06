import container from "./config/ioc_config";
import SERVICE_IDENTIFIER from "./constants/identifiers";
import Config from "./config/config";
import MySQLConnection from "./utils/mySQLConnection";

let connection = container.get<MySQLConnection>(SERVICE_IDENTIFIER.MYSQL_CONNECTION)