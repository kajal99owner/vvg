const TELEGRAM_BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
const CHANNEL_USERNAME = "@kajal_developer";


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const update = await request.json();
      
      if (update.callback_query) {
        await handleCallbackQuery(update.callback_query);
      } 
      else if (update.message) {
        await handleMessage(update.message);
        await handleMention(update.message);
      }
      return new Response('OK');
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response('Error', { status: 500 });
    }
  }
  return new Response('Not Found', { status: 404 });
}

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text || '';

  try {
    switch(text) {
      case '/start':
        await sendStartMessage(chatId);
        break;
      case '🌺 CP':
        await sendCPMenu(chatId);
        break;
      case '🇮🇳 Desi':
        await sendDesiMenu(chatId);
        break;
      case '🇬🇧 Forener':
        await sendForeignerMenu(chatId);
        break;
      case '💕 Webseries':
        await sendWebseriesMenu(chatId);
        break;
      case '💑 Gay Cp':
        await sendGayCpMenu(chatId);
        break;
      case '🐕‍🦺 Animal':
        await sendAnimalMenu(chatId);
        break;
      case '🌺 Video 1':
        await sendPhotos(chatId);
        break;
      case '⚜️ Back ♻️':
      case '⚜️ Back ⬅️':
      case '⚜️ Back 🇬🇧🔙':
      case '⚜️ back 🔙':
      case '⚜️ Back 🔙🔙':
      case '⚜️ Back 🔚':
        await sendVBMenu(chatId);
        break;
      default:
        if(text.startsWith('/')) await sendMessage(chatId, "❌ Unrecognized command");
    }
  } catch (error) {
    console.error(`Error handling message: ${error}`);
  }
}

async function handleMention(message) {
  if (message.entities?.some(e => e.type === "mention" && message.text.includes("@your_bot_username"))) {
    const randomEmoji = EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)];
    await sendReaction(message.chat.id, message.message_id, randomEmoji);
  }
}

async function sendStartMessage(chatId) {
  const buttons = [
    [{ text: "👨‍💻 Developer", url: "tg://openmessage?user_id=6449612223" }],
    [{ text: "🔊 Updates", url: "https://t.me/addlist/P9nJIi98NfY3OGNk" }],
    [{ text: "✅", callback_data: "/join" }]
  ];

  await sendPhoto(
    chatId,
    "https://t.me/kajal_developer/9",
    "⭐️ To Usᴇ Tʜɪs Bᴏᴛ Yᴏᴜ Nᴇᴇᴅ Tᴏ Jᴏɪɴ Aʟʟ Cʜᴀɴɴᴇʟs -",
    buttons
  );
}

// Menu Handlers
const menuTemplates = {
  cp: {
    buttons: [
      ["🌺 Video 1", "🌺 Video 2"],
      ["🌺 Video 3", "🌺 Video 4"],
      ["🌺 Video 5", "🌺 Video 6"],
      ["🌺 Video 7", "🌺 Video 8"],
      ["🌺 Video 9", "🌺 Video 10"],
      ["⚜️ Back ♻️"]
    ]
  },
  desi: {
    buttons: [
      ["🇮🇳 video 1", "🇮🇳 video 2"],
      ["🇮🇳 video 3", "🇮🇳 video 4"],
      ["🇮🇳 video 5", "🇮🇳 video 6"],
      ["🇮🇳 video 7", "🇮🇳 video 8"],
      ["🇮🇳 video 9", "🇮🇳 video 10"],
      ["⚜️ Back ⬅️"]
    ]
  },
  foreigner: {
    buttons: [
      ["🇬🇧 Video 1", "🇬🇧 Video 2"],
      ["🇬🇧 Video 3", "🇬🇧 Video 4"],
      ["🇬🇧 Video 5", "🇬🇧 Video 6"],
      ["🇬🇧 Video 7", "🇬🇧 Video 8"],
      ["🇬🇧 Video 9", "🇬🇧 Video 10"],
      ["⚜️ Back 🇬🇧🔙"]
    ]
  },
  webseries: {
    buttons: [
      ["💕 Video 1", "💕 Video 2"],
      ["💕 Video 3", "💕 Video 4"],
      ["💕 Video 5", "💕 Video 6"],
      ["💕 Video 7", "💕 Video 8"],
      ["💕 Video 9", "💕 Video 10"],
      ["⚜️ back 🔙"]
    ]
  },
  gaycp: {
    buttons: [
      ["💑 Video 1", "💑 Video 2"],
      ["💑 Video 3", "💑 Video 4"],
      ["💑 Video 5", "💑 Video 6"],
      ["💑 Video 7", "💑 Video 8"],
      ["💑 Video 9", "💑 Video 10"],
      ["⚜️ Back 🔙🔙"]
    ]
  },
  animal: {
    buttons: [
      ["🐕‍🦺 Video 1", "🐕‍🦺 Video 2"],
      ["🐕‍🦺 Video 3", "🐕‍🦺 Video 4"],
      ["🐕‍🦺 Video 5", "🐕‍🦺 Video 6"],
      ["🐕‍🦺 Video 7", "🐕‍🦺 Video 8"],
      ["🐕‍🦺 Video 9", "🐕‍🦺 Video 10"],
      ["⚜️ Back 🔚"]
    ]
  }
};

async function sendCPMenu(chatId) {
  await sendMenu(chatId, menuTemplates.cp.buttons);
}

async function sendDesiMenu(chatId) {
  await sendMenu(chatId, menuTemplates.desi.buttons);
}

async function sendForeignerMenu(chatId) {
  await sendMenu(chatId, menuTemplates.foreigner.buttons);
}

async function sendWebseriesMenu(chatId) {
  await sendMenu(chatId, menuTemplates.webseries.buttons);
}

async function sendGayCpMenu(chatId) {
  await sendMenu(chatId, menuTemplates.gaycp.buttons);
}

async function sendAnimalMenu(chatId) {
  await sendMenu(chatId, menuTemplates.animal.buttons);
}

async function sendMenu(chatId, keyboard) {
  await sendMessage(
    chatId,
    "⚠️ WARNING ⚠️\n\n*Don't Delete Bot Otherwise You Lost Bot Access Soon 👋*",
    keyboard
  );
}

async function sendVBMenu(chatId) {
  const keyboard = [
    ["🌺 CP", "🇮🇳 Desi"],
    ["🇬🇧 Forener", "🐕‍🦺 Animal"],
    ["💕 Webseries", "💑 Gay Cp"],
    ["💸 𝘽𝙐𝙔 𝙑𝙄𝙋 💸"]
  ];
  await sendMessage(chatId, "🤗 Welcome to Lx Bot 🌺", keyboard);
}

async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === '/join') {
    await deleteMessage(chatId, callbackQuery.message.message_id);
    await checkChannelMembership(chatId);
  }
}

async function checkChannelMembership(chatId) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHANNEL_USERNAME,
        user_id: chatId
      })
    });

    const result = await response.json();
    const status = result.result?.status;

    if (['member', 'administrator', 'creator'].includes(status)) {
      await sendVBMenu(chatId);
    } else {
      await sendMessage(chatId, "❌ Must join all channel\n@kajal_developer");
    }
  } catch (error) {
    console.error('Membership check failed:', error);
  }
}

// Utility Functions
async function sendPhoto(chatId, photoUrl, caption, buttons) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption: caption,
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: buttons }
      })
    });
  } catch (error) {
    console.error('Error sending photo:', error);
  }
}

async function sendMessage(chatId, text, keyboard = null) {
  try {
    const payload = {
      chat_id: chatId,
      text: text,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true
    };

    if (keyboard) {
      payload.reply_markup = {
        keyboard: keyboard.map(row => row.map(text => ({ text }))),
        resize_keyboard: true,
        one_time_keyboard: true
      };
    }

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function deleteMessage(chatId, messageId) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId
      })
    });
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}

async function sendPhotos(chatId) {
    const photoUrls = [
        "https://t.me/kajal_developer/58",
        "https://t.me/kajal_developer/58",
        "https://t.me/kajal_developer/58",
        "https://example.com/photo4.jpg",
        "https://example.com/photo5.jpg",
        "https://example.com/photo6.jpg",
        "https://example.com/photo7.jpg",
        "https://example.com/photo8.jpg",
        "https://example.com/photo9.jpg",
        "https://example.com/photo10.jpg",
        "https://example.com/photo11.jpg",
        "https://example.com/photo12.jpg"
    ];

    const channelName = "pornhub_Developer"; // Replace with your channel username
    const buttons = [
        [
            {
                text: "Join " + channelName,
                url: "https://t.me/" + channelName
            }
        ]
    ];

    for (let i = 0; i < photoUrls.length; i++) {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                photo: photoUrls[i],
                reply_markup: { inline_keyboard: buttons }
            })
        });
    }
  }
