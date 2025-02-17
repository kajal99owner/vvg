const BOT_TOKEN = "7796187337:AAF-aOcWJzQljSl6RS61ex_htwdzFPt2FvI";
const CHANNEL_USERNAME = "@kajal_developer";
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
//SUMIT ⚡ Developer 2.0 </>
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
    "🙋‍♂ 𝐖𝐡𝐚𝐭𝐬'𝐮𝐩 *" + (user.first_name || "User") + "\n*➖➖➖➖➖➖➖➖➖➖➖\n⌛ Jᴏɪɴ Aʟʟ Cʜᴀɴɴᴇʟs Aɴᴅ Cʟɪᴄᴋ Oɴ Jᴏɪɴᴇᴅ Tᴏ Sᴛᴀʀᴛ Oᴜʀ Bᴏᴛ",
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
      ["🌺 Video 11", "🌺 Video 12"],
      ["🌺 Video 13", "🌺 Video 14"],
      ["🌺 Video 15", "🌺 Video 16"],
      ["🌺 Video 17", "🌺 Video 18"],
      ["🌺 Video 19", "🌺 Video 20"],
      ["🌺 Video 21", "🌺 Video 22"],
      ["🌺 Video 23", "🌺 Video 24"],
      ["🌺 Video 25", "🌺 Video 26"],
      ["🌺 Video 27", "🌺 Video 28"],
      ["🌺 Video 29", "🌺 Video 30"],
      ["🌺 Video 31", "🌺 Video 32"],
      ["🌺 Video 33", "🌺 Video 34"],
      ["🌺 Video 35", "🌺 Video 36"],
      ["🌺 Video 37", "🌺 Video 38"],
      ["🌺 Video 39", "🌺 Video 40"],
      ["🌺 Video 41", "🌺 Video 42"],
      ["🌺 Video 43", "🌺 Video 44"],
      ["🌺 Video 45", "🌺 Video 46"],
      ["🌺 Video 47", "🌺 Video 48"],
      ["🌺 Video 49", "🌺 Video 50"],
      ["🌺 Video 51", "🌺 Video 52"],
      ["🌺 Video 53", "🌺 Video 54"],
      ["🌺 Video 55", "🌺 Video 56"],
      ["🌺 Video 57", "🌺 Video 58"],
      ["🌺 Video 59", "🌺 Video 60"],
      ["🌺 Video 61", "🌺 Video 62"],
      ["🌺 Video 63", "🌺 Video 64"],
      ["🌺 Video 65", "🌺 Video 66"],
      ["🌺 Video 67", "🌺 Video 68"],
      ["🌺 Video 69", "🌺 Video 70"],
      ["🌺 Video 71", "🌺 Video 72"],
      ["🌺 Video 73", "🌺 Video 74"],
      ["🌺 Video 75", "🌺 Video 76"],
      ["🌺 Video 77", "🌺 Video 78"],
      ["🌺 Video 79", "🌺 Video 80"],
      ["🌺 Video 81", "🌺 Video 82"],
      ["🌺 Video 83", "🌺 Video 84"],
      ["🌺 Video 85", "🌺 Video 86"],
      ["🌺 Video 87", "🌺 Video 88"],
      ["🌺 Video 89", "🌺 Video 90"],
      ["🌺 Video 91", "🌺 Video 92"],
      ["🌺 Video 93", "🌺 Video 94"],
      ["🌺 Video 95", "🌺 Video 96"],
      ["🌺 Video 97", "🌺 Video 98"],
      ["🌺 Video 99", "🌺 Video 100"],
      ["» ⚜️ Back ♻️"]
    ]
  },
  desi: {
    buttons: [
      ["🇮🇳 video 1", "🇮🇳 video 2"],
      ["🇮🇳 video 3", "🇮🇳 video 4"],
      ["🇮🇳 video 5", "🇮🇳 video 6"],
      ["🇮🇳 video 7", "🇮🇳 video 8"],
      ["🇮🇳 video 9", "🇮🇳 video 10"],
      ["🇮🇳 video 11", "🇮🇳 video 12"],
      ["🇮🇳 video 13", "🇮🇳 video 14"],
      ["🇮🇳 video 15", "🇮🇳 video 16"],
      ["🇮🇳 video 17", "🇮🇳 video 18"],
      ["🇮🇳 video 19", "🇮🇳 video 20"],
      ["🇮🇳 video 21", "🇮🇳 video 22"],
      ["🇮🇳 video 23", "🇮🇳 video 24"],
      ["🇮🇳 video 25", "🇮🇳 video 26"],
      ["🇮🇳 video 27", "🇮🇳 video 28"],
      ["🇮🇳 video 29", "🇮🇳 video 30"],
      ["🇮🇳 video 31", "🇮🇳 video 32"],
      ["🇮🇳 video 33", "🇮🇳 video 34"],
      ["🇮🇳 video 35", "🇮🇳 video 36"],
      ["🇮🇳 video 37", "🇮🇳 video 38"],
      ["🇮🇳 video 39", "🇮🇳 video 40"],
      ["🇮🇳 video 41", "🇮🇳 video 42"],
      ["🇮🇳 video 43", "🇮🇳 video 44"],
      ["🇮🇳 video 45", "🇮🇳 video 46"],
      ["🇮🇳 video 47", "🇮🇳 video 48"],
      ["🇮🇳 video 49", "🇮🇳 video 50"],
      ["🇮🇳 video 51", "🇮🇳 video 52"],
      ["🇮🇳 video 53", "🇮🇳 video 54"],
      ["🇮🇳 video 55", "🇮🇳 video 56"],
      ["🇮🇳 video 57", "🇮🇳 video 58"],
      ["🇮🇳 video 59", "🇮🇳 video 60"],
      ["🇮🇳 video 61", "🇮🇳 video 62"],
      ["🇮🇳 video 63", "🇮🇳 video 64"],
      ["🇮🇳 video 65", "🇮🇳 video 66"],
      ["🇮🇳 video 67", "🇮🇳 video 68"],
      ["🇮🇳 video 69", "🇮🇳 video 70"],
      ["🇮🇳 video 71", "🇮🇳 video 72"],
      ["🇮🇳 video 73", "🇮🇳 video 74"],
      ["🇮🇳 video 75", "🇮🇳 video 76"],
      ["🇮🇳 video 77", "🇮🇳 video 78"],
      ["🇮🇳 video 79", "🇮🇳 video 80"],
      ["🇮🇳 video 81", "🇮🇳 video 82"],
      ["🇮🇳 video 83", "🇮🇳 video 84"],
      ["🇮🇳 video 85", "🇮🇳 video 86"],
      ["🇮🇳 video 87", "🇮🇳 video 88"],
      ["🇮🇳 video 89", "🇮🇳 video 90"],
      ["🇮🇳 video 91", "🇮🇳 video 92"],
      ["🇮🇳 video 93", "🇮🇳 video 94"],
      ["🇮🇳 video 95", "🇮🇳 video 96"],
      ["🇮🇳 video 97", "🇮🇳 video 98"],
      ["🇮🇳 video 99", "🇮🇳 video 100"],
      ["» ⚜️ Back ⬅️"]
    ]
  },
  foreigner: {
    buttons: [
      ["🇬🇧 Video 1", "🇬🇧 Video 2"],
      ["🇬🇧 Video 3", "🇬🇧 Video 4"],
      ["🇬🇧 Video 5", "🇬🇧 Video 6"],
      ["🇬🇧 Video 7", "🇬🇧 Video 8"],
      ["🇬🇧 Video 9", "🇬🇧 Video 10"],
      ["🇬🇧 Video 1", "🇬🇧 Video 2"],
      ["🇬🇧 Video 3", "🇬🇧 Video 4"],
      ["🇬🇧 Video 5", "🇬🇧 Video 6"],
      ["🇬🇧 Video 7", "🇬🇧 Video 8"],
      ["🇬🇧 Video 9", "🇬🇧 Video 10"],
      ["🇬🇧 Video 11", "🇬🇧 Video 12"],
      ["🇬🇧 Video 13", "🇬🇧 Video 14"],
      ["🇬🇧 Video 15", "🇬🇧 Video 16"],
      ["🇬🇧 Video 17", "🇬🇧 Video 18"],
      ["🇬🇧 Video 19", "🇬🇧 Video 20"],
      ["🇬🇧 Video 21", "🇬🇧 Video 22"],
      ["🇬🇧 Video 23", "🇬🇧 Video 24"],
      ["🇬🇧 Video 25", "🇬🇧 Video 26"],
      ["🇬🇧 Video 27", "🇬🇧 Video 28"],
      ["🇬🇧 Video 29", "🇬🇧 Video 30"],
      ["🇬🇧 Video 31", "🇬🇧 Video 32"],
      ["🇬🇧 Video 33", "🇬🇧 Video 34"],
      ["🇬🇧 Video 35", "🇬🇧 Video 36"],
      ["🇬🇧 Video 37", "🇬🇧 Video 38"],
      ["🇬🇧 Video 39", "🇬🇧 Video 40"],
      ["🇬🇧 Video 41", "🇬🇧 Video 42"],
      ["🇬🇧 Video 43", "🇬🇧 Video 44"],
      ["🇬🇧 Video 45", "🇬🇧 Video 46"],
      ["🇬🇧 Video 47", "🇬🇧 Video 48"],
      ["🇬🇧 Video 49", "🇬🇧 Video 50"],
      ["🇬🇧 Video 51", "🇬🇧 Video 52"],
      ["🇬🇧 Video 53", "🇬🇧 Video 54"],
      ["🇬🇧 Video 55", "🇬🇧 Video 56"],
      ["🇬🇧 Video 57", "🇬🇧 Video 58"],
      ["🇬🇧 Video 59", "🇬🇧 Video 60"],
      ["🇬🇧 Video 61", "🇬🇧 Video 62"],
      ["🇬🇧 Video 63", "🇬🇧 Video 64"],
      ["🇬🇧 Video 65", "🇬🇧 Video 66"],
      ["🇬🇧 Video 67", "🇬🇧 Video 68"],
      ["🇬🇧 Video 69", "🇬🇧 Video 70"],
      ["🇬🇧 Video 71", "🇬🇧 Video 72"],
      ["🇬🇧 Video 73", "🇬🇧 Video 74"],
      ["🇬🇧 Video 75", "🇬🇧 Video 76"],
      ["🇬🇧 Video 77", "🇬🇧 Video 78"],
      ["🇬🇧 Video 79", "🇬🇧 Video 80"],
      ["🇬🇧 Video 81", "🇬🇧 Video 82"],
      ["🇬🇧 Video 83", "🇬🇧 Video 84"],
      ["🇬🇧 Video 85", "🇬🇧 Video 86"],
      ["🇬🇧 Video 87", "🇬🇧 Video 88"],
      ["🇬🇧 Video 89", "🇬🇧 Video 90"],
      ["🇬🇧 Video 91", "🇬🇧 Video 92"],
      ["🇬🇧 Video 93", "🇬🇧 Video 94"],
      ["🇬🇧 Video 95", "🇬🇧 Video 96"],
      ["🇬🇧 Video 97", "🇬🇧 Video 98"],
      ["🇬🇧 Video 99", "🇬🇧 Video 100"],
      ["» ⚜️ Back 🇬🇧🔙"]
    ]
  },
  webseries: {
    buttons: [
      ["💕 Video 1", "💕 Video 2"],
      ["💕 Video 3", "💕 Video 4"],
      ["💕 Video 5", "💕 Video 6"],
      ["💕 Video 7", "💕 Video 8"],
      ["💕 Video 9", "💕 Video 10"],
      ["💕 Video 11", "💕 Video 12"],
      ["💕 Video 13", "💕 Video 14"],
      ["💕 Video 15", "💕 Video 16"],
      ["💕 Video 17", "💕 Video 18"],
      ["💕 Video 19", "💕 Video 20"],
      ["💕 Video 21", "💕 Video 22"],
      ["💕 Video 23", "💕 Video 24"],
      ["💕 Video 25", "💕 Video 26"],
      ["💕 Video 27", "💕 Video 28"],
      ["💕 Video 29", "💕 Video 30"],
      ["💕 Video 31", "💕 Video 32"],
      ["💕 Video 33", "💕 Video 34"],
      ["💕 Video 35", "💕 Video 36"],
      ["💕 Video 37", "💕 Video 38"],
      ["💕 Video 39", "💕 Video 40"],
      ["💕 Video 41", "💕 Video 42"],
      ["💕 Video 43", "💕 Video 44"],
      ["💕 Video 45", "💕 Video 46"],
      ["💕 Video 47", "💕 Video 48"],
      ["💕 Video 49", "💕 Video 50"],
      ["💕 Video 41", "💕 Video 52"],
      ["💕 Video 53", "💕 Video 54"],
      ["💕 Video 55", "💕 Video 56"],
      ["💕 Video 57", "💕 Video 58"],
      ["💕 Video 59", "💕 Video 60"],
      ["💕 Video 61", "💕 Video 62"],
      ["💕 Video 63", "💕 Video 64"],
      ["💕 Video 65", "💕 Video 66"],
      ["💕 Video 67", "💕 Video 68"],
      ["💕 Video 69", "💕 Video 70"],
      ["💕 Video 71", "💕 Video 72"],
      ["💕 Video 73", "💕 Video 74"],
      ["💕 Video 75", "💕 Video 76"],
      ["💕 Video 77", "💕 Video 78"],
      ["💕 Video 79", "💕 Video 80"],
      ["💕 Video 81", "💕 Video 82"],
      ["💕 Video 83", "💕 Video 84"],
      ["💕 Video 85", "💕 Video 86"],
      ["💕 Video 87", "💕 Video 88"],
      ["💕 Video 89", "💕 Video 90"],
      ["💕 Video 91", "💕 Video 92"],
      ["💕 Video 93", "💕 Video 94"],
      ["💕 Video 95", "💕 Video 96"],
      ["💕 Video 97", "💕 Video 98"],
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
      ["🌸 Video Access 3", "🌸 Video Access 4"],
      ["🌸 Video Access 5", "🌸 Video Access 6"],
      ["🌸 Video Access 7", "🌸 Video Access 8"],
      ["🌸 Video Access 9", "🌸 Video Access 10"],
      ["🌸 Video Access 11", "🌸 Video Access 12"],
      ["🌸 Video Access 13", "🌸 Video Access 14"],
      ["🌸 Video Access 15"],
      ["» ⚜️ Back 🇬🇧🔙"]
    ]
  },
  gaycp: {
    buttons: [
      ["💑 Video 1", "💑 Video 2"],
      ["💑 Video 3", "💑 Video 4"],
      ["💑 Video 5", "💑 Video 6"],
      ["💑 Video 7", "💑 Video 8"],
      ["💑 Video 9", "💑 Video 10"],
      ["💑 Video 11", "💑 Video 12"],
      ["💑 Video 13", "💑 Video 14"],
      ["💑 Video 15", "💑 Video 16"],
      ["💑 Video 17", "💑 Video 18"],
      ["💑 Video 19", "💑 Video 20"],
      ["💑 Video 21", "💑 Video 22"],
      ["💑 Video 23", "💑 Video 24"],
      ["💑 Video 25", "💑 Video 26"],
      ["💑 Video 27", "💑 Video 28"],
      ["💑 Video 29", "💑 Video 30"],
      ["💑 Video 31", "💑 Video 32"],
      ["💑 Video 33", "💑 Video 34"],
      ["💑 Video 35", "💑 Video 36"],
      ["💑 Video 37", "💑 Video 38"],
      ["💑 Video 39", "💑 Video 40"],
      ["💑 Video 41", "💑 Video 42"],
      ["💑 Video 43", "💑 Video 44"],
      ["💑 Video 45", "💑 Video 46"],
      ["💑 Video 47", "💑 Video 48"],
      ["💑 Video 49", "💑 Video 50"],
      ["💑 Video 51", "💑 Video 52"],
      ["💑 Video 53", "💑 Video 54"],
      ["💑 Video 55", "💑 Video 56"],
      ["💑 Video 57", "💑 Video 58"],
      ["💑 Video 59", "💑 Video 60"],
      ["💑 Video 61", "💑 Video 62"],
      ["💑 Video 63", "💑 Video 64"],
      ["💑 Video 65", "💑 Video 66"],
      ["💑 Video 67", "💑 Video 68"],
      ["💑 Video 69", "💑 Video 70"],
      ["💑 Video 71", "💑 Video 72"],
      ["💑 Video 73", "💑 Video 74"],
      ["💑 Video 75", "💑 Video 76"],
      ["💑 Video 77", "💑 Video 78"],
      ["💑 Video 79", "💑 Video 80"],
      ["💑 Video 81", "💑 Video 82"],
      ["💑 Video 83", "💑 Video 84"],
      ["💑 Video 85", "💑 Video 86"],
      ["💑 Video 87", "💑 Video 88"],
      ["💑 Video 89", "💑 Video 90"],
      ["💑 Video 91", "💑 Video 92"],
      ["💑 Video 93", "💑 Video 94"],
      ["💑 Video 95", "💑 Video 96"],
      ["💑 Video 97", "💑 Video 98"],
      ["💑 Video 99", "💑 Video 100"],
      ["» ⚜️ Back 🔙🔙"]
    ]
  },
  desi1: {
    buttons: [
      ["💦 Video 1", "💦 Video 2"],
      ["💦 Video 3", "💦 Video 4"],
      ["💦 Video 5", "💦 Video 6"],
      ["💦 Video 7", "💦 Video 8"],
      ["💦 Video 9", "💦 Video 10"],
      ["💦 Video 11", "💦 Video 12"],
      ["💦 Video 13", "💦 Video 14"],
      ["💦 Video 15", "💦 Video 16"],
      ["💦 Video 17", "💦 Video 18"],
      ["💦 Video 19", "💦 Video 20"],
      ["💦 Video 21", "💦 Video 22"],
      ["💦 Video 23", "💦 Video 24"],
      ["💦 Video 25", "💦 Video 26"],
      ["💦 Video 27", "💦 Video 28"],
      ["💦 Video 29", "💦 Video 30"],
      ["💦 Video 31", "💦 Video 32"],
      ["💦 Video 33", "💦 Video 34"],
      ["💦 Video 35", "💦 Video 36"],
      ["💦 Video 37", "💦 Video 38"],
      ["💦 Video 39", "💦 Video 40"],
      ["💦 Video 41", "💦 Video 42"],
      ["💦 Video 43", "💦 Video 44"],
      ["💦 Video 45", "💦 Video 46"],
      ["💦 Video 47", "💦 Video 48"],
      ["💦 Video 49", "💦 Video 50"],
      ["💦 Video 51", "💦 Video 52"],
      ["💦 Video 53", "💦 Video 54"],
      ["💦 Video 55", "💦 Video 56"],
      ["💦 Video 57", "💦 Video 58"],
      ["💦 Video 59", "💦 Video 60"],
      ["💦 Video 61", "💦 Video 62"],
      ["💦 Video 63", "💦 Video 64"],
      ["💦 Video 65", "💦 Video 66"],
      ["💦 Video 67", "💦 Video 68"],
      ["💦 Video 69", "💦 Video 70"],
      ["💦 Video 71", "💦 Video 72"],
      ["💦 Video 73", "💦 Video 74"],
      ["💦 Video 75", "💦 Video 76"],
      ["💦 Video 77", "💦 Video 78"],
      ["💦 Video 79", "💦 Video 80"],
      ["💦 Video 81", "💦 Video 82"],
      ["💦 Video 83", "💦 Video 84"],
      ["💦 Video 85", "💦 Video 86"],
      ["💦 Video 87", "💦 Video 88"],
      ["💦 Video 89", "💦 Video 90"],
      ["💦 Video 91", "💦 Video 92"],
      ["💦 Video 93", "💦 Video 94"],
      ["💦 Video 95", "💦 Video 96"],
      ["💦 Video 97", "💦 Video 98"],
      ["💦 Video 99", "💦 Video 100"],
      ["» ⚜️ Back 🔙🔙"]
    ]
  },
  animal: {
    buttons: [
      ["🐕‍🦺 Video 1", "🐕‍🦺 Video 2"],
      ["🐕‍🦺 Video 3", "🐕‍🦺 Video 4"],
      ["🐕‍🦺 Video 5", "🐕‍🦺 Video 6"],
      ["🐕‍🦺 Video 7", "🐕‍🦺 Video 8"],
      ["🐕‍🦺 Video 9", "🐕‍🦺 Video 10"],
      ["🐕‍🦺 Video 11", "🐕‍🦺 Video 12"],
      ["🐕‍🦺 Video 13", "🐕‍🦺 Video 14"],
      ["🐕‍🦺 Video 15", "🐕‍🦺 Video 16"],
      ["🐕‍🦺 Video 17", "🐕‍🦺 Video 18"],
      ["🐕‍🦺 Video 19", "🐕‍🦺 Video 20"],
      ["🐕‍🦺 Video 21", "🐕‍🦺 Video 22"],
      ["🐕‍🦺 Video 23", "🐕‍🦺 Video 24"],
      ["🐕‍🦺 Video 25", "🐕‍🦺 Video 26"],
      ["🐕‍🦺 Video 27", "🐕‍🦺 Video 28"],
      ["🐕‍🦺 Video 29", "🐕‍🦺 Video 30"],
      ["🐕‍🦺 Video 31", "🐕‍🦺 Video 32"],
      ["🐕‍🦺 Video 33", "🐕‍🦺 Video 34"],
      ["🐕‍🦺 Video 35", "🐕‍🦺 Video 36"],
      ["🐕‍🦺 Video 37", "🐕‍🦺 Video 38"],
      ["🐕‍🦺 Video 39", "🐕‍🦺 Video 40"],
      ["🐕‍🦺 Video 41", "🐕‍🦺 Video 42"],
      ["🐕‍🦺 Video 43", "🐕‍🦺 Video 44"],
      ["🐕‍🦺 Video 45", "🐕‍🦺 Video 46"],
      ["🐕‍🦺 Video 47", "🐕‍🦺 Video 48"],
      ["🐕‍🦺 Video 49", "🐕‍🦺 Video 50"],
      ["🐕‍🦺 Video 51", "🐕‍🦺 Video 52"],
      ["🐕‍🦺 Video 53", "🐕‍🦺 Video 54"],
      ["🐕‍🦺 Video 55", "🐕‍🦺 Video 56"],
      ["🐕‍🦺 Video 57", "🐕‍🦺 Video 58"],
      ["🐕‍🦺 Video 59", "🐕‍🦺 Video 60"],
      ["🐕‍🦺 Video 61", "🐕‍🦺 Video 62"],
      ["🐕‍🦺 Video 63", "🐕‍🦺 Video 64"],
      ["🐕‍🦺 Video 65", "🐕‍🦺 Video 66"],
      ["🐕‍🦺 Video 67", "🐕‍🦺 Video 68"],
      ["🐕‍🦺 Video 69", "🐕‍🦺 Video 70"],
      ["🐕‍🦺 Video 71", "🐕‍🦺 Video 72"],
      ["🐕‍🦺 Video 73", "🐕‍🦺 Video 74"],
      ["🐕‍🦺 Video 75", "🐕‍🦺 Video 76"],
      ["🐕‍🦺 Video 77", "🐕‍🦺 Video 78"],
      ["🐕‍🦺 Video 79", "🐕‍🦺 Video 80"],
      ["🐕‍🦺 Video 81", "🐕‍🦺 Video 82"],
      ["🐕‍🦺 Video 83", "🐕‍🦺 Video 84"],
      ["🐕‍🦺 Video 85", "🐕‍🦺 Video 86"],
      ["🐕‍🦺 Video 87", "🐕‍🦺 Video 88"],
      ["🐕‍🦺 Video 89", "🐕‍🦺 Video 90"],
      ["🐕‍🦺 Video 91", "🐕‍🦺 Video 92"],
      ["🐕‍🦺 Video 93", "🐕‍🦺 Video 94"],
      ["🐕‍🦺 Video 95", "🐕‍🦺 Video 96"],
      ["🐕‍🦺 Video 97", "🐕‍🦺 Video 98"],
      ["🐕‍🦺 Video 99", "🐕‍🦺 Video 100"],
      ["» ⚜️ Back 🔚"]
    ]
  }
};
//SUMIT ⚡ Developer 2.0 </>
async function sendCPMenu(chatId) {
  await sendMenu(chatId, menuTemplates.cp.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendDesiMenu(chatId) {
  await sendMenu(chatId, menuTemplates.desi.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendDesi1Menu(chatId) {
  await sendMenu(chatId, menuTemplates.desi1.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendNetflixMenu(chatId) {
  await sendMenu(chatId, menuTemplates.netflix.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendVideoAccessMenu(chatId) {
  await sendMenu(chatId, menuTemplates.videoaccess.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendForeignerMenu(chatId) {
  await sendMenu(chatId, menuTemplates.foreigner.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendWebseriesMenu(chatId) {
  await sendMenu(chatId, menuTemplates.webseries.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendGayCpMenu(chatId) {
  await sendMenu(chatId, menuTemplates.gaycp.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendAnimalMenu(chatId) {
  await sendMenu(chatId, menuTemplates.animal.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendFotoMenu(chatId) {
  await sendMenu(chatId, menuTemplates.foto.buttons);
}
//SUMIT ⚡ Developer 2.0 </>
async function sendMenu(chatId, keyboard) {
  await sendMessage(
    chatId,
    "⚠️ WARNING ⚠️\n\n*Don't Delete Bot Otherwise You Lost Bot Access Soon 👋*",
    keyboard
  );
}
//SUMIT ⚡ Developer 2.0 </>
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
//SUMIT ⚡ Developer 2.0 </>
async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === '/join') {
    await deleteMessage(chatId, callbackQuery.message.message_id);
    await checkChannelMembership(chatId);
  }
}
//SUMIT ⚡ Developer 2.0 </>
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
//SUMIT ⚡ Developer 2.0 </>
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
//SUMIT ⚡ Developer 2.0 </>
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
