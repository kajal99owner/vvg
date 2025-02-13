const TELEGRAM_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';
const CLOUDFLARE_API_TOKEN = '10Ddp8ptjfl2weyfRjat5Hlo3iKTjzhr-Kgdr5bd';
const CLOUDFLARE_ACCOUNT_ID = '05155e8a4c89ed88082182aed190fec7';
const ADMIN_ID = '7912527708';
const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// KV namespace for storing worker metadata
const WORKER_META = worker_metadata; // Bind this KV namespace in your wrangler.toml

function generateWorkerName() {
  const prefix = 'bot-';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + randomPart;
}

async function getWorkerName() {
  let name = await WORKER_META.get('worker_name');
  if (!name) {
    name = generateWorkerName();
    await WORKER_META.put('worker_name', name);
  }
  return name;
}

async function sendMessage(chatId, text) {
  await fetch(`${BASE_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    })
  });
}

async function handleUpdate(update) {
  if (update.message) {
    const text = update.message.text;
    const chatId = update.message.chat.id;
    const user = update.message.from;

    if (user.id.toString() !== ADMIN_ID) {
      await sendMessage(chatId, "⛔ Unauthorized access!");
      return new Response('OK');
    }

    if (text && text.startsWith('/update')) {
      if (update.message.document) {
        if (update.message.document.mime_type === 'text/javascript') {
          await handleCodeUpdate(chatId, update.message.document.file_id);
        } else {
          await sendMessage(chatId, "⚠️ Invalid file type. Please upload a .js file.");
        }
      } else {
        await sendMessage(chatId, "⚠️ Please send the updated code as a .js file attachment.");
      }
    }
    
    if (text && text.startsWith('/help')) {
      await sendMessage(chatId, `<b>Available commands:</b>
/update - Upload new worker code
/version - Show current version
/rename - Generate new random worker name`);
    }

    if (text && text.startsWith('/version')) {
      const workerName = await getWorkerName();
      const versionInfo = `🔄 Last update: ${new Date().toLocaleString()}\n✅ Worker: ${workerName}`;
      await sendMessage(chatId, versionInfo);
    }

    if (text && text.startsWith('/rename')) {
      const newName = generateWorkerName();
      await WORKER_META.put('worker_name', newName);
      await sendMessage(chatId, `🆕 New worker name: ${newName}\n⚠️ Update the code to use this new name!`);
    }
  }
  return new Response('OK');
}

async function handleCodeUpdate(chatId, fileId) {
  try {
    const workerName = await getWorkerName();
    
    // Get file URL from Telegram
    const fileResponse = await fetch(`${BASE_URL}/getFile?file_id=${fileId}`);
    const fileData = await fileResponse.json();
    
    if (!fileData.ok) throw new Error("Failed to get file from Telegram");
    
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${fileData.result.file_path}`;

    // Download new code
    const codeResponse = await fetch(fileUrl);
    const newCode = await codeResponse.text();

    // Validate code
    if (!newCode.includes('export default')) {
      throw new Error("Invalid Worker code: Missing export default");
    }
    if (newCode.length > 1024 * 1024) {
      throw new Error("Code size exceeds 1MB limit");
    }

    // Deploy to Cloudflare
    const deployResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts/${workerName}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/javascript'
        },
        body: newCode
      }
    );

    const result = await deployResponse.json();
    
    if (result.success) {
      const timestamp = new Date().toLocaleString();
      await sendMessage(chatId, `✅ Bot code updated successfully!\n🕒 ${timestamp}\n📛 Worker: ${workerName}`);
    } else {
      const errors = result.errors.map(e => e.message).join('\n');
      await sendMessage(chatId, `❌ Update failed:\n${errors}`);
    }

  } catch (error) {
    console.error(`Update error: ${error.message}`);
    await sendMessage(chatId, `⚠️ Error: ${error.message}`);
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    const update = await request.json();
    return handleUpdate(update);
  }
  return new Response('Telegram Bot Worker is running');
  }
