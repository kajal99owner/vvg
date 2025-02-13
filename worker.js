const TELEGRAM_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';
const CLOUDFLARE_API_TOKEN = '10Ddp8ptjfl2weyfRjat5Hlo3iKTjzhr-Kgdr5bd';
const CLOUDFLARE_ACCOUNT_ID = '05155e8a4c89ed88082182aed190fec7';
const WORKER_NAME = 'lx-cloudflare-bot';
const ADMIN_ID = '7912527708';

async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });
    if (!response.ok) {
      console.error('Message send failed:', await response.text());
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function handleCodeUpdate(chatId, fileId) {
  try {
    // Get file info from Telegram
    const fileInfoResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getFile?file_id=${fileId}`
    );
    const fileInfo = await fileInfoResponse.json();
    
    if (!fileInfo.ok) throw new Error('Failed to get file info');
    
    // Download the code file
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${fileInfo.result.file_path}`;
    const codeResponse = await fetch(fileUrl);
    const newCode = await codeResponse.text();

    // Validate code
    if (!newCode.includes('export default')) {
      throw new Error("Invalid Worker code: Missing default export");
    }

    // Deploy to Cloudflare
    const deployResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts/${WORKER_NAME}`,
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
      await sendMessage(chatId, "✅ Bot updated successfully!");
    } else {
      const errorMsg = result.errors?.[0]?.message || 'Unknown error';
      await sendMessage(chatId, `❌ Deployment failed: ${errorMsg}`);
    }
  } catch (error) {
    await sendMessage(chatId, `⚠️ Error: ${error.message}`);
    console.error('Code update error:', error);
  }
}

async function handleUpdate(update) {
  if (!update.message) return new Response('OK');
  
  const { text, chat, from, document } = update.message;
  const chatId = chat.id;
  
  // Verify admin
  if (text?.startsWith('/update') && from.id.toString() === ADMIN_ID) {
    if (document) {
      if (document.file_name?.endsWith('.js')) {
        await handleCodeUpdate(chatId, document.file_id);
      } else {
        await sendMessage(chatId, "⚠️ Please send a .js file");
      }
    } else {
      await sendMessage(chatId, "📎 Please attach the new code as a .js file");
    }
  }
  
  return new Response('OK');
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const update = await request.json();
      return handleUpdate(update);
    } catch (error) {
      console.error('Request handling error:', error);
      return new Response('Error processing update', { status: 500 });
    }
  }
  return new Response('OK');
}
