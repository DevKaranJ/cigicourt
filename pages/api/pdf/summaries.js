import { getAllSummaries } from '../../../utils/pdfSummarizer';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const summaries = getAllSummaries();
        return res.status(200).json({ summaries });
    } catch (error) {
        console.error('Error getting summaries:', error);
        return res.status(500).json({ error: 'Failed to get summaries' });
    }
}
