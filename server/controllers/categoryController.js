const categoryService = require('../services/categoryService');

// カテゴリ一覧を取得するコントローラー
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};