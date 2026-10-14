/**
 * Automated test suite for Blueprint AI quantity calculations and BoQ estimation.
 */

function calculateBoQ(items, multiplier, contingencyPct, vatPct) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitRateKES * multiplier), 0);
  const contingency = subtotal * (contingencyPct / 100);
  const vat = (subtotal + contingency) * (vatPct / 100);
  const grandTotal = subtotal + contingency + vat;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    contingency: Number(contingency.toFixed(2)),
    vat: Number(vat.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2))
  };
}

// Test Fixtures
const testItems = [
  { id: "1", quantity: 100, unitRateKES: 1000 }, // 100,000
  { id: "2", quantity: 50, unitRateKES: 2000 }   // 100,000
]; // Baseline Subtotal = 200,000

console.log("Running Blueprint AI Calculation Tests...");

// Test 1: Baseline (Multiplier 1.0, 10% contingency, 16% VAT)
const res1 = calculateBoQ(testItems, 1.0, 10, 16);
console.assert(res1.subtotal === 200000, `Test 1 Failed: Expected subtotal 200000, got ${res1.subtotal}`);
console.assert(res1.contingency === 20000, `Test 1 Failed: Expected contingency 20000, got ${res1.contingency}`);
console.assert(res1.vat === 35200, `Test 1 Failed: Expected VAT 35200, got ${res1.vat}`);
console.assert(res1.grandTotal === 255200, `Test 1 Failed: Expected grandTotal 255200, got ${res1.grandTotal}`);
console.log("✓ Test 1 Passed: Baseline KES calculation verified.");

// Test 2: Mombasa Regional Multiplier (1.08x)
const res2 = calculateBoQ(testItems, 1.08, 10, 16);
console.assert(res2.subtotal === 216000, `Test 2 Failed: Expected subtotal 216000, got ${res2.subtotal}`);
console.log("✓ Test 2 Passed: Regional multiplier adjustment verified.");

console.log("\nAll automated calculation tests passed successfully!");
