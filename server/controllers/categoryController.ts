import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers.js";   // 
import { Request, Response } from "express";
import CategoryRepository from "../repositories/categoryRepository";
import { Category } from "../models/category";
import Config from "../config/config";

@injectable()                 // シングルトンのようなもの，DIコンテナで管理する
class CategoryController {
	private categoryRepository: CategoryRepository;

  constructor(                
    // データを取得する
    @inject(SERVICE_IDENTIFIER.CATEGORY_REPOSITORY)
		categoryRepository: CategoryRepository,
  ) {
    // クラスのプロパティを設定
    this.categoryRepository = categoryRepository;

    this.getAllCategories = this.getAllCategories.bind(this);
  }

  public async getAllCategories(req: Request, res: Response) {
    try {
      const categories =
        await this.categoryRepository.getAllCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }
}

export default CategoryController;  // 他のファイルでimportできるようにする
