// Environment variable for Telegram bot token
const TELEGRAM_BOT_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';

// Rate limiting setup
const rateLimit = {
  window: 60, // 60 seconds
  maxRequests: 3, // Max 3 requests per window
};

// In-memory storage for rate limiting (for demonstration purposes)
const userRequests = new Map();

// Helper function to analyze Stripe checkout URL
async function analyzeStripeCheckout(url) {
  // Extract details from the URL (mock implementation)
  const checkoutType = url.includes('3d_secure') ? '3D' : '2D';
  const paymentAmount = '$100.00'; // Mock amount
  const merchantDetails = 'Example Merchant';
  const status = '🟢 Active';
  const analysisTime = '0.00 s';

  return {
    type: checkoutType,
    amount: paymentAmount,
    merchant: merchantDetails,
    status: status,
    analysisTime: analysisTime,
  };
}

// Handle incoming Telegram messages
async function handleRequest(request) {
  const url = new URL(request.url);
  if (request.method === 'POST' && url.pathname === `/webhook/${TELEGRAM_BOT_TOKEN}`) {
    const update = await request.json();
    const message = update.message;
    const chatId = message.chat.id;
    const text = message.text;

    // Rate limiting check
    const now = Math.floor(Date.now() / 1000);
    if (!userRequests.has(chatId)) {
      userRequests.set(chatId, []);
    }
    const requests = userRequests.get(chatId).filter((time) => now - time < rateLimit.window);
    if (requests.length >= rateLimit.maxRequests) {
      await sendMessage(chatId, '⚠️ Rate limit exceeded. Please wait 60 seconds.');
      return new Response('OK');
    }
    userRequests.get(chatId).push(now);

    // Handle /start command
    if (text === '/start') {
      const welcomeMessage = `
🌟 STRIPE CHECKOUT ANALYZER 🌟

Send any Stripe checkout URL to analyze:
• Checkout Type (2D/3D)
• Payment Amount
• Merchant Details
• Status Check
• Attempt Detection

⚠️ Rate Limits:
• 3 requests per 60 seconds

⚠️ Warning Types:
• Multiple attempts detected
• 3DS triggered after attempts
• Checkout expiration

Example URL Format:
https://checkout.stripe.com/c/pay/cs_live_...
      `;
      await sendMessage(chatId, welcomeMessage);
      return new Response('OK');
    }

    // Handle Stripe checkout URL analysis
    if (text.startsWith('https://checkout.stripe.com/')) {
      const analysis = await analyzeStripeCheckout(text);
      const responseMessage = `
🔓 STRIPE CHECKOUT 🔑
━━━━━━━━━━━━━━━━━━━━
Type: ${analysis.type}
Amount: ${analysis.amount}
Merchant: ${analysis.merchant}
Status: ${analysis.status}
━━━━━━━━━━━━━━━━━━━━
🕒 ${new Date().toLocaleTimeString()} • Analysis: ${analysis.analysisTime}
      `;
      await sendMessage(chatId, responseMessage);
      return new Response('OK');
    }

    // Handle invalid input
    await sendMessage(chatId, '⚠️ Invalid input. Please send a valid Stripe checkout URL.');
    return new Response('OK');
  }
  return new Response('Not Found', { status: 404 });
}

// Send message to Telegram
async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
  };
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// Cloudflare Workers entry point
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
