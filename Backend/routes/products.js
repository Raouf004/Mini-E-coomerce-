import express from 'express';
import client from '../db.js'; // Ensure this path is correct

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

export default router; // Correct ESM export
