import "reflect-metadata";

import DatabaseConfig from "./databaseConfig";
import { plainToClass } from "class-transformer";
import { injectable } from "inversify";
import * as dotenv from "dotenv";
import ServerConfig from "./serverConfig";
import MinioConfig from "./minioConfig";
import ApiKeyConfig from "./api_key_config";

@injectable()
class Config {
  databaseConfig: DatabaseConfig;
  serverConfig: ServerConfig;
  minioConfig: MinioConfig;
  apiKeyConfig: ApiKeyConfig;

  constructor() {
    const processEnv: { [key: string]: any } = {};
    dotenv.config({ processEnv });

    this.databaseConfig = plainToClass(DatabaseConfig, processEnv);
    this.serverConfig = plainToClass(ServerConfig, processEnv);
    this.minioConfig = plainToClass(MinioConfig, processEnv);
    this.apiKeyConfig = plainToClass(ApiKeyConfig, processEnv);
  }
}

export default Config;
