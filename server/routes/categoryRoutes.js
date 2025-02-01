const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// カテゴリ一覧を取得するルート
router.get('/', categoryController.getAllCategories);

// // 新しいカテゴリを追加するルート
// router.post('/', categoryController.addCategory);

module.exports = router;