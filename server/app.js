// import modules
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


// import routes
// const testRoutes = require('./routes/TestRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
// const restaurantRoutes = require('./routes/restaurantRoutes');


// ルート登録
// app.use('/api/test', testRoutes);
app.use('/api/category', categoryRoutes);
// app.use('/api/restaurant', restaurantRoutes);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
