// pages/api/ai-suggestions.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { groceryItems, userHistory } = req.body;

    try {
      // Your Google Gemini API endpoint and API Key
      const apiEndpoint = 'https://gemini.googleapis.com/v1/your-endpoint'; // Replace with the actual endpoint
      const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key

      const response = await axios.post(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        data: {
          groceryItems: groceryItems,
          userHistory: userHistory,
        },
      });

      // Get the response data and send it back to the frontend
      const aiSuggestions = response.data.suggestions;

      res.status(200).json({ suggestions: aiSuggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong with the AI request.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
