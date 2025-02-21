class CategoryDTO {
  categoryID: number | undefined;
  categoryName: string | undefined;

  constructor(
    categoryID: number | undefined,
    categoryName: string | undefined,
  ) {
    this.categoryID = categoryID;
    this.categoryName = categoryName;
  }
}

export default CategoryDTO;
