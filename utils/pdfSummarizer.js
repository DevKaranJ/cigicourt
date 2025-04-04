import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter } from 'langchain/text_splitter';

// In-memory storage for summaries
const summaries = new Map();

export async function summarizePDF(fileBuffer, fileName) {
    try {
        // Load PDF and extract text
        const loader = new PDFLoader(new Blob([fileBuffer]));
        const docs = await loader.load();
        
        // Combine all pages into single text
        const fullText = docs.map(doc => doc.pageContent).join('\n\n');
        
        // Extract first 3 paragraphs as simple summary
        const paragraphs = fullText.split('\n\n').filter(p => p.trim().length > 0);
        const summary = paragraphs.slice(0, 3).join('\n\n');
        
        // Store summary
        summaries.set(fileName, summary);
        console.log(`Summary for ${fileName}:`, summary);
        
        return summary;
    } catch (error) {
        console.error('Error summarizing PDF:', error);
        return `Failed to summarize ${fileName}. Error: ${error.message}`;
    }
}

export function getAllSummaries() {
    return Object.fromEntries(summaries);
}
