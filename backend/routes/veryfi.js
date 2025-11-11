// backend for receipts API
import { Router } from 'express';
import multer from 'multer'; // For file uploads
import Veryfi from '@veryfi/veryfi-sdk';
import fs from 'fs';
import path from 'path';

const router = Router();

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Veryfi client using env variables
const veryfiClient = new Veryfi(
  process.env.VERYFI_CLIENT_ID,
  process.env.VERYFI_CLIENT_SECRET,
  process.env.VERYFI_USERNAME,
  process.env.VERYFI_API_KEY
);

// POST receipts (upload)
router.post('/upload', upload.single('receipt'), async (req, res) => {
	console.log("Upload route hit");
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Save buffer to temporary file
    const tempDir = path.join('./temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const tempPath = path.join(tempDir, req.file.originalname);
    fs.writeFileSync(tempPath, req.file.buffer);

    // Process file with Veryfi
    const response = await veryfiClient.process_document(tempPath, []);

    // Clean up temporary file
    fs.unlinkSync(tempPath);

    // Send parsed data back to frontend
    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Veryfi upload error:', error);
    res.status(500).json({ error: 'Failed to process receipt' });
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
