// Product A info
let productA = {
  emoji: "⭐",
  revenue: 200,
  commission: 50,
};

// Product B info
let productB = {
  emoji: "🔥",
  revenue: 300,
  commission: 75,
};

const starProductBtn = document.getElementById("star-product");
const fireProductBtn = document.getElementById("fire-product");
const ballSlide = document.getElementById("ball").classList;

const salesAndIncentivesDomElements = {
  soldProducts: document.getElementById("sold-products"),
  achievements: document.getElementById("achievements"),
  totalRevenue: document.getElementById("total-revenue"),
  totalCommission: document.getElementById("total-commission"),
};

let salesAndIncentivesData = {
  soldProducts: [],
  achievements: [],
  totalRevenue: 0,
  totalCommission: 0,
};

init();

function init() {
  handleClick();
}

function handleClick() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.dataset.userSelection) {
      case "star":
        udpateProductDataAndRender(productA);
        break;
      case "fire":
        udpateProductDataAndRender(productB);
        break;
      case "reset":
        resetData();
        break;
      case "checkboxtoggle":
        toggleLightDarkMode();
        break;
      default:
        break;
    }
  });
}

function udpateProductDataAndRender(product) {
  const { emoji, revenue, commission } = product;
  updateObjProp("soldProducts", emoji);
  updateObjProp("totalRevenue", revenue);
  updateObjProp("totalCommission", commission);
  updateAchievements();
  setLocalStorage();
  renderData();
}

function resetData() {
  localStorage.clear();
  renderData();
}

function toggleLightDarkMode() {
  ballSlide.toggle("ballmove");
  document.body.classList.toggle("dark");
}

function updateObjProp(property, value) {
  if (Array.isArray(salesAndIncentivesData[property])) {
    salesAndIncentivesData[property].push(value);
  } else {
    salesAndIncentivesData[property] += value;
  }
}

function updateAchievements() {
  addBellIconOnFirstProductSale();
  addCurrencyIconWhenAmountExceedsThreshold(2500);
  addPrizeIconOnFifteenthSale(15);
}

function setLocalStorage() {
  localStorage.setItem("salesData", JSON.stringify(salesAndIncentivesData));
}

function addBellIconOnFirstProductSale() {
  if (salesAndIncentivesData["soldProducts"].length === 1) {
    updateObjProp("achievements", "🔔");
  }
}

function addCurrencyIconWhenAmountExceedsThreshold(threshold) {
  if (salesAndIncentivesData["totalRevenue"] >= threshold) {
    updateObjProp("achievements", "💰");
  }
}

function addPrizeIconOnFifteenthSale(threshold) {
  if (salesAndIncentivesData["soldProducts"].length === threshold) {
    updateObjProp("achievements", "🏆");
  }
}

function getDataFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("salesData")) || {
      soldProducts: [],
      achievements: [],
      totalRevenue: 0,
      totalCommission: 0,
    }
  );
}

function renderData() {
  salesAndIncentivesData = getDataFromLocalStorage();
  for (const [key, value] of Object.entries(salesAndIncentivesData)) {
    let data = "";
    if (Array.isArray(value)) {
      value.forEach((element) => {
        data += `<span>${element}</span>`;
      });
    } else {
      data = `$ ${value}`;
    }
    salesAndIncentivesDomElements[key].innerHTML = data;
  }
  updateSoldAndAchievementCounts();
}

function updateSoldAndAchievementCounts() {
  document.getElementById("num-of-sold-products").textContent =
    salesAndIncentivesData.soldProducts.length;
  document.getElementById("num-of-achievements").textContent =
    salesAndIncentivesData.achievements.length;
}

window.addEventListener("load", (e) => {
  e.preventDefault();
  renderData();
});
