import express from 'express';
import pool from './pool.js'; 

const app = express();
const port = 3000;

app.get('/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users LIMIT 1');
    res.json({
      message: 'Database connection successful!',
      sampleUser: rows
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
