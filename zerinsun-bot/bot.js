require("dotenv").config();
const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const referralLink = `https://t.me/ZerinSunBot?start=${userId}`;

  // Wake up server
  try {
    await fetch("https://bahry1.onrender.com/healthz");
    console.log("✅ Render server is awake!");
  } catch (err) {
    console.error("⚠️ Failed to wake Render server:", err);
  }

  // Welcome message with image
  await ctx.replyWithPhoto(
    { url: "https://i.ibb.co/cSS043xG/sun-icon.png" },
    {
      caption: `🌞 Welcome to ZerinSun — where every click fuels community-powered growth!

Join us on a journey of collaboration and creativity.
This isn’t just an app — it’s a movement built by people like you.
✨ Love it? Don’t keep it to yourself — invite your friends and be part of the sun-powered future.

———

☀️ به زرین‌سون خوش اومدی! جایی که هر کلیک، به رشد جمعی نیرو می‌ده.

با ما همراه شو تو یه سفر خلاقانه و گروهی.
این فقط یه اپ نیست—یه جنبشه که با کمک آدم‌هایی مثل تو ساخته می‌شه.
✨ اگر لذت بردی، به دوستاتم بگو؛ خورشید رو با هم بسازیم.`
    }
  );

  // Keyboard with Play and Invite
  await ctx.reply("👇 Select an option / یک گزینه انتخاب کن:", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "▶️ Play / شروع",
            web_app: {
              url: "https://bahry1.onrender.com"
            }
          }
        ],
        ["📨 Invite friends"]
      ],
      resize_keyboard: true
    }
  });
});

bot.hears("📨 Invite friends", (ctx) => {
  const userId = ctx.from.id;
  const referralLink = `https://t.me/ZerinSunBot?start=${userId}`;
  ctx.reply(`🔗 Your personal invite link:\n${referralLink}`);
});

bot.launch();
console.log("🤖 ZerinSunBot is running...");
