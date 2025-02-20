import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import { Category } from "../models/category";
import CategoryDTO from "../models/DTO/categoryDTO";
import { Restaurant } from "../models/restaurant";

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
    return categories.map(
      (category) => new CategoryDTO(category.category_id, category.name),
    );
  }

  public async getCategory(categoryId: number): Promise<Category | null> {
    return this.categoryRepo.findOne({
      where: [{ category_id: categoryId }],
    });
  }

  public async isCategoryExist(categoryId: number): Promise<Boolean> {
    const count = await this.categoryRepo.count({
      where: { category_id: categoryId },
    });
    return count > 0;
  }
}

export default CategoryRepository;
