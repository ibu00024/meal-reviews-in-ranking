import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import { Category } from "../models/category";

@injectable()
class CategoryRepository {
    private categoryRepo: Repository<Category>;
    
    constructor(
        @inject(SERVICE_IDENTIFIER.MYSQL_CONNECTION)
        mysqlConnection: MySQLConnection,
    ) {
        const connection = mysqlConnection.getConnection();
        this.categoryRepo = connection.getRepository(Category);
    }
    
    public async getAllCategories(): Promise<Category[]> {
        return this.categoryRepo.find();
    }
    
}

export default CategoryRepository;


