import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { FaissStore } from 'langchain/vectorstores/faiss';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { loadQAStuffChain } from 'langchain/chains';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// In-memory storage for summaries
const summaries = new Map();

export async function summarizePDF(fileBuffer, fileName) {
    try {
        // Load PDF
        const loader = new PDFLoader(new Blob([fileBuffer]));
        const docs = await loader.load();

        // Split text into chunks
        const textSplitter = new CharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const chunks = await textSplitter.splitDocuments(docs);

        // Create vector store
        const embeddings = new OpenAIEmbeddings();
        const vectorStore = await FaissStore.fromDocuments(chunks, embeddings);

        // Generate summary
        const llm = new ChatOpenAI({ 
            modelName: "gpt-3.5-turbo",
            temperature: 0.1
        });
        const chain = loadQAStuffChain(llm);
        
        const query = "Summarize the content of this PDF in 3-5 sentences, capturing the main ideas and key points. Use clear and concise language.";
        const relevantDocs = await vectorStore.similaritySearch(query);
        const { text: summary } = await chain.call({
            input_documents: relevantDocs,
            question: query,
        });

        // Store summary
        summaries.set(fileName, summary);

        // Log for dev purposes
        console.log(`Summary for ${fileName}:`, summary);

        return summary;
    } catch (error) {
        console.error('Error summarizing PDF:', error);
        throw error;
    }
}

export function getAllSummaries() {
    return Object.fromEntries(summaries);
}
