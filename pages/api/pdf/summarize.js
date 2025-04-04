import { summarizePDF } from '../../../utils/pdfSummarizer';
import multer from 'multer';

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
    api: {
        bodyParser: false,
    },
};

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Handle file upload
        upload.single('file')(req, {}, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const summary = await summarizePDF(req.file.buffer, req.file.originalname);
            return res.status(200).json({ summary });
        });
    } catch (error) {
        console.error('Error in summarize API:', error);
        return res.status(500).json({ error: 'Failed to summarize PDF' });
    }
}

export default handler;
