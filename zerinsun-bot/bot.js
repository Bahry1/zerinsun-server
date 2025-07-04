require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const userId = ctx.from.id;
  const referralLink = `https://t.me/ZerinSunBot?start=${userId}`;

  // ارسال تصویر خوش‌آمد با کپشن دوزبانه
  ctx.replyWithPhoto(
    { url: "https://i.ibb.co/cSS043xG/sun-icon.png" },
    {
      caption:
        "🌞 Welcome to ZerinSun — where every click fuels community-powered growth!\n\nJoin us on a journey of collaboration and creativity.\nThis isn’t just an app — it’s a movement built by people like you.\n✨ Love it? Don’t keep it to yourself — invite your friends and be part of the sun-powered future.\n\n———\n\n☀️ به زرین‌سون خوش اومدی! جایی که هر کلیک، به رشد جمعی نیرو می‌ده.\n\nبا ما همراه شو تو یه سفر خلاقانه و گروهی.\nاین فقط یه اپ نیست—یه جنبشه که با کمک آدم‌هایی مثل تو ساخته می‌شه.\n✨ اگر لذت بردی، به دوستاتم بگو؛ خورشید رو با هم بسازیم."
    }
  );

  // نمایش کیبورد با دکمه‌های Play و Invite
  ctx.reply("👇 Select an option / یک گزینه انتخاب کن:", {
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
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});

// هندل کردن دکمه Invite friends
bot.hears("📨 Invite friends", (ctx) => {
  const userId = ctx.from.id;
  const referralLink = `https://t.me/ZerinSunBot?start=${userId}`;

  ctx.reply(
    `🎁 Here's your personal invite link:\n${referralLink}\n\n✨ Share it with friends to help grow the ZerinSun community!`
  );
});

bot.launch();
