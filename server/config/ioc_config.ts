import "reflect-metadata";

import { Container } from "inversify";
import Config from "./config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";

let container = new Container();

container.bind<Config>(SERVICE_IDENTIFIER.CONFIG).to(Config).inSingletonScope();
container.bind<MySQLConnection>(SERVICE_IDENTIFIER.MYSQL_CONNECTION).to(MySQLConnection).inSingletonScope();

export default container;