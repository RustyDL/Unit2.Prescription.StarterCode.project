const { getTotalCost, applyDiscount, applyCoupon } = require("../index.js");

// NOTE: This array illustrates the shape of the data that
// will be used in the functions you are testing.
const sampleData = [
  {
    prescription: "acetaminophen",
    pricePerRefill: 25,
    refills: 3,
    subscription: false,
    coupon: true,
  },
  {
    prescription: "diphenhydramine",
    pricePerRefill: 50,
    refills: 1,
    subscription: true,
    coupon: false,
  },
  {
    prescription: "phenylephrine",
    pricePerRefill: 30,
    refills: 5,
    subscription: true,
    coupon: true,
  },
];

// NOTE: You do not need to modify this describe block; it is provided for you.
// These tests are not exhaustive, but they should be enough to give you
// an idea of what you might want to test, and how to do so.
describe("getTotalCost()", () => {
  describe("handles expected input", () => {
    it("returns the correct cost for a single refill", () => {
      expect(getTotalCost(25, 1)).toBe(25);
    });
    it("returns the correct cost for multiple refills", () => {
      expect(getTotalCost(25, 3)).toBe(75);
    });
    it("returns the correct cost for a zero-cost refill", () => {
      expect(getTotalCost(0, 3)).toBe(0);
    });
    it("returns the correct cost for zero refills", () => {
      expect(getTotalCost(25, 0)).toBe(0);
    });
    it("returns the correct cost for random numbers", () => {
      const pricePerRefill = Math.floor(Math.random() * 100);
      const refills = Math.floor(Math.random() * 10);
      const result = getTotalCost(pricePerRefill, refills);
      const expected = pricePerRefill * refills;
      expect(result).toBe(expected);
    });
    it("returns the correct costs for the sample data", () => {
      sampleData.forEach((data) => {
        const result = getTotalCost(data.pricePerRefill, data.refills);
        const expected = data.pricePerRefill * data.refills;
        expect(result).toBe(expected);
      });
    });
  });

  // NOTE: These tests will fail - why?
  describe.skip("handles unexpected input", () => {
    it("returns 0 if either argument is not a number", () => {
      expect(getTotalCost("25", 3)).toBe(0);
      expect(getTotalCost(25, "3")).toBe(0);
      expect(getTotalCost("25", "3")).toBe(0);
    });
    it("returns 0 if pricePerRefill is negative", () => {
      expect(getTotalCost(-25, 3)).toBe(0);
    });
    it("returns 0 if refills is negative", () => {
      expect(getTotalCost(25, -3)).toBe(0);
    });
  });
});

// TODO: Write tests for applyDiscount() and applyCoupon()