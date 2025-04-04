import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// In-memory storage for summaries
const summaries = new Map();

export async function summarizePDF(fileBuffer, fileName) {
    try {
        // 1. Extract text from PDF
        const loader = new PDFLoader(new Blob([fileBuffer]));
        const docs = await loader.load();
        const fullText = docs.map(doc => doc.pageContent).join('\n\n');

        // 2. Clean and prepare text for summarization
        const cleanText = fullText
            .replace(/\n/g, ' ') // Remove line breaks
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .substring(0, 10000); // Limit to first 10k chars

        // 3. Get summary from OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a helpful assistant that summarizes documents concisely."
            }, {
                role: "user",
                content: `Summarize this document in 3-5 sentences:\n\n${cleanText}`
            }],
            temperature: 0.3
        });

        const summary = response.choices[0].message.content;
        
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
