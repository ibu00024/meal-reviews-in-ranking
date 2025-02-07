import "reflect-metadata";

import DatabaseConfig from "./databaseConfig";
import { plainToClass } from "class-transformer";
import { injectable } from "inversify";
import * as dotenv from "dotenv";
import ServerConfig from "./serverConfig";
import MinioConfig from "./minioConfig";

@injectable()
class Config {
  databaseConfig: DatabaseConfig;
  serverConfig: ServerConfig;
  minioConfig: MinioConfig;

  constructor() {
    const processEnv: { [key: string]: any } = {};
    dotenv.config({ processEnv });

    this.databaseConfig = plainToClass(DatabaseConfig, processEnv);
    this.serverConfig = plainToClass(ServerConfig, processEnv);
    this.minioConfig = plainToClass(MinioConfig, processEnv);
  }
}

export default Config;
