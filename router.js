const Groq = require('groq-sdk');
require('dotenv').config(); 
const { EXPERT_PROMPTS } = require('./prompts');

const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY, 
    baseURL: "https://api.groq.com" 
});

async function route_and_respond(message, intentData) {
    const { intent, confidence } = intentData;

    if (intent === 'unclear' || confidence < 0.5) {
        return "I'm not quite sure what you're asking for. Could you clarify if this is about code, data, writing, or your career?";
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: EXPERT_PROMPTS[intent] },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Router Expert Error:", error.message);
        throw error;
    }
}

module.exports = { route_and_respond };