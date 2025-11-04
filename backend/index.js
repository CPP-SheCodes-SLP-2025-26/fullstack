import express from 'express';
import pool from './pool.js'; 


const app = express();
app.use(express.json()); // To parse JSON request bodies
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

//------------------CHORES TABLE---------------

// GET all chores
app.get('/chores', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get chores' });
  }
});

// POST a new chore
app.post('/chores', async (req, res) => {
  const { title, description, assigned_to, due_date } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO chores (title, description, assigned_to, due_date) VALUES (?, ?, ?, ?)',
      [title, description, assigned_to, due_date]
    );
    res.json({ message: 'Chore added!', choreId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add chore' });
  }
});

// PUT a chore by ID (updating)
app.put('/chores/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, due_date, status } = req.body;

  try {
    await pool.query(
      'UPDATE chores SET title = ?, description = ?, assigned_to = ?, due_date = ?, status = ? WHERE id = ?',
      [title, description, assigned_to, due_date, status, id]
    );
    res.json({ message: 'Chore updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update chore' });
  }
});

// DELETE a chore by ID
app.delete('/chores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM chores WHERE id = ?', [id]);
    res.json({ message: 'Chore deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete chore' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
