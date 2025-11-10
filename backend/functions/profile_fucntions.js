import pool from './pool.js'
import bcrypt from "bcrypt";

class Profile
{
    static async createProfile(name, email, password, room_num)
    {
        try{
          const errors = await this.getErrors(name, password, email);
          console.log(errors);
          if (errors.length > 0) {
            return { ok: false, errors };
          }
          
          await pool.query("INSERT IGNORE INTO rooms (id) VALUES (?)", [room_num]);
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          await pool.query("INSERT into users (name, email, password, room_num) VALUES (?, ?, ?, ?)",
                            [name, email, hashedPassword, room_num]);

          return { ok: true };
        }
        catch (error){
          console.error("Error in createProfile:", error);
          return false;
        }
    }

    static async getProfiles()
    {
        try{
            const [rows] = await pool.query("SELECT * from users")
            return rows.length > 0 ? rows : null;
        }
        catch (error) {
            console.error("Error in getProfiles:", error);
            return null;
        }
    }

    static async getProfile(username)
    {
        try{
            const [rows] = await pool.query("SELECT * from users where name = ?", [username])
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            console.error("Error in getProfile:", error);
            return null;
        }
    }

    static async getProfileById(id) 
    {
      try {
        const [rows] = await pool.query(
          'SELECT id, profile_picture, name, email, room_num, created_at FROM users WHERE id = ?', [id]);
  
        if (rows.length === 0) return { ok: false, error: "Profile not found" };
        return { ok: true, profile: rows[0] };
        
      } catch (err) {
        console.error("Error fetching profile:", err);
        return { ok: false, error: err.message };
      }
    }

    static async getErrors(_username, _password, _email)
    {
        const returnString = []; 
        const user = await this.validateUsername(_username);
        const validEmail = this.validateEmail(_email);
        const dupEmail = await this.DuplicateEmail(_email);

        if(user)
            returnString.push("Username already exisits")
        if(validEmail)
            returnString.push("Email must be in valid format")
        if(dupEmail)
          returnString.push("Email already exisists")
        if(_password.length < 8)
            returnString.push("Passwords must be at least 8 characters")
        
        return returnString
    }

    static async validateUsername(username)
    {
        try {
            const [rows] = await pool.query("SELECT 1 FROM users WHERE name = ? LIMIT 1", [username]);
            return rows.length > 0; // true if username exists, false otherwise

        } catch (error) {
            console.error("Error in validateUsername:", error);
            return false;
        }
    }

    static validateEmail(email) {return ( email.length === 0 || !(/^\S+@\S+\.\S+$/.test(email)));}

    static async DuplicateEmail(email) 
    {
        const [rows] = await pool.query("SELECT 1 FROM users WHERE email = ? LIMIT 1", [email]);
        return (rows.length > 0);
    }

    static async findByUsername(username) 
    {
      try {
        const [rows] = await pool.query(
          'SELECT id, name, password FROM users WHERE name = ? LIMIT 1',
          [username]
        );
        return rows.length ? rows[0] : null;
      } catch (err) {
        console.error('findByUsername error:', err);
        throw err;
      }
    }
  
    static async isValidLogin(username, password) 
    {
      try {
        const user = await this.findByUsername(username);
        if (!user) return { ok: false, error: 'Invalid username or password' };
  
        const match = await bcrypt.compare(password, user.password);
        console.log(password)
        console.log(user.password)
        if (!match) return { ok: false, error: 'Invalid username or password' };

        return { ok: true};

      } catch (err) {
        console.error('Login error:', err);
        return { ok: false, error: 'Server error' };
      }
    }
}

export default Profile;