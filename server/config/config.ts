import "reflect-metadata";

import DatabaseConfig from "./database_config";
import { plainToClass } from "class-transformer";
import { injectable } from "inversify";
import * as dotenv from "dotenv";
import ServerConfig from "./server_config";

@injectable()
class Config {
  databaseConfig: DatabaseConfig;
  serverConfig: ServerConfig;

  constructor() {
    const processEnv: { [key: string]: any } = {};
    dotenv.config({ processEnv });

    this.databaseConfig = plainToClass(DatabaseConfig, processEnv);
    this.serverConfig = plainToClass(ServerConfig, processEnv);
  }
}

export default Config;
