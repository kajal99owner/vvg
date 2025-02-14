addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Telegram Bot API Token
const TELEGRAM_BOT_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';

// Function to generate a random test credit card number
function generateTestCreditCard(bin) {
  const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  const cardNumber = bin + randomNumber;
  return cardNumber;
}

// Function to send a message to Telegram
async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  return response.json();
}

// Handle incoming requests
async function handleRequest(request) {
  if (request.method === 'POST') {
    const body = await request.json();
    const message = body.message;
    const chatId = message.chat.id;
    const text = message.text;

    if (text.startsWith('/gen')) {
      const bin = text.split(' ')[1] || '424242'; // Default BIN for testing
      const cardNumber = generateTestCreditCard(bin);
      const expiryDate = `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10) + 25}`;
      const cvv = Math.floor(Math.random() * 900) + 100;

      const responseText = `
        🚀 Random Test Credit Card Generated:
        --------------------------
        🎴 Card Number: ${cardNumber}
        📅 Expiry Date: ${expiryDate}
        🔑 CVV: ${cvv}
        --------------------------
        ℹ️ Info: Test Card
        🏦 Bank: Test Bank
        🌍 Country: Test Country
      `;

      await sendMessage(chatId, responseText);
      return new Response('OK', { status: 200 });
    } else {
      await sendMessage(chatId, 'Welcome! Use /gen <BIN> to generate a test credit card.');
      return new Response('OK', { status: 200 });
    }
  }

  return new Response('Invalid request', { status: 400 });
}
