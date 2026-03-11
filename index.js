const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Ensure env variables are loaded
const { classify_intent } = require('./classifier'); 
const { route_and_respond } = require('./router');   

const app = express();
app.use(express.json());

// Step 5: Enhanced Logging Function
function log_request(intentData, message, reply) {
    const logPath = path.join(__dirname, 'route_log.jsonl');
    
    // Creating the log entry with keys that match the requirement
    const entry = JSON.stringify({
        time: new Date().toISOString(),
        intent: intentData.intent,
        confidence: intentData.confidence, // Full key name
        user_message: message,             // Full key name
        final_response: reply              // Full key name
    }) + '\n';

    try {
        // Use appendFileSync to ensure the data is written immediately
        fs.appendFileSync(logPath, entry);
        console.log("💾 Log saved successfully to route_log.jsonl");
    } catch (err) {
        console.error("❌ Critical Logging Error:", err);
    }
}

// Main API Route
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    console.log(`📥 Incoming request: ${message ? message.substring(0, 30) : "empty"}...`);
    
    if (!message) return res.status(400).json({ error: "No message provided" });

    try {
        // Step 1: Classify (Brain)
        const intentData = await classify_intent(message);
        
        // Step 2: Route and Respond (Expert)
        const finalResponse = await route_and_respond(message, intentData);
        
        // Step 3: Respond to Client
        res.json({ 
            status: "success",
            intent: intentData.intent,
            confidence: intentData.confidence,
            reply: finalResponse 
        });

        // Step 4: Log Data (Observability)
        log_request(intentData, message, finalResponse);

    } catch (error) {
        console.error("Pipeline Error:", error);
        res.status(500).json({ error: "Internal Routing Error" });
    }
});

const PORT = process.env.PORT || 3000;

// Set to 0.0.0.0 for Docker compatibility
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Router service running on http://0.0.0.0:${PORT}`);
    console.log(`📡 Route active: POST /chat`);
    console.log(`📂 Logs will be saved to: ${path.join(__dirname, 'route_log.jsonl')}`);
});