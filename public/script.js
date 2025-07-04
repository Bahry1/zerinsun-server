document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");

  if (!sunCoin || !window.ZerinCore) return;

  let loaded = false;

  function initClick() {
    if (loaded) return;
    loaded = true;

    sunCoin.addEventListener("click", () => {
      const TAP_VALUE = 0.25; // ← یا 0.01 بسته به طراحی تو
      const currentEnergy = Math.round(ZerinCore.getEnergy() * 100) / 100;

      if (currentEnergy >= TAP_VALUE) {
        if (ZerinCore.useEnergy(TAP_VALUE)) {
          ZerinCore.addSun(TAP_VALUE);
          ZerinCore.addTap();

          // انیمیشن کلیک
          sunCoin.style.transform = "scale(0.94)";
          setTimeout(() => sunCoin.style.transform = "scale(1)", 150);
        }
      }
    });
  }

  setTimeout(() => {
    ZerinCore.loadData(); // لود اولیه مطمئن
    initClick();
  }, 200);
});