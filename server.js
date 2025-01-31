import express from 'express';
import { OpenAI } from 'openai';

const app = express();
const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static('public')); // Serve static files (like index.html)

app.post('/generate', async (req, res) => {
  try {
      const { message } = req.body;  // Ensure you're extracting data correctly

      const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: message }],
      });

      res.json(response); // Send back OpenAI response
  } catch (error) {
      console.error("Error in /generate:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
