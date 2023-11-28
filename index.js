/**
 * Calculates the total cost of all refills.
 * @param {number} pricePerRefill
 * @param {number} refills
 * @returns {number} total cost of all refills
 */
function getTotalCost(pricePerRefill, refills) {
  return pricePerRefill * refills;
}

/**
 * If the customer has a subscription, apply a 25% discount
 * to the total cost of the refills.
 * @param {number} totalCostWithoutDiscounts
 * @param {boolean} isSubscribed whether the user has a subscription
 * @returns {number} total cost with subscription discount
 */
function applyDiscount(totalCostWithoutDiscounts, isSubscribed) {
  return totalCostWithoutDiscounts * (isSubscribed ? 0.75 : 1);
}

/**
 * If the customer has a coupon, apply a $10 discount to
 * the total cost of the refills after the subscription discount.
 * @param {number} costAfterSubscription
 * @param {boolean} hasCoupon whether the customer is using a coupon
 * @returns
 */
function applyCoupon(costAfterSubscription, hasCoupon) {
  return costAfterSubscription - (hasCoupon ? 10 : 0);
}

/**
 * Calculates the cost of a subscription based on input values
 * and displays the result on the page.
 */
function calculateCost() {
  const pricePerRefill = document.querySelector("#price");
  const refills = document.querySelector("#refills");
  const subscription = document.querySelector("#subscribed");
  const coupon = document.querySelector("#coupon");

  const output = document.querySelector("#cost");

  const initialCost = getTotalCost(parseFloat(pricePerRefill.value), parseInt(refills.value, 10));
  const costAfterSubscription = applyDiscount(
    initialCost,
    subscription.checked
  );
  const finalCost = applyCoupon(costAfterSubscription, coupon.checked);

  output.textContent = `$${finalCost.toFixed(2)}`;
}

if (typeof module !== "undefined") {
  module.exports = {
    getTotalCost,
    applyDiscount,
    applyCoupon,
    calculateCost,
  };
} else {
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

// This is a sample test for the DOM interaction. Make sure to adjust it based on your actual HTML structure.
describe('calculateCost (DOM interaction)', () => {
  test('updates the output element with the correct final cost', () => {
    document.body.innerHTML = `
      <input type="number" id="price" value="5">
      <input type="number" id="refills" value="3">
      <input type="checkbox" id="subscribed" checked>
      <input type="checkbox" id="coupon" checked>
      <button id="calculate"></button>
      <div id="cost"></div>
    `;

    calculateCost();

    const output = document.querySelector("#cost");
    expect(output.textContent).toContain('27.75');
  });
});
