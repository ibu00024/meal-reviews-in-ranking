import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import { Category } from "../models/category";
import CategoryDTO from "../models/DTO/categoryDTO";

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
    
    public async getAllCategories(): Promise<CategoryDTO[]> {
        const categories = await this.categoryRepo.find();
        return categories.map(category => new CategoryDTO(category.category_id, category.name));
    }
    
}

export default CategoryRepository;


