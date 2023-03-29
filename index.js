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

const salesAndIncentivesDOMElements = {
  soldProducts: document.getElementById("sold-products"),
  achievements: document.getElementById("achievements"),
  totalRevenue: document.getElementById("total-revenue"),
  totalCommission: document.getElementById("total-commission"),
  numOfSoldProducts: document.getElementById("num-of-sold-products"),
  numOfAchievements: document.getElementById("num-of-achievements"),
};

let salesAndIncentivesData = {
  soldProducts: [],
  achievements: [],
  totalRevenue: 0,
  totalCommission: 0,
  numOfSoldProducts: 0,
  numOfAchievements: 0,
};

handleClick();

function handleClick() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.dataset.product) {
      case "star":
        updateObjProp("soldProducts", productA.emoji);
        updateObjProp("totalRevenue", productA.revenue);
        updateObjProp("totalCommission", productA.commission);
        break;
      case "fire":
        updateObjProp("soldProducts", productB.emoji);
        updateObjProp("totalRevenue", productB.revenue);
        updateObjProp("totalCommission", productB.commission);
        break;
      default:
        break;
    }
    updateAchievements();
    setLocalStorage();
    renderData();
  });
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
  addCurrencyIconWhenAmountExceedsThreshold();
  addPrizeIconOnFifteenthSale();
}

function addBellIconOnFirstProductSale() {
  if (salesAndIncentivesData["soldProducts"].length === 1) {
    updateObjProp("achievements", "🔔");
  }
}

function addCurrencyIconWhenAmountExceedsThreshold() {
  const thresholdAmount = 2500;
  const totalSalesRevenue = salesAndIncentivesData.totalRevenue;
  if (totalSalesRevenue >= thresholdAmount) {
    updateObjProp("achievements", "💰");
  }
}

function addPrizeIconOnFifteenthSale() {
  const soldProductsMultiplier = 15;
  const salesData = salesAndIncentivesData.totalRevenue;
  if (salesData % soldProductsMultiplier === 0) {
    updateObjProp("achievements", "🏆");
  }
}

function setLocalStorage() {
  localStorage.setItem("salesData", JSON.stringify(salesAndIncentivesData));
}

function getDataFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("salesData")) || {
      soldProducts: [],
      achievements: [],
      totalRevenue: 0,
      totalCommission: 0,
      numOfSoldProducts: 0,
      numOfAchievements: 0,
    }
  );
}

window.addEventListener("load", (e) => {
  e.preventDefault();
  renderData();
});

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
    salesAndIncentivesDOMElements[key].innerHTML = data;
  }
}

// Steps:
// 1. Create HTML elements in index.html for total number of sales and achievements
// 2. Get access to those elements in JS
// 3. Create variables in salesAndIncentivesData object and assign them a value of 0 to each
// 4. Updates their values with the length of the soldProducts and achievements.
