import { Transform } from "class-transformer";

class ServerConfig {
  PORT: number | undefined;

  @Transform(({ value }) => value === "true")
  DEBUG: boolean = true;

  SEARCH_LIMIT: number = 10;

  GOOGLE_MAPS_API_KEY: string = "";
}

export default ServerConfig;
