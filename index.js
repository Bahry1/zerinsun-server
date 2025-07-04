const { Telegraf } = require("telegraf");

// 👇 توکن رباتتو همینجا وارد کن
const bot = new Telegraf("8030760475:AAGGtt-u9gpKtM7Df49gH4XCUdpEtu52eJM");

bot.start((ctx) => {
  ctx.reply("🌞 به ZerinSun خوش اومدی، Jamshid جان!", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "▶️ Play",
            web_app: {
              url: "https://bahry1.onrender.com"
            }
          }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

bot.launch();
console.log("🚀 ZerinSunBot is running...");
