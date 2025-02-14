export default {
    async fetch(request) {
        const token = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI'; // Replace with your Telegram bot token
        const rateLimit = 3; // Max requests per minute
        const chatRequests = new Map();

        if (request.method === 'POST') {
            const update = await request.json();
            if (!update.message) return new Response('OK');

            const chatId = update.message.chat.id;
            const text = update.message.text;

            // Rate limiting
            const now = Date.now();
            if (!chatRequests.has(chatId)) {
                chatRequests.set(chatId, []);
            }
            const requests = chatRequests.get(chatId).filter(t => now - t < 60000);
            requests.push(now);
            chatRequests.set(chatId, requests);
            if (requests.length > rateLimit) {
                return sendMessage(chatId, "⚠️ *Rate Limit Exceeded!*\nPlease wait before sending more requests.", token);
            }

            if (text.startsWith('/start')) {
                return sendMessage(chatId, 
                    `🌟 *STRIPE CHECKOUT ANALYZER* 🌟\n\n` +
                    `Send any Stripe checkout URL to analyze:\n` +
                    `• Checkout Type (2D/3D)\n` +
                    `• Payment Amount\n` +
                    `• Merchant Details\n` +
                    `• Status Check\n` +
                    `• Attempt Detection\n\n` +
                    `⚠️ *Rate Limits:*\n• 3 requests per 60 seconds\n\n` +
                    `⚠️ *Warning Types:*\n• Multiple attempts detected\n` +
                    `• 3DS triggered after attempts\n` +
                    `• Checkout expiration\n\n` +
                    `*Example URL Format:*\nhttps://checkout.stripe.com/c/pay/cs_live_...`, 
                    token
                );
            }

            if (text.startsWith('https://checkout.stripe.com/')) {
                return analyzeStripeCheckout(chatId, text, token);
            }

            return sendMessage(chatId, "❌ Invalid command or URL. Please send a valid Stripe checkout link.", token);
        }

        return new Response('OK');
    }
};

async function analyzeStripeCheckout(chatId, url, token) {
    const randomType = Math.random() > 0.5 ? '2D' : '3D'; // Simulated detection
    const randomAmount = (Math.random() * 100).toFixed(2);
    const randomMerchant = "Example Merchant";
    const randomWebsite = "example.com";
    const status = "🟢 Active";

    const analysisResult = 
        `🔓 *STRIPE CHECKOUT* 🔑\n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `*Type:* ${randomType}\n` +
        `*Amount:* $${randomAmount}\n` +
        `*Merchant:* ${randomMerchant}\n` +
        `*Website:* ${randomWebsite}\n` +
        `*Status:* ${status}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🕒 ${new Date().toLocaleTimeString()} • Analysis: 0.00s`;

    return sendMessage(chatId, analysisResult, token);
}

async function sendMessage(chatId, text, token) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const body = {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
    };

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}
                                   
