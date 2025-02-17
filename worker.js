addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

// Replace with your Telegram bot token
const TELEGRAM_BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function handleRequest(request) {
    if (request.method === "POST") {
        const update = await request.json();
        return await processUpdate(update);
    }
    return new Response("OK", { status: 200 });
}

async function processUpdate(update) {
    if (!update.message || !update.message.text) return new Response("No message", { status: 200 });

    const chatId = update.message.chat.id;
    const text = update.message.text;

    let responseText = "Hello! Send me a message.";
    
    if (text.startsWith("/start")) {
        responseText = "Welcome to the Cloudflare Worker Telegram bot!";
    } else {
        responseText = await getAIResponse(text);
    }

    await sendMessage(chatId, responseText);
    return new Response("Message sent", { status: 200 });
}

async function sendMessage(chatId, text) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    const body = JSON.stringify({ chat_id: chatId, text });

    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
    });
}

// Example AI response function using Blackbox AI
async function getAIResponse(input) {
    const url = "https://blackbox.ai/api"; // Replace with actual API endpoint
    const body = JSON.stringify({ prompt: input });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body
        });

        const result = await response.json();
        return result.reply || "AI response unavailable.";
    } catch (error) {
        return "Error getting AI response.";
    }
}
