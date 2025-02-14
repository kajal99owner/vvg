const TELEGRAM_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';
const KV_NAMESPACE = '852e944e9aa44549a612b750658d1331'; // Create in Cloudflare dashboard

async function handleRequest(request) {
    const url = new URL(request.url);
    if (url.pathname === '/set-webhook') {
        const webhookUrl = `${url.origin}/webhook`;
        const resp = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=${webhookUrl}`);
        return new Response(await resp.text());
    }
    return new Response('OK');
}

async function handleWebhook(event) {
    const update = await event.request.json();
    const message = update.message;
    if (!message) return new Response('OK');

    const chatId = message.chat.id;
    const text = message.text || '';
    
    // Rate limiting
    const rateLimitKey = `rate_limit_${chatId}`;
    const limitData = await KV_NAMESPACE.get(rateLimitKey);
    const [count, timestamp] = limitData ? limitData.split(':').map(Number) : [0, 0];
    const now = Date.now();
    
    if (now - timestamp < 60000 && count >= 3) {
        await sendMessage(chatId, '⚠️ Rate limit exceeded. Please wait 1 minute.');
        return new Response('OK');
    }

    if (text.startsWith('/start')) {
        const welcomeMsg = `🌟 STRIPE CHECKOUT ANALYZER 🌟\n\nSend any Stripe checkout URL to analyze:\n• Checkout Type (2D/3D)\n• Payment Amount\n• Merchant Details\n• Status Check\n• Attempt Detection\n\n⚠️ Rate Limits:\n• 3 requests per 60 seconds`;
        await sendMessage(chatId, welcomeMsg);
    } else if (text.match(/checkout\.stripe\.com\/c\/pay\/cs_/)) {
        // Update rate limit
        await KV_NAMESPACE.put(rateLimitKey, `${count + 1}:${now}`);
        
        // Simulated analysis (replace with actual API calls)
        const analysisResult = `🔓 STRIPE CHECKOUT 🔑\n━━━━━━━━━━━━━━━━━━━━\nType: 3D Secure\nAmount: $199.99 USD\nMerchant: Example Corp\nWebsite: https://example.com\nStatus: 🟢 Active\n━━━━━━━━━━━━━━━━━━━━\n🕒 ${new Date().toLocaleTimeString()} • Analysis: 0.00s`;
        await sendMessage(chatId, analysisResult, true);
    } else {
        await sendMessage(chatId, 'Please send a valid Stripe Checkout URL in the format:\nhttps://checkout.stripe.com/c/pay/cs_live_...');
    }

    return new Response('OK');
}

async function sendMessage(chatId, text, monospace = false) {
    const body = {
        chat_id: chatId,
        text,
        parse_mode: monospace ? 'HTML' : undefined,
    };
    
    if (monospace) {
        text = text.replace(/(🔓 STRIPE CHECKOUT 🔑|━━━━━━━━━━━━━━━━━━━━)/g, '<b>$1</b>')
                   .replace(/(Type:|Amount:|Merchant:|Website:|Status:)/g, '<b>$1</b>');
        body.text = `<pre>${text}</pre>`;
    }

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

export default {
    async fetch(request, env) {
        const kv = env[KV_NAMESPACE];
        const url = new URL(request.url);
        
        if (url.pathname === '/webhook') {
            return handleWebhook({ request, env: { KV_NAMESPACE: kv } });
        }
        return handleRequest(request);
    }
};
