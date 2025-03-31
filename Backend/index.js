import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.js'; // Ensure the file extension is included

const app = express();

dotenv.config(); // Load environment variables

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
