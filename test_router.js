const axios = require('axios');

const TEST_MESSAGES = [
    "how do i sort a list of objects in python?",
    "explain this sql query for me",
    "This paragraph sounds awkward, can you help me fix it?",
    "I'm preparing for a job interview, any tips?",
    "what's the average of these numbers: 12, 45, 23, 67, 34",
    "Help me make this better.",
    "I need to write a function that takes a user id and returns their profile, but also i need help with my resume.",
    "hey",
    "Can you write me a poem about clouds?", 
    "Rewrite this sentence to be more professional.",
    "I'm not sure what to do with my career.",
    "what is a pivot table",
    "fxi thsi bug pls: for i in range(10) print(i)",
    "How do I structure a cover letter?",
    "My boss says my writing is too verbose."
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runFullTest() {
    console.log("🚀 Starting Full 15-Point Router Test...\n");

    for (let i = 0; i < TEST_MESSAGES.length; i++) {
        const msg = TEST_MESSAGES[i];
        try {
            const response = await axios.post('http://127.0.0.1:3000/chat', { message: msg });
            const { intent, confidence, reply } = response.data;

            console.log(`[Test ${i + 1}/15]`);
            console.log(`📝 Input: "${msg}"`);
            console.log(`🏷️  Intent: [${intent.toUpperCase()}] | Confidence: ${confidence}`);
            console.log(`🤖 Response: ${reply.substring(0, 100)}...`);
            console.log("--------------------------------------------------\n");

        } catch (error) {
            console.error(`❌ Error on Test ${i + 1}: ${error.response ? error.response.status : error.message}`);
        }
        
        // 2-second sleep to prevent Groq Rate Limiting
        await sleep(2000); 
    }
    console.log("🏁 All 15 tests completed! Check your 'route_log.jsonl' for the full history.");
}

runFullTest();