import pool from './pool.js'
import bcrypt from "bcrypt";

class Profile
{
    static async createProfile(name, email, password, room_num)
    {
        try{
          // check for errors before inserting
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          await pool.query("INSERT into users (name, email, password, room_num) VALUES (?, ?, ?, ?)",
                            [name, email, hashedPassword, room_num]);
          return true;
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

    static async getErrors(_username, _password, _email)
    {
        const returnString = []; 
        const user = await this.validateUsername(_username);
        const zip = this.validateemail(_email);

        if(user)
            returnString.push("Username already exisits")
        if(!zip)
            returnString.push("Email must be in valid format")
        if(_password.length >= 8)
            returnString.push("Passwords must be at least 8 characters")
        
        return returnString
    }

    /* Checks if an input username exists in the database. */
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

    static validateEmail(email) {return (email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));}
}

export default Profile;