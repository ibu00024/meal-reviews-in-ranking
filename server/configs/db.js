
const mysql = require('mysql2');

// 環境変数を使って MySQL に接続
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'P@ssw0rd',
    database: process.env.DB_NAME || 'MealReview',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 接続確認
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL 接続エラー:', err.message);
    } else {
        console.log('✅ MySQL に接続成功');
        connection.release();
    }
});

module.exports = pool.promise();
