addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const { pathname } = new URL(request.url);

    // Telegram Bot Token (Replace with your own)
    const BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
    
    // Webhook Verification
    if (request.method === "POST") {
        const update = await request.json();
        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text;

            if (text === "/start") {
                return sendStartMessage(chatId, BOT_TOKEN);
            } else if (text === "/join") {
                return checkUserSubscription(chatId, BOT_TOKEN);
            }
        }
    }

    return new Response("Hello, this is a Telegram Bot running on Cloudflare Workers!", { status: 200 });
}

async function sendStartMessage(chatId, token) {
    const messageText = "*⭐️ To Use This Bot You Need To Join All Channels -*";
    const photoUrl = "https://t.me/kajal_developer/9";
    
    const buttons = {
        inline_keyboard: [
            [{ text: "👨‍💻 Developer", url: "tg://openmessage?user_id=6449612223" }],
            [{ text: "🔊 Updates", url: "https://t.me/addlist/P9nJIi98NfY3OGNk" }],
            [{ text: "✅ Join", callback_data: "/join" }]
        ]
    };

    const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            photo: photoUrl,
            caption: messageText,
            parse_mode: "Markdown",
            reply_markup: buttons
        })
    });

    return new Response("Sent Start Message!", { status: 200 });
}

async function checkUserSubscription(chatId, token) {
    const channel = "@kajal_developer"; // Replace with your channel
    const response = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${chatId}`);
    const result = await response.json();

    if (result.result && (result.result.status === "member" || result.result.status === "administrator" || result.result.status === "creator")) {
        return sendMenu(chatId, token);
    } else {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: "*❌ Must join all channels\n @kajal_developer*",
                parse_mode: "Markdown"
            })
        });
        return new Response("User not subscribed!", { status: 403 });
    }
}

async function sendMenu(chatId, token) {
    const menuText = "🤗 Welcome to Lx Bot 🌺";
    const keyboard = {
        keyboard: [
            ["🌺 CP", "🇮🇳 Desi"],
            ["🇬🇧 Foreign", "🐕‍🦺 Animal"],
            ["💕 Webseries"],
            ["💑 Gay CP"],
            ["💸 𝘽𝙐𝙔 𝙑𝙄𝙋 💸"]
        ],
        resize_keyboard: true
    };

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: menuText,
            reply_markup: keyboard
        })
    });

    return new Response("Menu sent!", { status: 200 }); }
 }
