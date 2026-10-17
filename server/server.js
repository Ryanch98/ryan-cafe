import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '32kb' }));

const apiKey = process.env.GROQ_API_KEY;
const client = apiKey
  ? new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  : null;

const SYSTEM_PROMPT = `
You are Modern Cafe AI, a coffee expert.

You are an expert in:
- Coffee beans
- Brewing
- Espresso
- Latte
- Cappuccino
- Turkish coffee
- Coffee roasting
- Flavor notes
- Coffee equipment
- Coffee science

Always answer professionally.
If the user asks unrelated questions, politely say you only answer coffee-related questions.
`;

const PORT = process.env.PORT || 3001;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

if (!apiKey) {
  console.warn('WARNING: GROQ_API_KEY is not set. The coffee assistant will use fallback replies.');
}

function getFallbackReply(message) {
  const text = (message || '').toLowerCase();

  if (text.includes('latte') || text.includes('espresso') || text.includes('cappuccino')) {
    return 'I can help with coffee guidance. The AI service is temporarily unavailable, but a latte is espresso with steamed milk, while a cappuccino uses equal parts espresso, steamed milk, and foam.';
  }

  if (text.includes('beans') || text.includes('roast')) {
    return 'I can help with coffee guidance. The AI service is temporarily unavailable right now, but coffee beans vary by origin, roast level, and flavor notes such as chocolate, citrus, or caramel.';
  }

  return 'I can help with coffee-related questions. The AI service is temporarily unavailable right now, so I am replying with a short fallback answer. Please try again shortly.';
}

app.post('/chat', async (req, res) => {
  const rawMessage = req.body?.message;
  if (typeof rawMessage !== 'string' || !rawMessage.trim()) {
    return res.status(400).json({ answer: 'Please enter a coffee-related question.' });
  }

  if (rawMessage.length > 4000) {
    return res.status(413).json({ answer: 'Please keep your message under 4,000 characters.' });
  }

  try {
    const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];
    // Only accept user/assistant turns from the client; never allow client-supplied system instructions.
    const safeHistory = rawHistory
      .filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          (item.role === 'user' || item.role === 'assistant') &&
          typeof item.content === 'string',
      )
      .slice(-20)
      .map((item) => ({ role: item.role, content: item.content.slice(0, 4000) }));

    if (!client) {
      return res.json({ answer: getFallbackReply(rawMessage) });
    }

    const response = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...safeHistory,
        { role: 'user', content: rawMessage.trim() },
      ],
      temperature: 0.4,
      max_tokens: 300,
    });

    const answer = response.choices?.[0]?.message?.content || getFallbackReply(rawMessage);
    return res.json({ answer });
  } catch (err) {
    const status = err?.status || err?.response?.status || 500;
    console.error('GROQ request failed:', { status });

    if (status === 401 || status === 403 || status === 429) {
      return res.status(502).json({
        answer: 'The coffee assistant is temporarily unavailable. Please try again later.',
      });
    }

    return res.status(500).json({
      answer: getFallbackReply(rawMessage),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
