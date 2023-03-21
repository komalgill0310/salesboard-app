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

const revenueAndCommissionArr = {
  salesRevenue: [],
  commission: [],
};

handleClick();

function handleClick() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.dataset.product) {
      case "star":
        soldProducts.innerHTML += productA.emoji;
        updateRevenueAndCommissionArr(productA.revenue, productA.commission);
        break;
      case "fire":
        soldProducts.innerHTML += productB.emoji;
        updateRevenueAndCommissionArr(productB.revenue, productB.commission);
        break;
      default:
        break;
    }
    updateAchievementsHtml();
    updateRevenueAndCommissionHtml(
      revenueAndCommissionArr.salesRevenue,
      totalRevenue
    );
    updateRevenueAndCommissionHtml(
      revenueAndCommissionArr.commission,
      totalCommission
    );
  });
}

function updateRevenueAndCommissionArr(revenue, commission) {
  revenueAndCommissionArr.salesRevenue.push(revenue);
  revenueAndCommissionArr.commission.push(commission);
}

function updateAchievementsHtml() {
  addBellIconOnFirstProductSale();
  addCurrencyIconWhenAmountExceedsThreshold();
  addPrizeIconOnFifteenthSale();
}

function updateRevenueAndCommissionHtml(income, htmlElement) {
  htmlElement.textContent = `$ ${calculateRevenueOrCommission(income)}`;
}

function addBellIconOnFirstProductSale() {
  if (
    soldProducts.innerHTML === productA.emoji ||
    soldProducts.innerHTML === productB.emoji
  ) {
    achievements.innerHTML = "🔔";
  }
}

function addCurrencyIconWhenAmountExceedsThreshold() {
  const thresholdAmount = 2500;
  const totalSalesRevenue = calculateRevenueOrCommission(
    revenueAndCommissionArr.salesRevenue
  );
  if (totalSalesRevenue >= thresholdAmount) {
    achievements.innerHTML += "💰";
  }
}

function addPrizeIconOnFifteenthSale() {
  const soldProductsMultiplier = 15;
  const salesData = revenueAndCommissionArr.salesRevenue.length;
  if (salesData % soldProductsMultiplier === 0) {
    achievements.innerHTML += "🏆";
  }
}

function calculateRevenueOrCommission(income) {
  return income.reduce((total, currIncome) => total + currIncome, 0);
}
