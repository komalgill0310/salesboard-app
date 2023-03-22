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
const soldProducts = document.getElementById("sold-products");
const achievements = document.getElementById("achievements");
const totalRevenue = document.getElementById("total-revenue");
const totalCommission = document.getElementById("total-commission");

const salesAndIncentivesData = {
  soldProducts: [],
  earnedAchievements: [],
  totalRevenue: 0,
  totalCommission: 0,
};

handleClick();

function handleClick() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.dataset.product) {
      case "star":
        soldProducts.innerHTML += productA.emoji;
        updateObjProp("soldProducts", productA.emoji);
        addToObjProp("totalRevenue", productA.revenue);
        addToObjProp("totalCommission", productA.commission);
        break;
      case "fire":
        soldProducts.innerHTML += productB.emoji;
        updateObjProp("soldProducts", productB.emoji);
        addToObjProp("totalRevenue", productB.revenue);
        addToObjProp("totalCommission", productB.commission);
        break;
      default:
        break;
    }
    updateAchievementsHtml();
    updateRevenueOrCommissionHtml(
      salesAndIncentivesData.totalRevenue,
      totalRevenue
    );
    updateRevenueOrCommissionHtml(
      salesAndIncentivesData.totalCommission,
      totalCommission
    );
    setLocalStorage();
  });
}

function updateObjProp(property, value) {
  salesAndIncentivesData[property].push(value);
}

function updateAchievementsHtml() {
  addAndStoreBellIconOnFirstProductSale();
  addCurrencyIconWhenAmountExceedsThreshold();
  addAndStorePrizeIconOnFifteenthSale();
}

function updateRevenueOrCommissionHtml(income, htmlElement) {
  htmlElement.textContent = `$ ${income}`;
}

function addAndStoreBellIconOnFirstProductSale() {
  if (
    soldProducts.innerHTML === productA.emoji ||
    soldProducts.innerHTML === productB.emoji
  ) {
    achievements.innerHTML = "🔔";
    updateObjProp("earnedAchievements", "🔔");
  }
}

function addCurrencyIconWhenAmountExceedsThreshold() {
  const thresholdAmount = 2500;
  const totalSalesRevenue = salesAndIncentivesData.totalRevenue;
  if (totalSalesRevenue >= thresholdAmount) {
    achievements.innerHTML += "💰";
    updateObjProp("earnedAchievements", "💰");
  }
}

function addAndStorePrizeIconOnFifteenthSale() {
  const soldProductsMultiplier = 15;
  const salesData = salesAndIncentivesData.totalRevenue;
  if (salesData % soldProductsMultiplier === 0) {
    achievements.innerHTML += "🏆";
    updateObjProp("earnedAchievements", "🏆");
  }
}

function addToObjProp(prop, income) {
  salesAndIncentivesData[prop] += income;
}

function setLocalStorage() {
  localStorage.setItem("salesData", JSON.stringify(salesAndIncentivesData));
}

function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem("salesData")) || {};
}

window.addEventListener("load", (e) => {
  e.preventDefault();
  const salesDataFromLocalStorage = getDataFromLocalStorage();
  if (salesDataFromLocalStorage.soldProducts) {
    console.log(salesDataFromLocalStorage);
  }
});
