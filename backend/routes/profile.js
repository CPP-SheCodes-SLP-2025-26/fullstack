import { Router } from "express"; // so we can split up the different routes into sections
import Profile from "../functions/profile_fucntions.js"

const router = Router(); // groups together requests

router.post('/profile', async (req, res) => {
  const { name, email, password, room_num } = req.body;

  if (!name || !email || !password || !room_num) return res.status(400).json({ error: "Missing value" });

  // Create the profile
  const result = await Profile.createProfile(name, email, password, room_num);

  if (!result.ok) return res.status(406).json({ errors: result.errors });
  res.status(201).json({ msg: "Successfully created profile" });
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  const result = await Profile.getProfileById(id);
  if (!result.ok) return res.status(404).json({ error: result.error });

  res.status(200).json(result.profile);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });

  const result = await Profile.isValidLogin(username, password);

  if (!result.ok) return res.status(401).json({ error: result.error });

  res.status(200).json({message: 'Login successful'});
});


export default router;