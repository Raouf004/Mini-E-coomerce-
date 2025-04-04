import express from 'express';
import db from '../db'; // Import your database connection

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM products WHERE id_product = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  const { name, price, description } = req.body;  // Adjust based on the fields you need

  try {
    const result = await db.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *", 
      [name, price, description]
    );
    
    res.status(201).json(result.rows[0]);  // Return the newly created product
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

export default router;
