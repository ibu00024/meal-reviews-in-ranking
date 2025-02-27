import { Transform } from "class-transformer";

class ServerConfig {
  PORT: number | undefined;

  @Transform(({ value }) => value === "true")
  DEBUG: boolean = true;

  SEARCH_LIMIT: number = 10;

  PAGE_SIZE: number = 20;
}

export default ServerConfig;
