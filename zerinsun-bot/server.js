const express = require("express");
const app = express();

// 🔹 سرو فایل‌های static مثل index.html و style.css
app.use(express.static("public"));

// 🔸 پاسخ ساده در آدرس اصلی
app.get("/", (req, res) => {
  res.send("ZerinSunBot is running ☀️");
});

// 🟢 گوش دادن روی پورت
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Express server is running on port ${PORT}`);
});
