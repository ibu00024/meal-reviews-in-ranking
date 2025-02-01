const categoryRepository = require('../repositories/categoryRepository');  // ✅ リポジトリを読み込む

exports.getAllCategories = async () => {
    return categoryRepository.getAllCategories();
};
