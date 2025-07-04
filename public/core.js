const MAX_ENERGY = 50;
let energy = 0;
let sun = 0;
let tapCount = 0;
let currentCup = "";

const saveData = () => {
  localStorage.setItem("energy", energy.toString());
  localStorage.setItem("sun", sun.toString());
  localStorage.setItem("tapCount", tapCount.toString());
  localStorage.setItem("currentCup", currentCup);
};

const loadData = () => {
  const storedEnergy = parseFloat(localStorage.getItem("energy"));
  energy = isNaN(storedEnergy) ? MAX_ENERGY : storedEnergy;

  sun = parseFloat(localStorage.getItem("sun")) || 0;
  tapCount = parseInt(localStorage.getItem("tapCount")) || 0;
  currentCup = localStorage.getItem("currentCup") || "";
};

const updateUI = () => {
  const bar = document.getElementById("energy-bar-fill");
  if (bar) {
    const percent = (energy / MAX_ENERGY) * 100;
    bar.style.width = percent + "%";
    bar.style.background = percent <= 10 ? "#f33" : "#0cf";
  }

  const sunEl = document.getElementById("sun-count");
  if (sunEl) {
    sunEl.textContent = sun.toFixed(2);
  }

  const tapEl = document.getElementById("tap-count");
  if (tapEl) {
    tapEl.textContent = tapCount;
  }
};

window.ZerinCore = {
  MAX_ENERGY,

  getEnergy: () => energy,
  getSun: () => sun,
  getTapCount: () => tapCount,

  loadData: () => {
    loadData();
    updateUI();
  },

  saveData: () => {
    saveData();
  },

  updateUI: () => {
    updateUI();
  },

  useEnergy: (amount) => {
    if (energy >= amount) {
      energy -= amount;
      saveData();
      updateUI();
      return true;
    }
    return false;
  },

  addSun: (amount) => {
    sun += amount;

    const newCup = ZerinCore.getCupLevel();
    if (newCup !== currentCup) {
      currentCup = newCup;

      let reward = 0;
      switch (newCup) {
        case "🥉 Bronze":    reward = 10; break;
        case "🥈 Silver":    reward = 20; break;
        case "🏆 Gold":      reward = 30; break;
        case "💚 Emerald":   reward = 40; break;
        case "💙 Sapphire":  reward = 50; break;
        case "❤️ Ruby":      reward = 60; break;
        case "💎 Diamond":   reward = 70; break;
        case "🌟 Legendary": reward = 80; break;
      }

      if (reward > 0) {
        sun += reward;
        console.log(`🎉 New Cup: ${newCup}! 🎁 Bonus: +${reward} SUN`);
      }
    }

    saveData();
    updateUI();
  },

  addTap: () => {
    tapCount++;
    saveData();
    updateUI();
  },

  rechargeEnergy: (amount) => {
    energy = Math.min(MAX_ENERGY, energy + amount);
    saveData();
    updateUI();
  },

  resetAll: () => {
    energy = MAX_ENERGY;
    sun = 0;
    tapCount = 0;
    currentCup = "";
    localStorage.removeItem("ref-counted");
    saveData();
    updateUI();
  },

  getCupLevel: () => {
    if (sun >= 600) return "🌟 Legendary";
    if (sun >= 500) return "💎 Diamond";
    if (sun >= 410) return "❤️ Ruby";
    if (sun >= 340) return "💙 Sapphire";
    if (sun >= 250) return "💚 Emerald";
    if (sun >= 180) return "🏆 Gold";
    if (sun >= 100) return "🥈 Silver";
    if (sun >= 50)  return "🥉 Bronze";
    return "🔰 Starter";
  },

  checkDailyCycle: () => {
    const today = new Date().toDateString();
    const last = localStorage.getItem("last-claim");

    if (last !== today) {
      localStorage.setItem("last-claim", today);
      energy = MAX_ENERGY;
      saveData();
      updateUI();
      console.log("⚡ انرژی روزانه شارژ شد!");
    }
  },

  getUserId: () => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = "user" + Math.floor(Math.random() * 1000000);
      localStorage.setItem("userId", id);
    }
    return id;
  },

  getInviteCount: () => {
    const id = ZerinCore.getUserId();
    const stats = JSON.parse(localStorage.getItem("refStats") || "{}");
    return stats[id] || 0;
  },

  sendReferral: (referrerId) => {
    if (!referrerId) return;
    const stats = JSON.parse(localStorage.getItem("refStats") || "{}");
    stats[referrerId] = (stats[referrerId] || 0) + 1;
    localStorage.setItem("refStats", JSON.stringify(stats));
  },

  getReferralReward: (count) => {
    if (count >= 1 && count <= 5) return 5;
    if (count <= 10) return 10;
    if (count <= 15) return 15;
    if (count <= 20) return 20;
    if (count <= 30) return 30;
    return 0;
  },

  addReferralReward: () => {
    const count = ZerinCore.getInviteCount();
    const reward = ZerinCore.getReferralReward(count);
    if (reward > 0) {
      sun += reward;
      saveData();
      updateUI();
      console.log(`🎯 Referral reward added: ${reward} SUN`);
    }
  }
};
