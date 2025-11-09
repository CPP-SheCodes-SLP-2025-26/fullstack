import { Router } from "express"; // so we can split up the different routes into sections
import Chore from "../functions/chore_functions.js"

const router = Router(); // groups together requests

// POST a new chore
router.post('/chores', async (req, res) => {
  const { user_id, chore_name, due_date, room_num, description} = req.body;

  if(!user_id || !chore_name || !due_date || !room_num|| !description) // make sure all values are given
    return res.status(400).json({ error: "Missing value" });

  const chore_id = await Chore.createChore(user_id, chore_name, due_date, room_num, description);
  if(!chore_id) return res.status(406).json({ errror: "Unable to create chore"});
  res.status(201).json({ msg: "successfully created chore"})
});

// GET all chores
router.get('/chores', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get chores' });
  }
});

// PUT a chore by ID (updating)
router.put('/chores/:id', async (req, res) => {
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
router.delete('/chores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM chores WHERE id = ?', [id]);
    res.json({ message: 'Chore deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete chore' });
  }
});

export default router;