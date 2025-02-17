const BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
const CHANNEL_USERNAME = "@kaja_developer";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/`;

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
      case '/ping':
        await sendPingMessage(chatId);
        break;
      default:
        if(text.startsWith('/')) await sendMessage(chatId, "❌ Unrecognized command");
        else await handleMenuSelection(text, chatId); // Handle menu selections dynamically
    }
  } catch (error) {
    console.error(`Error handling message: ${error}`);
  }
}

// Dynamic menu handler
async function handleMenuSelection(text, chatId) {
  const menuMap = {
    '🌺 CP': 'cp',
    '🇮🇳 Desi': 'desi',
    '💦 Desi': 'desi1',
    '👹 Netflix': 'netflix',
    '🌸 Video Access': 'videoaccess',
    '🙎🏻‍♀️ Fingering': 'fingering',
    'Foto 😍💦': 'foto',
    '🇬🇧 Forener': 'foreigner',
    '💕 Webseries': 'webseries',
    '💑 Gay Cp': 'gaycp',
    '🐕‍🦺 Animal': 'animal',
  };

  if (menuMap[text]) {
    await sendMenu(chatId, menuMap[text]);
  } else {
    await sendMessage(chatId, "❌ Invalid selection.");
  }
}

// Send dynamic menu
async function sendMenu(chatId, menuType) {
  const menu = menuTemplates[menuType];
  if (!menu) return await sendMessage(chatId, "❌ Menu not found.");

  const buttons = menu.buttons.map(buttonRow => {
    return buttonRow.map(text => ({ text, callback_data: text }));
  });

  await sendInlineKeyboard(chatId, buttons);
}

// Send Start Message with Inline Buttons
async function sendStartMessage(chatId) {
  const buttons = [
    [{ text: "👨‍💻 ᴅᴇᴠᴇʟᴏᴘᴇʀ", url: "tg://openmessage?user_id=7825674005" }],
    [{ text: "🚀ᴊᴏɪɴ🚀", url: "https://t.me/Sx_developer" }],
    [{ text: "🚀ᴊᴏɪɴ🚀", url: "https://t.me/Sx_developer_Bots" }],
    [{ text: "🔄 Verify", callback_data: "/join" }]
  ];

  await sendPhoto(
    chatId,
    "https://t.me/kajal_developer/9",
    "🙋‍♂ 𝐖𝐡𝐚𝐭𝐬'𝐮𝐩 *" + user.first_name + "\n*➖➖➖➖➖➖➖➖➖➖➖\n⌛ Jᴏɪɴ Aʟʟ Cʜᴀɴɴᴇʟs Aɴᴅ Cʟɪᴄᴋ Oɴ Jᴏɪɴᴇᴅ Tᴏ Sᴛᴀʀᴛ Oᴜʀ Bᴏᴛ",
    buttons
  );
}

// Send Inline Keyboard
async function sendInlineKeyboard(chatId, buttons) {
  const payload = {
    chat_id: chatId,
    reply_markup: { inline_keyboard: buttons }
  };

  await fetch(`${TELEGRAM_API_URL}sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

// Generic sendMessage
async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API_URL}sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

// Menu Handlers for different video categories
const menuTemplates = {
  cp: { buttons: createVideoButtons('🌺', 100) },
  desi: { buttons: createVideoButtons('🇮🇳', 100) },
  foreigner: { buttons: createVideoButtons('🇬🇧', 100) },
  webseries: { buttons: createVideoButtons('💕', 100) },
  netflix: { buttons: createNetflixMenu() },
  videoaccess: { buttons: createVideoAccessMenu() },
  gaycp: { buttons: createVideoButtons('💑', 100) }
};

function createVideoButtons(prefix, count) {
  const buttons = [];
  for (let i = 1; i <= count; i++) {
    buttons.push([`${prefix} Video ${i}`, `${prefix} Video ${i + 1}`]);
    i++;
  }
  buttons.push(["» ⚜️ Back 🔙"]);
  return buttons;
}

function createNetflixMenu() {
  return [
    ["👹 Netflix 👹", "❤️ Satisfied ❤️"],
    ["💡 Enjoy 🥹", "🥳 Best Hub 🥳"],
    ["💼 Engage 🙈", "🤍 White 🤍"],
    ["💕 Love 💕", "💸 𝘽𝙐𝙔 𝙑𝙄𝙋 💸"],
    ["» ⚜️ Back 🇬🇧🔙"]
  ];
}

function createVideoAccessMenu() {
  return [
    ["🌸 Video Access 1", "🌸 Video Access 2"],
    ["🌸 Video Access 3", "🌸 Video Access 4"],
    ["🌸 Video Access 5", "🌸 Video Access 6"],
    ["🌸 Video Access 7", "🌸 Video Access 8"],
    ["🌸 Video Access 9", "🌸 Video Access 10"],
    ["🌸 Video Access 11", "🌸 Video Access 12"],
    ["🌸 Video Access 13", "🌸 Video Access 14"],
    ["» ⚜️ Back 🇬🇧🔙"]
  ];
}
        
