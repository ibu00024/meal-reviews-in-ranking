import "reflect-metadata";

import { DataSource } from "typeorm";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { inject, injectable } from "inversify";
import Config from "../config/config";

@injectable()
class MySQLConnection {
  private connection: DataSource;

  constructor(@inject(SERVICE_IDENTIFIER.CONFIG) config: Config) {
    this.connection = new DataSource({
      type: "mysql",
      host: config.databaseConfig.MYSQL_HOST ?? "localhost",
      port: config.databaseConfig.MYSQL_PORT ?? 3306,
      username: config.databaseConfig.MYSQL_USERNAME ?? "root",
      password: config.databaseConfig.MYSQL_PASSWORD ?? "P@ssw0rd",
      database: config.databaseConfig.MYSQL_DATABASE ?? "MealReview",
      entities: ["models/*.ts"],
      synchronize: false,
    });
    this.connection
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.log("Data Source has not been initialized!");
        throw err;
      });
  }

  public getConnection: () => DataSource = () => {
    return this.connection;
  };
}

export default MySQLConnection;
