const fs = require('fs');
const path = require('path');

console.log("[*] Setting up SMM2 Quantity Calculation & Pricing Engine...");

const libDir = path.join('lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

const calculatorContent = `// SMM2 Calculation & Rate Engine for Blueprint AI

export interface ExtractedElement {
  smm2Code: string;
  description: string;
  unit: string;
  quantity: number;
  confidence: string;
}

export interface CalculatedBoQItem extends ExtractedElement {
  rate: number;
  totalAmount: number;
  wastageApplied: boolean;
}

// Standard regional rates (KES) for East African construction standards
export const SMM2_RATES: Record<string, number> = {
  "A.1.1": 14500, // Reinforced Concrete Class 25/20 per m³
  "A.2.1": 18200, // RC Columns per m³
  "A.3.1": 16800, // RC Beams per m³
  "A.4.1": 15200, // Suspended Slabs per m³
  "E.1.2": 12500, // Timber Flush Doors per Unit
};

export function calculateSMM2Takeoff(elements: ExtractedElement[]): CalculatedBoQItem[] {
  return elements.map(el => {
    let baseQty = el.quantity;
    
    // Apply SMM2 standard concrete wastage allowance (5%)
    if (el.smm2Code.startsWith("A")) {
      baseQty = baseQty * 1.05; 
    }
    
    const rate = SMM2_RATES[el.smm2Code] || 10000;
    const totalAmount = Math.round(baseQty * rate);

    return {
      ...el,
      quantity: Number(baseQty.toFixed(2)),
      rate,
      totalAmount,
      wastageApplied: el.smm2Code.startsWith("A")
    };
  });
}
`;

fs.writeFileSync(path.join(libDir, 'smm2Calculator.ts'), calculatorContent);
console.log("[✓] Created lib/smm2Calculator.ts successfully!");
