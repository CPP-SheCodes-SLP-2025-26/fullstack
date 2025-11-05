import pool from "./pool.js";

class Chore
{
  static async createChore(user_id, chore_name, due_date, room_num)
  {
    try {
      const [result] = await pool.query(
        'INSERT INTO chores (user_id, chore_name, due_date, room_num, is_finished) VALUES (?, ?, ?, ?, false)',
        [user_id, chore_name, due_date, room_num]);

      const chore_id = result.insertId;  // // Extract and return the id that is generated
      return chore_id;

    } catch (error) {
      console.error("Error in createChore:", error);
      return null;
    }
  }
}

export default Chore; 