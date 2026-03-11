const Groq = require('groq-sdk');
require('dotenv').config(); // Load the environment variables
const { CLASSIFIER_PROMPT } = require('./prompts');

const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY, 
    baseURL: "https://api.groq.com" 
});

async function classify_intent(message) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: CLASSIFIER_PROMPT },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" } 
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("Classifier Error:", error.message);
        return { intent: "unclear", confidence: 0.0 };
    }
}

module.exports = { classify_intent };