/**
 * @jest-environment jsdom
 */

const { getByRole, queryByRole, queryByText } = require("@testing-library/dom");
const { calculateCost } = require("../index.js");

/**
 * Resets the DOM to a clean state before each test.
 * NOTE: In the future, there will be ways to directly
 * import the HTML file, but this works for now :)
 */
function resetDOM() {
  document.body.innerHTML = `
  <main>
    <h1>The Prescription</h1>
    <section>
      <h2>Prescription Details</h2>
      <label>
        Price per refill
        <input type="number" name="price" id="price" />
      </label>
      <label>
        Number of refills
        <input type="number" name="refills" id="refills" />
      </label>
      <label>
        Subscribed?
        <input type="checkbox" name="subscribed" id="subscribed" />
      </label>
      <label>
        Coupon?
        <input type="checkbox" name="coupon" id="coupon" />
      </label>
      <button id="calculate">Calculate Cost</button>
    </section>
    <label>
      Total Cost
      <output id="cost">$0.00</output>
    </label>
  </main>
  `;
  document.querySelector("#calculate").addEventListener("click", calculateCost);
}

describe("The document", () => {
  beforeEach(resetDOM);

  test("displays the correct cost for the user's input values after clicking the calculate button", () => {
    const priceInput = getByRole(document, "spinbutton", { name: /price/i });
    const subscribedCheckbox = getByRole(document, "checkbox", {
      name: /subscribed/i,
    });
    const calculateButton = getByRole(document, "button", {
      name: /calculate/i,
    });
    const costOutput = getByRole(document, "status", { name: /total cost/i });
  
    // Set input values
    priceInput.value = "20";
    subscribedCheckbox.checked = true;
  
    calculateButton.click();
  
    // Check the correct value
    expect(costOutput.textContent).toBe("$15.00");
  });
  
  test("displays $0.00 initially", () => {
    const cost = queryByText(document, "$0.00");
    expect(cost).not.toBe(null);
  });

  test("displays the correct cost for the user's input values after clicking the calculate button", () => {
    const price = getByRole(document, "spinbutton", { name: /price/i });
    const subscribed = getByRole(document, "checkbox", {
      name: /subscribed/i,
    });
    const calculateButton = getByRole(document, "button", {
      name: /calculate/i,
    });

    calculateButton.click();

    // TODO: Change this assertion to check the correct value.
    expect(true).toBe(false);
  });
});