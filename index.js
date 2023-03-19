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

const salesRevenueAndCommissionArr = {
  salesRevenue: [],
  commission: [],
};

function handleClick() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.dataset.product) {
      case "star":
        soldProducts.innerHTML += productA.emoji;
        updatesalesRevenueAndCommissionArr(
          productA.revenue,
          productA.commission
        );
        break;
      case "fire":
        soldProducts.innerHTML += productB.emoji;
        updatesalesRevenueAndCommissionArr(
          productB.revenue,
          productB.commission
        );
        break;
      default:
        break;
    }
    addBellIconOnProductBtnClick();
    updateRevenueAndCommissionHtml(
      salesRevenueAndCommissionArr.salesRevenue,
      totalRevenue
    );
    updateRevenueAndCommissionHtml(
      salesRevenueAndCommissionArr.commission,
      totalCommission
    );
  });
}

handleClick();

function addBellIconOnProductBtnClick() {
  if (
    soldProducts.innerHTML === productA.emoji ||
    soldProducts.innerHTML === productB.emoji
  ) {
    achievements.innerHTML = "🔔";
  }
}

function updatesalesRevenueAndCommissionArr(revenue, commission) {
  salesRevenueAndCommissionArr.salesRevenue.push(revenue);
  salesRevenueAndCommissionArr.commission.push(commission);
}

function updateRevenueAndCommissionHtml(income, htmlElement) {
  htmlElement.textContent = `$ ${calculateRevenueOrCommission(income)}`;
}

function calculateRevenueOrCommission(income) {
  return income.reduce((total, currIncome) => total + currIncome, 0);
}
