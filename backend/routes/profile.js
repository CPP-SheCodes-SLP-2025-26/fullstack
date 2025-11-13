import { Router } from "express"; // so we can split up the different routes into sections
import Profile from "../functions/profile_functions.js"

const router = Router(); // groups together requests

// register a user
router.post('/register', async (req, res) => {
  const { name, email, password, room_num } = req.body;

  if (!name || !email || !password || !room_num) return res.status(400).json({ error: "Missing value" });

  // Create the profile
  const result = await Profile.createProfile(name, email, password, room_num);

  if (!result.ok) return res.status(406).json({ errors: result.errors });
  res.status(201).json({ msg: "Successfully created profile" });
});

// select a profile
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  const result = await Profile.getProfileById(id);
  if (!result.ok) return res.status(404).json({ error: result.error });

  res.status(200).json(result.profile);
});

// login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });

  const result = await Profile.isValidLogin(username, password);

  if (!result.ok) return res.status(401).json({ error: result.error });

  res.status(200).json({message: 'Login successful'});
});

// change a users password
router.post('/change/password', async (req, res) => {
  const { userId, oldPass, newPass, confmPass } = req.body;

  if (!userId || !oldPass || !newPass || !confmPass)
    return res.status(400).json({ error: 'Missing required fields' });

  const result = await Profile.changePassword(userId, oldPass, newPass, confmPass);

  if (!result.ok) return res.status(400).json({ errors: result.errors });

  res.status(200).json({ msg: result.msg });
});

// change a users email
router.post('/change/email', async (req, res) => {
  const { userId, newEmail, confmEmail } = req.body;

  if (!userId || !newEmail || !confmEmail)
    return res.status(400).json({ error: 'Missing required fields' });

  const result = await Profile.changeEmail(userId, newEmail, confmEmail);

  if (!result.ok)
    return res.status(400).json({ errors: result.errors });

  res.status(200).json({ msg: result.msg });
});

// change a users username
router.post('/change/username', async (req, res) => {
  const { userId, newUsername, confmUsername } = req.body;

  if (!userId || !newUsername || !confmUsername)
    return res.status(400).json({ error: 'Missing required fields' });

  const result = await Profile.changeUsername(userId, newUsername, confmUsername);

  if (!result.ok)
    return res.status(400).json({ errors: result.errors });

  res.status(200).json({ msg: result.msg });
});


export default router;