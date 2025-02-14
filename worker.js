addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url);
    if (request.method === 'POST') {
        const update = await request.json();
        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text;
            if (text === '/start') {
                return sendStartMessage(chatId, update.message.from);
            } else if (text === '/Commands') {
                return handleCommands(update);
            }
        } else if (update.callback_query) {
            const data = update.callback_query.data;
            const chatId = update.callback_query.message.chat.id;
            if (data === '/Commands') {
                return handleCommands(update);
            } else if (data === '/black') {
                return sendJoinMessage(chatId);
            }
        }
    }
    return new Response('OK');
}

async function sendStartMessage(chatId, user) {
    const videoUrl = "https://t.me/kajal_developer/57";
    const caption = `<b>👋 Welcome Back, ${user.first_name}</b>\n\n🌥️ Bot Status: Alive 🟢\n\n💞 Dev: @LakshayDied`;
    const button = {
        inline_keyboard: [
            [{ text: "Commands", callback_data: "/Commands" }],
            [{ text: "DEV", url: "https://t.me/Teleservices_Api" }]
        ]
    };
    return sendVideo(chatId, videoUrl, caption, button);
}

async function handleCommands(update) {
    const messageId = update.callback_query ? update.callback_query.message.message_id : update.message.message_id;
    const chatId = update.callback_query ? update.callback_query.message.chat.id : update.message.chat.id;
    await deleteMessage(chatId, messageId);
    return checkChatMember(update.callback_query.from.id);
}

async function checkChatMember(userId) {
    // Simulating an API check - adjust as needed
    return sendJoinMessage(userId);
}

async function sendJoinMessage(chatId) {
    const videoUrl = "https://t.me/kajal_developer/57";
    const caption = `<b>[𖤐] XS developer :</b>\n\n<b>[ϟ] Current Gateways And Tools :</b>\n\n<b>[ᛟ] Charge - 0</b>\n<b>[ᛟ] Auth - 0</b>\n<b>[ᛟ] Tools - 2</b>`;
    const button = {
        inline_keyboard: [
            [
                { text: "Gateways", callback_data: "/black" },
                { text: "Tools", callback_data: "/tools" }
            ],
            [
                { text: "Channel", url: "https://t.me/Teleservices_Api" },
                { text: "DEV", url: "https://t.me/Teleservices_Bots" }
            ],
            [{ text: "◀️ Go Back", callback_data: "/black" }]
        ]
    };
    return sendVideo(chatId, videoUrl, caption, button);
}

async function sendVideo(chatId, videoUrl, caption, replyMarkup) {
    const payload = {
        chat_id: chatId,
        video: videoUrl,
        caption: caption,
        parse_mode: "HTML",
        reply_markup: replyMarkup
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
    const TELEGRAM_BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
    return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}
