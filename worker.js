const TELEGRAM_TOKEN = 'YOUR_BOT_TOKEN';
const CLOUDFLARE_API_TOKEN = 'YOUR_CLOUDFLARE_API_TOKEN';
const CLOUDFLARE_ACCOUNT_ID = 'YOUR_ACCOUNT_ID';
const WORKER_NAME = 'YOUR_WORKER_NAME';
const ADMIN_ID = 'YOUR_ADMIN_USER_ID';

async function handleUpdate(update) {
  if (update.message) {
    const text = update.message.text;
    const chatId = update.message.chat.id;
    const user = update.message.from;

    // Handle /update command
    if (text.startsWith('/update') && user.id.toString() === ADMIN_ID) {
      if (update.message.document) {
        await handleCodeUpdate(chatId, update.message.document.file_id);
      } else {
        await sendMessage(chatId, "⚠️ Please send the updated code as a .js file attachment.");
      }
    }
  }
  return new Response('OK');
}

async function handleCodeUpdate(chatId, fileId) {
  try {
    // 1. Get file URL from Telegram
    const fileResponse = await fetch(`${BASE_URL}/getFile?file_id=${fileId}`);
    const fileData = await fileResponse.json();
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${fileData.result.file_path}`;

    // 2. Download new code
    const codeResponse = await fetch(fileUrl);
    const newCode = await codeResponse.text();

    // 3. Validate code (basic check)
    if (!newCode.includes('export default')) {
      throw new Error("Invalid Worker code: Missing export default");
    }

    // 4. Deploy to Cloudflare
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
      await sendMessage(chatId, "✅ Bot code updated successfully!");
    } else {
      await sendMessage(chatId, `❌ Update failed: ${result.errors[0].message}`);
    }

  } catch (error) {
    await sendMessage(chatId, `⚠️ Error: ${error.message}`);
  }
}
