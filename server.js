import 'dotenv/config';
import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument } from "pdf-lib";
import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Fix for __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ensure `caseData` folder exists
const caseDataFolder = path.join(__dirname, "caseData");
if (!fs.existsSync(caseDataFolder)) {
  fs.mkdirSync(caseDataFolder, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, caseDataFolder); // Save files in `caseData`
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ 
      success: true,
      filePath: `/caseData/${req.file.filename}`,
      originalName: req.file.originalname
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      success: false,
      message: "File upload failed"
    });
  }
});

// Initialize LangChain model
const model = new OpenAI({
  temperature: 0.7,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY
});

// PDF Processing endpoint
app.post("/process-pdf", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Read and parse PDF using pdf-lib
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pages = pdfDoc.getPages();
    let pdfText = '';
    
    for (const page of pages) {
      const text = await page.getTextContent();
      pdfText += text.items.map(item => item.str).join(' ');
    }
    
    if (!pdfText || pdfText.trim().length === 0) {
      throw new Error('PDF appears to be empty or unreadable');
    }

    // Split text into chunks for summarization
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 4000,
      chunkOverlap: 200
    });
    const docs = await textSplitter.createDocuments([pdfText]);

    // Generate summary
    const chain = loadSummarizationChain(model, { type: "map_reduce" });
    const summary = await chain.call({ input_documents: docs });

    res.json({
      filePath: `/caseData/${req.file.filename}`,
      extractedText: pdfText,
      summary: summary.text
    });
  } catch (error) {
    console.error("PDF processing error:", error);
    res.status(500).json({ message: "Error processing PDF" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
