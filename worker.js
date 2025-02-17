const BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
const CHANNEL_USERNAME = "@kajal_developer";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

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
        // Pass message.from so we can use the sender's first name.
        await sendStartMessage(chatId, message.from);
        break;
      case '/ping':
        await sendPingMessage(chatId);
        break;
      case '🌺 CP':
        await sendCPMenu(chatId);
        break;
      case '🇮🇳 Desi':
        await sendDesiMenu(chatId);
        break;
      case '💦 Desi':
        await sendDesi1Menu(chatId);
        break;
      case '👹 Netflix':
        await sendNetflixMenu(chatId);
        break;
      case '🌸 Video Access':
        await sendVideoAccessMenu(chatId);
        break;
      case '🙎🏻‍♀️Fingering':
        await sendFingeringMenu(chatId);
        break;
      case 'Foto 😍💦':
        await sendFotoMenu(chatId);
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
      case '» ⚜️ Back ♻️':
      case '» ⚜️ Back ⬅️':
      case '» ⚜️ Back 🇬🇧🔙':
      case '» ⚜️ back 🔙':
      case '» ⚜️ Back 🔙🔙':
      case '» ⚜️ Back 🔚':
        await sendVBMenu(chatId);
        break;
      default:
        if(text.startsWith('/')) await sendMessage(chatId, "❌ Unrecognized command");
    }
  } catch (error) {
    console.error(`Error handling message: ${error}`);
  }
}

// Updated sendStartMessage accepts a user parameter.
async function sendStartMessage(chatId, user) {
  const buttons = [
    [{ text: "👨‍💻 ᴅᴇᴠᴇʟᴏᴘᴇʀ", url: "tg://openmessage?user_id=7825674005" }],
    [{ text: "🚀ᴊᴏɪɴ🚀", url: "https://t.me/Sx_developer" }],
    [{ text: "🚀ᴊᴏɪɴ🚀", url: "https://t.me/Sx_developer_Bots" }],
    [{ text: "🔄 Verify", callback_data: "/join" }]
  ];

  await sendPhoto(
    chatId,
    "https://t.me/kajal_developer/9",
    "🙋‍♂ 𝐖𝐡𝐚𝐭𝐬'𝐮𝐩 *" + (user.first_name || "User") + "\n*➖➖➖➖➖➖➖➖➖➖➖\n⌛ Jᴏɪɴ Aʟʟ Cʜᴀɴɴᴇʟs Aɴᴅ Cʟɪᴄᴋ Oɴ Jᴏɪɴᴇᴅ Tᴏ Sᴛᴀʀᴛ Oᴜʀ Bᴏᴛ",
    buttons
  );
}

// Dummy function for handling mentions.
async function handleMention(message) {
  // Implement mention handling if necessary.
}

// Menu Templates
const menuTemplates = {
  cp: {
    buttons: [
      ["🌺 Video 1", "🌺 Video 2"],
      // ... (other CP buttons)
      ["🌺 Video 99", "🌺 Video 100"],
      ["» ⚜️ Back ♻️"]
    ]
  },
  desi: {
    buttons: [
      ["🇮🇳 video 1", "🇮🇳 video 2"],
      // ... (other Desi buttons)
      ["🇮🇳 video 99", "🇮🇳 video 100"],
      ["» ⚜️ Back ⬅️"]
    ]
  },
  foreigner: {
    buttons: [
      ["🇬🇧 Video 1", "🇬🇧 Video 2"],
      // ... (other Foreigner buttons)
      ["🇬🇧 Video 99", "🇬🇧 Video 100"],
      ["» ⚜️ Back 🇬🇧🔙"]
    ]
  },
  webseries: {
    buttons: [
      ["💕 Video 1", "💕 Video 2"],
      // ... (other Webseries buttons)
      ["💕 Video 99", "💕 Video 100"],
      ["» ⚜️ back 🔙"]
    ]
  },
  netflix: {
    buttons: [
      ["👹 Netflix 👹", "❤️ Satisfied ❤️"],
      ["💡 Enjoy 🥹", "🥳 Best Hub 🥳"],
      ["💼 Engage 🙈", "🤍 White 🤍"],
      ["💕 Love 💕", "💸 𝘽𝙐𝙔 𝙑𝙄𝙋 💸"],
      ["» ⚜️ Back 🇬🇧🔙"]
    ]
  },
  videoaccess: {
    buttons: [
      ["🌸 Video Access 1", "🌸 Video Access 2"],
      // ... (other Video Access buttons)
      ["🌸 Video Access 13", "🌸 Video Access 14"],
      ["🌸 Video Access 15"],
      ["» ⚜️ Back 🇬🇧🔙"]
    ]
  },
  gaycp: {
    buttons: [
      ["💑 Video 1", "💑 Video 2"],
      // ... (other Gay CP buttons)
      ["💑 Video 99", "💑 Video 100"],
      ["» ⚜️ Back 🔙🔙"]
    ]
  },
  desi1: {
    buttons: [
      ["💦 Video 1", "💦 Video 2"],
      // ... (other Desi1 buttons)
      ["💦 Video 99", "💦 Video 100"],
      ["» ⚜️ Back 🔙🔙"]
    ]
  },
  animal: {
    buttons: [
      ["🐕‍🦺 Video 1", "🐕‍🦺 Video 2"],
      // ... (other Animal buttons)
      ["🐕‍🦺 Video 99", "🐕‍🦺 Video 100"],
      ["» ⚜️ Back 🔚"]
    ]
  },
  // Added missing "foto" template.
  foto: {
    buttons: [
      ["Foto 1", "Foto 2"],
      ["Foto 3", "Foto 4"],
      ["» ⚜️ Back ♻️"]
    ]
  }
};

async function sendCPMenu(chatId) {
  await sendMenu(chatId, menuTemplates.cp.buttons);
}

async function sendDesiMenu(chatId) {
  await sendMenu(chatId, menuTemplates.desi.buttons);
}

async function sendDesi1Menu(chatId) {
  await sendMenu(chatId, menuTemplates.desi1.buttons);
}

async function sendNetflixMenu(chatId) {
  await sendMenu(chatId, menuTemplates.netflix.buttons);
}

async function sendVideoAccessMenu(chatId) {
  await sendMenu(chatId, menuTemplates.videoaccess.buttons);
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

async function sendFotoMenu(chatId) {
  await sendMenu(chatId, menuTemplates.foto.buttons);
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
    ["Foto 😍💦", "🙎🏻‍♀️Fingering"],
    ["💦 Desi", "🌸 Video Access"],
    ["👹 Netflix", "🔄 Sx"]
  ];
  await sendMessage(chatId, "🤗 Welcome to Sx Bot 1.0.3 🌺", keyboard);
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
    const response = await fetch(`${TELEGRAM_API_URL}getChatMember`, {
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
    await fetch(`${TELEGRAM_API_URL}sendPhoto`, {
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

    await fetch(`${TELEGRAM_API_URL}sendMessage`, {
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
    await fetch(`${TELEGRAM_API_URL}deleteMessage`, {
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
