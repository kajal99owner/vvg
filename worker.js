addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// Telegram Bot API Token
const TELEGRAM_BOT_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';

// Function to generate a random test credit card number
function generateTestCreditCard(bin) {
  const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return bin + randomNumber;
}

// Function to generate a random expiry date
function generateExpiryDate() {
  const month = Math.floor(Math.random() * 12) + 1;
  const year = Math.floor(Math.random() * 10) + 25; // Years from 2025 to 2034
  return `${month.toString().padStart(2, '0')}/${year}`;
}

// Function to generate a random CVV
function generateCVV() {
  return Math.floor(Math.random() * 900) + 100;
}

// Fetch BIN details from Binlist API
async function lookupBin(bin) {
  try {
    const response = await fetch(`https://lookup.binlist.net/${bin}`, {
      headers: {
        'Accept-Version': '3',
        'User-Agent': 'Cloudflare Worker'
      }
    });
    
    if (!response.ok) throw new Error('BIN lookup failed');
    
    const data = await response.json();
    return {
      bank: data.bank?.name || 'Unknown Bank',
      country: data.country?.name || 'Unknown Country',
      type: data.type || 'Unknown Type',
      scheme: data.scheme || 'Unknown Scheme'
    };
  } catch (error) {
    console.error('BIN lookup error:', error);
    return null;
  }
}

// Send message to Telegram
async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}

// Handle incoming requests
async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const message = body.message;
      const chatId = message.chat.id;
      const text = message.text;

      if (text.startsWith('/gen')) {
        const bin = text.split(' ')[1] || '424242'; // Default to test BIN
        const binDetails = await lookupBin(bin);
        const numberOfCards = 15;

        let responseText = `🚀 Random Test Credit Cards Generated:\n--------------------------\n`;

        for (let i = 0; i < numberOfCards; i++) {
          const cardNumber = generateTestCreditCard(bin);
          const expiryDate = generateExpiryDate();
          const cvv = generateCVV();
          responseText += `${cardNumber}|${expiryDate}|${cvv}\n`;
        }

        responseText += `
--------------------------
ℹ️ Info: ${binDetails?.type || 'Test Card'}
🏦 Bank: ${data.bank?.name || 'Test Bank'}
🌍 Country: ${binDetails?.country || 'Test Country'}
💳 Scheme: ${binDetails?.scheme || 'Unknown'}
        `;

        await sendMessage(chatId, responseText);
        return new Response('OK', { status: 200 });
      } else {
        await sendMessage(chatId, 'Welcome! Use /gen <BIN> to generate test credit cards.');
        return new Response('OK', { status: 200 });
      }
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  return new Response('Invalid request', { status: 400 });
 }

