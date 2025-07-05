const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

let logs = []; // لیست لاگ‌ها در حافظه

app.use(express.json()); // دریافت body به صورت JSON
app.use(express.static(path.join(__dirname, "public")));

// مسیر اصلی — index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// مسیر ثبت لاگ توسط کاربر
app.post("/api/log", (req, res) => {
  const log = req.body;

  // جلوگیری از لاگ‌های تکراری دقیق
  const isDuplicate = logs.some(
    (entry) =>
      entry.userId === log.userId &&
      entry.sun === log.sun &&
      entry.energy === log.energy &&
      entry.tapCount === log.tapCount
  );

  if (!isDuplicate) {
    logs.push({
      ...log,
      timestamp: new Date().toISOString(),
    });
    console.log("📥 Log received:", log);
  } else {
    console.log("⏩ Duplicate log skipped");
  }

  res.status(200).send("Log received");
});

// مسیر admin برای دیدن لاگ‌ها
app.get("/admin/logs", (req, res) => {
  let html = `
    <html>
      <head>
        <title>ZerinSun Logs</title>
        <style>
          body { font-family: sans-serif; padding: 20px; background: #fff8e1; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #fbc02d; color: #333; }
        </style>
      </head>
      <body>
        <h2>☀️ ZerinSun User Logs</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th><th>Sun</th><th>Energy</th><th>Tap</th><th>Invite</th><th>Cup</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            ${logs
              .map(
                (log) => `
              <tr>
                <td>${log.userId}</td>
                <td>${log.sun}</td>
                <td>${log.energy}</td>
                <td>${log.tapCount}</td>
                <td>${log.inviteCount || "-"}</td>
                <td>${log.cup || "-"}</td>
                <td>${new Date(log.timestamp).toLocaleTimeString()}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  res.send(html);
});

// مسیر ping برای Wake Up
app.get("/healthz", (req, res) => {
  res.send("OK");
});

// اجرای سرور
app.listen(PORT, () => {
  console.log(`🚀 ZerinSun server is running on port ${PORT}`);
});
