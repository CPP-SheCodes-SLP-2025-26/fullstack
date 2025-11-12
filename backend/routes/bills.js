// backend for receipts API
// routes/bills.js
import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import veryfiClient from '../functions/veryfi.js'; // <- import client
import Finances from "../functions/finance_functions.js"

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const tempDir = path.join('./temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const tempPath = path.join(tempDir, req.file.originalname);
    fs.writeFileSync(tempPath, req.file.buffer);

    const response = await veryfiClient.process_document(tempPath, []);

    fs.unlinkSync(tempPath);

    const billData = {
      id: Date.now(),
      vendor: response.vendor || "Unknown",
      date: response.date || new Date().toISOString().split('T')[0],
      total: response.total || 0,
      thumbnailUrl: req.file ? `/temp/${req.file.originalname}` : null,
    };

    res.json(billData);
  } catch (error) {
    console.error('Veryfi upload error:', error);
    res.status(500).json({ error: 'Failed to process receipt' });
  }
});

router.post("/db/upload", async (req, res) => {
  try {
    const { room_num, name, total } = req.body;

    if (!room_num || !name || total == null) 
      return res.status(400).json({ error: "Missing required fields" });

    const result = await Finances.addReceipt(room_num, name, total);

    if (!result.ok) 
      return res.status(500).json({ error: "Failed to save receipt" });

    res.status(201).json({message: "Receipt saved successfully",id: result.id,});

  } catch (err) {
    console.error("Error in /api/finances/upload:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;



/**
 * How it works:
 * - We use multer to accept file uploads from the frontend.
 * - The uploaded file is saved temporarily on disk, and its path is sent to Veryfi for processing.
 * - The Veryfi client uses API credentials stored in the .env file for authentication:
 *   - VERYFI_CLIENT_ID
 *   - VERYFI_CLIENT_SECRET
 *   - VERYFI_USERNAME
 *   - VERYFI_API_KEY
 * - When a POST request is sent to '/api/receipts/upload' with a file named 'receipt', 
 *   the server sends it to Veryfi for processing and returns the parsed data.
 * 
 * Notes:
 * - In your backend run "npm install express multer @veryfi/veryfi-sdk" to add needed dependencies
 * - No additional login is needed; the API keys handle authentication.
 * - Categories array is optional; currently empty since we don't have categories set up yet.
 * - Make sure the .env file has correct Veryfi credentials before testing.
 */
