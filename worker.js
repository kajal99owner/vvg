addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

const TELEGRAM_BOT_TOKEN = '7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI';
const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function handleRequest(request) {
    if (request.method === 'POST') {
        const update = await request.json();
        return handleUpdate(update);
    }
    return new Response('OK');
}

async function handleUpdate(update) {
    if (update.callback_query) {
        return handleCallbackQuery(update.callback_query);
    }
    if (update.message) {
        return handleMessage(update.message);
    }
    return new Response('OK');
}

async function handleCallbackQuery(callbackQuery) {
    const { data, message } = callbackQuery;
    const chatId = message.chat.id;
    const messageId = message.message_id;
    
    if (data === '/Commands') {
        await deleteMessage(chatId, messageId);
        return sendCommandsMenu(chatId);
    }
    return new Response('OK');
}

async function handleMessage(message) {
    const { text, chat, from } = message;
    const chatId = chat.id;
    
    if (text === '/start') {
        return sendWelcomeMessage(chatId, from);
    } else if (text === '/Commands') {
        await deleteMessage(chatId, message.message_id);
        return sendCommandsMenu(chatId);
    }
    return new Response('OK');
}

async function sendWelcomeMessage(chatId, user) {
    const videoUrl = "https://t.me/kajal_developer/57";
    const buttons = [
        [{ text: "Commands", callback_data: "/Commands" }],
        [{ text: "DEV", url: "https://t.me/WorldBestEditDeveloper" }]
    ];
    const caption = `<b>👋 Welcome Back ${user.first_name}</b>\n\n🌥️ Bot Status: Alive 🟢\n\n💞 Dev: @WorldBestEditDeveloper`;
    return sendVideo(chatId, videoUrl, caption, buttons);
}

async function sendCommandsMenu(chatId) {
    const videoUrl = "https://t.me/kajal_developer/57"; 
    const buttons = [
        [
            { text: "Video 🎥", callback_data: "Video1" },
            { text: "Tools", callback_data: "/tools" }
        ],
        [
            { text: "Channel", url: "https://t.me/WorldBestEditDeveloper" },
            { text: "DEV", url: "https://t.me/WorldBestEditDeveloper" }
        ],
        [
            { text: "◀️ Go Back", callback_data: "/start" }
        ]
    ];
    const caption = `<b>🔹 XS :</b>\n\n<b>🔹 Available Tools :</b>\n\n<b>📌 Video - 0</b>\n<b>📌 Tools - 2</b>`;
    return sendVideo(chatId, videoUrl, caption, buttons);
}

async function sendVideo(chatId, videoUrl, caption, buttons) {
    const payload = {
        chat_id: chatId,
        video: videoUrl,
        caption: caption,
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: buttons },
        protect_content: true
    };
    return sendTelegramRequest("sendVideo", payload);
}

async function deleteMessage(chatId, messageId) {
    const payload = {
        chat_id: chatId,
        message_id: messageId
    };
    return sendTelegramRequest("deleteMessage", payload);
}

async function sendTelegramRequest(method, payload) {
    return fetch(`${BASE_URL}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}
