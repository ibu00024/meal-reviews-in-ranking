import "reflect-metadata";

import {DataSource} from "typeorm";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import {inject, injectable} from "inversify";
import Config from "../config/config";

@injectable()
class MySQLConnection {
    private connection: DataSource;

    constructor(
        @inject(SERVICE_IDENTIFIER.CONFIG) private config: Config
    ) {
        this.connection = new DataSource({
            type: "mysql",
            host: this.config.databaseConfig.MYSQL_HOST,
            port: this.config.databaseConfig.MYSQL_PORT,
            username: this.config.databaseConfig.MYSQL_USERNAME,
            password: this.config.databaseConfig.MYSQL_PASSWORD,
            database: this.config.databaseConfig.MYSQL_DATABASE,
            entities: ["models/*.ts"],
            synchronize: false,
        });
        this.connection.initialize().then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.log("Data Source has not been initialized!");
            throw err;
        });
    }

    public getConnection: () => DataSource = () => {
        return this.connection;
    }
}

export default MySQLConnection;