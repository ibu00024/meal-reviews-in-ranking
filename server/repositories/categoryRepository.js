
const db = require('../configs/db'); // ✅ DB接続を読み込む

// カテゴリ一覧を取得
exports.getAllCategories = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM Category'); // `categories` テーブルからデータを取得
        return rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
