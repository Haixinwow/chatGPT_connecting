import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';  // Import dotenv
dotenv.config();  // Load environment variables

const app = express();
const port = 5000;

app.use(express.json());  // Parse incoming JSON requests

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use the API key from environment variables
});

app.post('/generate', async (req, res) => {
  try {
    const { question } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-4',  // Ensure you're using the correct model
      messages: [{ role: 'user', content: question }],
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
