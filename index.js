const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config(); // For environment variables (to store your API key securely)

// Initialize express app
const app = express();

// Use environment variables for sensitive information
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Assuming you have a .env file with OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Handle user input from the search bar (POST request)
app.post('/ask', async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: 'Query cannot be empty' });
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: query, // Use the user input as the prompt
      max_tokens: 150, // Adjust max tokens based on your needs
    });

    res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong with the API call.' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
