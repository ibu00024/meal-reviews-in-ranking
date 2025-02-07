import { Transform } from "class-transformer";

class ServerConfig {
  PORT: number | undefined;

  @Transform(({ value }) => value === "true")
  DEBUG: boolean = true;
}

export default ServerConfig;
