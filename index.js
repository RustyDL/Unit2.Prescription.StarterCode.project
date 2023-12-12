/**
 * Calculates the total cost of all refills.
 * @param {number} pricePerRefill - The price per refill.
 * @param {number} refills - The number of refills.
 * @returns {number} The total cost of all refills.
 */
function getTotalCost(pricePerRefill, refills) {
  // Calculate the total cost by multiplying the price per refill with the number of refills.
  return pricePerRefill * refills;
}


/**
 * If the customer has a subscription, apply a 25% discount
 * to the total cost of the refills.
 * @param {number} totalCostWithoutDiscounts - The total cost without any discounts.
 * @param {boolean} isSubscribed - Whether the user has a subscription.
 * @returns {number} The total cost with a subscription discount.
 */
function applyDiscount(totalCostWithoutDiscounts, isSubscribed) {
  return totalCostWithoutDiscounts * (isSubscribed ? 0.75 : 1);
}

/**
 * If the customer has a coupon, apply a $10 discount to
 * the total cost of the refills after the subscription discount.
 * @param {number} costAfterSubscription - The total cost after applying the subscription discount.
 * @param {boolean} hasCoupon - Whether the customer is using a coupon.
 * @returns {number} The total cost with a coupon discount.
 */
function applyCoupon(costAfterSubscription, hasCoupon) {
  return costAfterSubscription - (hasCoupon ? 10 : 0);
}

/**
 * Calculates the cost based on input values and displays the result on the page.
 */
function calculateCost() {
  const pricePerRefill = document.querySelector("#price");
  const refills = document.querySelector("#refills");
  const subscription = document.querySelector("#subscribed");
  const coupon = document.querySelector("#coupon");

  const output = document.querySelector("#cost");

  const initialCost = getTotalCost(parseFloat(pricePerRefill.value), parseInt(refills.value, 10));
  const costAfterSubscription = applyDiscount(initialCost, subscription.checked);
  const finalCost = applyCoupon(costAfterSubscription, coupon.checked);

  output.textContent = `$${finalCost.toFixed(2)}`;
}

// Check if the code is running in a Node.js environment (e.g., during testing)
if (typeof module !== "undefined") {
  // Export functions for testing in Node.js
  module.exports = {
    getTotalCost,
    applyDiscount,
    applyCoupon,
    calculateCost,
  };
} else {
// Set up event listener for the DOM interaction in a browser environment
const calculateButton = document.querySelector("#calculate");
calculateButton.addEventListener("click", calculateCost);
}
const {
  getTotalCost,
  applyDiscount,
  applyCoupon,
  calculateCost,
} = require('./index');

describe('getTotalCost', () => {
  test('calculates the total cost correctly', () => {
    expect(getTotalCost(5, 3)).toBe(15);
  });
});

describe('applyDiscount', () => {
  test('applies a 25% discount when subscribed', () => {
    expect(applyDiscount(100, true)).toBe(75);
  });

  test('does not apply a discount when not subscribed', () => {
    expect(applyDiscount(100, false)).toBe(100);
  });
});

describe('applyCoupon', () => {
  test('applies a $10 coupon discount when available', () => {
    expect(applyCoupon(50, true)).toBe(40);
  });

  test('does not apply a coupon discount when not available', () => {
    expect(applyCoupon(50, false)).toBe(50);
  });
});

describe('calculateCost (DOM interaction)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="number" id="price" value="5">
      <input type="number" id="refills" value="3">
      <input type="checkbox" id="subscribed" checked>
      <input type="checkbox" id="coupon" checked>
      <button id="calculate"></button>
      <div id="cost"></div>
    `;
  });
  
  test('updates the output element with the correct final cost', () => {
    calculateCost();

    const output = document.querySelector("#cost");
    expect(output.textContent).toContain('27.75');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});

