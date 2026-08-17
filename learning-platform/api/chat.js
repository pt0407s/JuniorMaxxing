// Vercel serverless function — proxies chat completions to HackClub AI
// Avoids CORS issues since the browser can't call ai.hackclub.com directly
// API key is stored as a Vercel environment variable (HACKCLUB_API_KEY)

const AI_API_URL = 'https://ai.hackclub.com/proxy/v1/chat/completions';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.HACKCLUB_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'API key not configured' });
    return;
  }

  try {
    const { messages, model } = req.body;

    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'anthropic/claude-sonnet-5',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('AI proxy error:', err);
    res.status(500).json({ error: 'AI service unavailable' });
  }
}
