const TELEGRAM_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';
const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const WEBHOOK_PATH = '/endpoint';

async function registerWebhook(webhookUrl) {
    try {
        const response = await fetch(`${BASE_URL}/setWebhook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: webhookUrl,
                allowed_updates: ['message', 'callback_query']
            })
        });
        return response.json();
    } catch (error) {
        return new Response(`Webhook registration failed: ${error.message}`, { status: 500 });
    }
}

async function unRegisterWebhook() {
    try {
        const response = await fetch(`${BASE_URL}/deleteWebhook`, {
            method: 'POST'
        });
        return response.json();
    } catch (error) {
        return new Response(`Webhook removal failed: ${error.message}`, { status: 500 });
    }
}

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Webhook management endpoints
    if (request.method === 'GET') {
        if (url.pathname === '/register') {
            const webhookUrl = `${url.origin}${WEBHOOK_PATH}`;
            const result = await registerWebhook(webhookUrl);
            return new Response(JSON.stringify(result), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        if (url.pathname === '/unregister') {
            const result = await unRegisterWebhook();
            return new Response(JSON.stringify(result), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response('Use /register or /unregister to manage webhook');
    }

    // Telegram webhook endpoint
    if (request.method === 'POST' && url.pathname === WEBHOOK_PATH) {
        try {
            const update = await request.json();
            return handleUpdate(update);
        } catch (error) {
            return new Response(`Error processing update: ${error.message}`, { status: 400 });
        }
    }

    return new Response('Not Found', { status: 404 });
}

async function handleUpdate(update) {
    try {
        if (update.callback_query) {
            const { data, message: { chat: { id: chatId }, message_id } } = update.callback_query;
            if (data === '/Commands') {
                await deleteMessage(chatId, message_id);
                await sendCommandsMenu(chatId);
            }
            return new Response('OK');
        }

        if (update.message) {
            const { text, chat: { id: chatId }, from: user, message_id } = update.message;
            
            if (text === '/start') {
                await sendWelcomeMessage(chatId, user);
            }
            else if (text === '/Commands') {
                await deleteMessage(chatId, message_id);
                await sendCommandsMenu(chatId);
            }
            else if (text === '/about') {
                await sendAboutMessage(chatId, user);
            }
            return new Response('OK');
        }

        return new Response('Unhandled update type', { status: 400 });
    } catch (error) {
        return new Response(`Update handling error: ${error.message}`, { status: 500 });
    }
}
//
async function sendWelcomeMessage(chatId, user) {
    const videoUrl = "https://t.me/kajal_developer/57";
    const buttons = [
        [{ text: "menu", callback_data: "/Commands" }],
        [{ text: "DEV", url: "https://t.me/pornhub_Developer" }]
    ];

    const caption = `<b>👋 Welcome Back ${user.first_name}</b>\n\n🌥️ Bot Status: Alive 🟢\n\n💞 Dev: @pornhub_Developer`;

    await fetch(`${BASE_URL}/sendVideo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            video: videoUrl,
            caption: caption,
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: buttons },
            protect_content: true
        })
    });
}
//
async function sendCommandsMenu(chatId) {
    const videoUrl = "https://t.me/kajal_developer/57"; 
    const buttons = [
        [
            { text: "video 🌏", callback_data: "video1" },
            { text: "Tools", callback_data: "/tools" }
        ],
        [
            { text: "Channel", url: "https://t.me/pornhub_Developer" },
            { text: "DEV", url: "https://t.me/pornhub_Developer" }
        ],
        [
            { text: "◀️ Go Back", callback_data: "/start" }
        ]
    ];

    const caption = `<b>[𖤐] XS :</b>\n\n<b>[ϟ] video Tools :</b>\n\n<b>[ᛟ] video - 0</b>\n<b>[ᛟ] video - 0</b>\n<b>[ᛟ] Tools - 2</b>`;

    await fetch(`${BASE_URL}/sendVideo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            video: videoUrl,
            caption: caption,
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: buttons },
            protect_content: true
        })
    });
}
//
async function deleteMessage(chatId, messageId) {
    await fetch(`${BASE_URL}/deleteMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            protect_content: true
        })
    });
}
//
async function sendAboutMessage(chatId, user) {
    const aboutMessage = `
<b><blockquote>⍟───[ MY ᴅᴇᴛᴀɪʟꜱ ]───⍟</blockquote>

‣ ᴍʏ ɴᴀᴍᴇ : <a href="https://t.me/${user.username}">${user.first_name}</a>
‣ ᴍʏ ʙᴇsᴛ ғʀɪᴇɴᴅ : <a href='tg://settings'>ᴛʜɪs ᴘᴇʀsᴏɴ</a> 
‣ ᴅᴇᴠᴇʟᴏᴘᴇʀ : <a href='https://t.me/sumit_developer'>💫 Sx</a> 
‣ ʟɪʙʀᴀʀʏ : <a href='Cloudflare.com'>Cloudflare</a> 
‣ ʟᴀɴɢᴜᴀɢᴇ : <a href='JS 💻'>JS 💻</a> 
‣ ᴅᴀᴛᴀ ʙᴀsᴇ : <a href='Cloudflare.com'>Cloudflare</a> 
‣ ʙᴏᴛ sᴇʀᴠᴇʀ : <a href='ᴄʟᴏᴜᴅғʟᴀʀᴇ ⚡'>ᴄʟᴏᴜᴅғʟᴀʀᴇ ⚡</a> 
‣ ʙᴜɪʟᴅ sᴛᴀᴛᴜs : v1.0 [sᴛᴀʙʟᴇ]</b>
    `;

    await fetch(`${BASE_URL}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: aboutMessage,
            parse_mode: 'HTML',
            protect_content: true
        })
    });
}
//

// Keep all your existing message functions unchanged
// (sendWelcomeMessage, sendCommandsMenu, sendAboutMessage, deleteMessage)

export default {
    fetch: handleRequest
};
