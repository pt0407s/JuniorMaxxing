// ===== SKILLS DATA — PROBLEM GENERATORS =====
// Infinite problem generation with step-by-step solutions
// Focus: applying patterns, not memorizing

// ----- SUBSCRIPT HELPERS -----
const SUB = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };
function sub(n) { return String(n).split('').map(c => SUB[c] || c).join(''); }
function formula(sym, count) { return count <= 1 ? sym : sym + sub(count); }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function roundTo(n, sig) {
  if (n === 0) return 0;
  const d = Math.ceil(Math.log10(Math.abs(n)));
  const power = sig - d;
  const mag = Math.pow(10, power);
  return Math.round(n * mag) / mag;
}
function fmtSci(n, sig) {
  const r = roundTo(n, sig);
  if (Math.abs(r) < 100 && Math.abs(r) >= 0.01) return String(r);
  const exp = Math.floor(Math.log10(Math.abs(r)));
  const mantissa = (r / Math.pow(10, exp)).toFixed(sig - 1);
  const expSub = String(exp).split('').map(c => c === '-' ? '⁻' : SUP[c] || c).join('');
  return mantissa + ' × 10' + expSub;
}
const SUP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };

// ===== BALANCING EQUATION GENERATOR =====
// Strategy: start with a balanced equation template, scramble coefficients,
// then ask the student to balance it. We generate the answer + steps.

const BALANCING_TEMPLATES = {
  easy: [
    // {reactants: [{sym, count}], products: [{sym, count}]}
    // H₂ + O₂ → H₂O  (answer: 2,1,2)
    { r: [['H₂',1],['O₂',1]], p: [['H₂O',1]], ans: [2,1,2] },
    // Na + Cl₂ → NaCl
    { r: [['Na',1],['Cl₂',1]], p: [['NaCl',1]], ans: [2,1,2] },
    // Mg + O₂ → MgO
    { r: [['Mg',1],['O₂',1]], p: [['MgO',1]], ans: [2,1,2] },
    // H₂ + Cl₂ → HCl
    { r: [['H₂',1],['Cl₂',1]], p: [['HCl',1]], ans: [1,1,2] },
    // N₂ + H₂ → NH₃
    { r: [['N₂',1],['H₂',1]], p: [['NH₃',1]], ans: [1,3,2] },
    // K + Cl₂ → KCl
    { r: [['K',1],['Cl₂',1]], p: [['KCl',1]], ans: [2,1,2] },
    // H₂ + O₂ → H₂O (same structure, different display)
    // C + O₂ → CO₂
    { r: [['C',1],['O₂',1]], p: [['CO₂',1]], ans: [1,1,1] },
    // Mg + N₂ → Mg₃N₂
    { r: [['Mg',1],['N₂',1]], p: [['Mg₃N₂',1]], ans: [3,1,1] },
  ],
  medium: [
    // CH₄ + O₂ → CO₂ + H₂O
    { r: [['CH₄',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [1,2,1,2] },
    // C₃H₈ + O₂ → CO₂ + H₂O
    { r: [['C₃H₈',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [1,5,3,4] },
    // Fe₂O₃ + CO → Fe + CO₂
    { r: [['Fe₂O₃',1],['CO',1]], p: [['Fe',1],['CO₂',1]], ans: [1,3,2,3] },
    // Al + HCl → AlCl₃ + H₂
    { r: [['Al',1],['HCl',1]], p: [['AlCl₃',1],['H₂',1]], ans: [2,6,2,3] },
    // KClO₃ → KCl + O₂
    { r: [['KClO₃',1]], p: [['KCl',1],['O₂',1]], ans: [2,2,3] },
    // C₂H₆ + O₂ → CO₂ + H₂O
    { r: [['C₂H₆',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [2,7,4,6] },
    // B₂O₃ + H₂O → H₃BO₃
    { r: [['B₂O₃',1],['H₂O',1]], p: [['H₃BO₃',1]], ans: [1,3,2] },
    // P₄ + O₂ → P₂O₅
    { r: [['P₄',1],['O₂',1]], p: [['P₂O₅',1]], ans: [1,5,2] },
  ],
  hard: [
    // C₄H₁₀ + O₂ → CO₂ + H₂O (fractional → double)
    { r: [['C₄H₁₀',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [2,13,8,10] },
    // NH₃ + O₂ → NO + H₂O (fractional → double)
    { r: [['NH₃',1],['O₂',1]], p: [['NO',1],['H₂O',1]], ans: [4,5,4,6] },
    // Fe + H₂O → Fe₃O₄ + H₂
    { r: [['Fe',1],['H₂O',1]], p: [['Fe₃O₄',1],['H₂',1]], ans: [3,4,1,4] },
    // C₂H₂ + O₂ → CO₂ + H₂O
    { r: [['C₂H₂',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [2,5,4,2] },
    // C₈H₁₈ + O₂ → CO₂ + H₂O
    { r: [['C₈H₁₈',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [2,25,16,18] },
    // Al₂O₃ + H₂SO₄ → Al₂(SO₄)₃ + H₂O
    { r: [['Al₂O₃',1],['H₂SO₄',1]], p: [['Al₂(SO₄)₃',1],['H₂O',1]], ans: [1,3,1,3] },
    // C₆H₁₂O₆ + O₂ → CO₂ + H₂O
    { r: [['C₆H₁₂O₆',1],['O₂',1]], p: [['CO₂',1],['H₂O',1]], ans: [1,6,6,6] },
  ],
};

// Parse a chemical formula into element counts
function parseFormula(f) {
  // Handle simple formulas like H2O, C3H8, Fe2O3, Al2(SO4)3
  const elements = {};
  // Expand parentheses first
  let expanded = f;
  // Simple paren expansion: Al2(SO4)3 → Al2S3O12
  expanded = expanded.replace(/(\w+)\(([^)]+)\)(\d*)/g, (_, pre, inner, mult) => {
    const m = parseInt(mult) || 1;
    const innerExpanded = inner.replace(/([A-Z][a-z]?)(\d*)/g, (__, el, n) => el + (parseInt(n)||1)*m);
    return pre + innerExpanded;
  });
  expanded = expanded.replace(/([A-Z][a-z]?)(\d*)/g, (_, el, n) => {
    elements[el] = (elements[el] || 0) + (parseInt(n) || 1);
    return '';
  });
  return elements;
}

function eqStr(r, p, coeffs) {
  const ri = coeffs.slice(0, r.length);
  const pi = coeffs.slice(r.length);
  const rStr = r.map(([sym], i) => (ri[i] > 1 ? ri[i] : '') + sym).join(' + ');
  const pStr = p.map(([sym], i) => (pi[i] > 1 ? pi[i] : '') + sym).join(' + ');
  return rStr + ' → ' + pStr;
}

function unbalancedStr(r, p) {
  const rStr = r.map(([sym]) => sym).join(' + ');
  const pStr = p.map(([sym]) => sym).join(' + ');
  return rStr + ' → ' + pStr;
}

function countAtoms(r, p, coeffs) {
  const left = {};
  const right = {};
  r.forEach(([sym, _], i) => {
    const c = coeffs[i] || 1;
    const els = parseFormula(sym);
    for (const [el, n] of Object.entries(els)) left[el] = (left[el]||0) + c*n;
  });
  p.forEach(([sym, _], i) => {
    const c = coeffs[r.length + i] || 1;
    const els = parseFormula(sym);
    for (const [el, n] of Object.entries(els)) right[el] = (right[el]||0) + c*n;
  });
  return { left, right };
}

function generateBalancing(difficulty) {
  const templates = BALANCING_TEMPLATES[difficulty];
  const t = pick(templates);
  const r = t.r, p = t.p, ans = t.ans;
  const prompt = 'Balance: ' + unbalancedStr(r, p);
  const answer = eqStr(r, p, ans);

  // Build steps dynamically
  const { left: leftUnbal, right: rightUnbal } = countAtoms(r, p, r.concat(p).map(() => 1));
  const allEls = [...new Set([...Object.keys(leftUnbal), ...Object.keys(rightUnbal)])];
  const steps = [];
  steps.push('Step 1: Count atoms on each side.\n  Left: ' + allEls.map(e => e + '=' + (leftUnbal[e]||0)).join(', ') +
    '\n  Right: ' + allEls.map(e => e + '=' + (rightUnbal[e]||0)).join(', '));

  // Find first unbalanced element and show the fix
  const { left: leftBal, right: rightBal } = countAtoms(r, p, ans);
  let stepNum = 2;
  for (const el of allEls) {
    if (leftUnbal[el] !== rightUnbal[el]) {
      const leftV = leftBal[el], rightV = rightBal[el];
      steps.push(`Step ${stepNum}: Balance ${el}. After applying coefficients: Left ${el}=${leftV}, Right ${el}=${rightV} ✓`);
      stepNum++;
    }
  }
  steps.push(`Step ${stepNum}: Verify — ` + allEls.map(e => `${e}: ${leftBal[e]}=${rightBal[e]} ✓`).join(', ') + '\n  Answer: ' + answer);

  return {
    id: 'bal-' + Date.now() + '-' + randInt(0, 9999),
    prompt,
    answer,
    hint: 'Count each type of atom on both sides. Start with the element that appears in the fewest places. Remember: you can only change coefficients (numbers in front), never subscripts!',
    steps,
  };
}

// ===== MOLE CONVERSION GENERATOR =====
// Generates conversion problems: grams↔moles, moles↔atoms/molecules,
// grams↔atoms (2-step), liters↔moles, liters↔molecules, liters↔grams,
// grams→specific atoms (3-step)

const COMPOUNDS = [
  { sym: 'H₂O', name: 'water', mm: 18.02, atomsPerMolecule: 3, hCount: 2, oCount: 1, isGas: false, breakdown: '2(1.01) + 16.00 = 18.02' },
  { sym: 'CO₂', name: 'carbon dioxide', mm: 44.01, atomsPerMolecule: 3, oCount: 2, cCount: 1, isGas: true, breakdown: '12.01 + 2(16.00) = 44.01' },
  { sym: 'NaCl', name: 'sodium chloride', mm: 58.44, atomsPerMolecule: 2, isGas: false, breakdown: '22.99 + 35.45 = 58.44' },
  { sym: 'CH₄', name: 'methane', mm: 16.04, atomsPerMolecule: 5, hCount: 4, cCount: 1, isGas: true, breakdown: '12.01 + 4(1.01) = 16.04' },
  { sym: 'O₂', name: 'oxygen gas', mm: 32.00, atomsPerMolecule: 2, oCount: 2, isGas: true, breakdown: '2(16.00) = 32.00' },
  { sym: 'N₂', name: 'nitrogen gas', mm: 28.02, atomsPerMolecule: 2, nCount: 2, isGas: true, breakdown: '2(14.01) = 28.02' },
  { sym: 'H₂', name: 'hydrogen gas', mm: 2.02, atomsPerMolecule: 2, hCount: 2, isGas: true, breakdown: '2(1.01) = 2.02' },
  { sym: 'CO', name: 'carbon monoxide', mm: 28.01, atomsPerMolecule: 2, isGas: true, breakdown: '12.01 + 16.00 = 28.01' },
  { sym: 'NH₃', name: 'ammonia', mm: 17.03, atomsPerMolecule: 4, hCount: 3, nCount: 1, isGas: true, breakdown: '14.01 + 3(1.01) = 17.03' },
  { sym: 'C₆H₁₂O₆', name: 'glucose', mm: 180.16, atomsPerMolecule: 24, hCount: 12, cCount: 6, oCount: 6, isGas: false, breakdown: '6(12.01) + 12(1.01) + 6(16.00) = 180.16' },
  { sym: 'HCl', name: 'hydrochloric acid', mm: 36.46, atomsPerMolecule: 2, isGas: true, breakdown: '1.01 + 35.45 = 36.46' },
  { sym: 'KCl', name: 'potassium chloride', mm: 74.55, atomsPerMolecule: 2, isGas: false, breakdown: '39.10 + 35.45 = 74.55' },
  { sym: 'MgO', name: 'magnesium oxide', mm: 40.31, atomsPerMolecule: 2, isGas: false, breakdown: '24.31 + 16.00 = 40.31' },
  { sym: 'C₂H₆', name: 'ethane', mm: 30.07, atomsPerMolecule: 8, hCount: 6, cCount: 2, isGas: true, breakdown: '2(12.01) + 6(1.01) = 30.07' },
  { sym: 'SO₂', name: 'sulfur dioxide', mm: 64.07, atomsPerMolecule: 3, oCount: 2, isGas: true, breakdown: '32.07 + 2(16.00) = 64.07' },
];
const GASES = COMPOUNDS.filter(c => c.isGas);

const ELEMENTS = [
  { sym: 'Mg', mm: 24.31, name: 'magnesium' },
  { sym: 'Fe', mm: 55.85, name: 'iron' },
  { sym: 'Na', mm: 22.99, name: 'sodium' },
  { sym: 'Ca', mm: 40.08, name: 'calcium' },
  { sym: 'Al', mm: 26.98, name: 'aluminum' },
  { sym: 'Cu', mm: 63.55, name: 'copper' },
  { sym: 'Zn', mm: 65.38, name: 'zinc' },
  { sym: 'C', mm: 12.01, name: 'carbon' },
  { sym: 'S', mm: 32.07, name: 'sulfur' },
  { sym: 'K', mm: 39.10, name: 'potassium' },
];

const N_A = 6.022e23;
const MOLAR_VOLUME = 22.4;

function generateConversion(difficulty) {
  const types = {
    easy: ['g2mol', 'mol2g', 'mol2particles', 'mol2L'],
    medium: ['g2atoms', 'g2L', 'L2particles', 'particles2g', 'L2g'],
    hard: ['g2specificAtom', 'L2specificAtom', 'atoms2g', 'g2L3step'],
  };
  const type = pick(types[difficulty]);

  switch (type) {
    case 'g2mol': {
      const c = pick(COMPOUNDS);
      const grams = roundTo(randInt(10, 100) * (c.mm < 30 ? 1 : 1), 3);
      const mol = grams / c.mm;
      return {
        id: 'conv-g2mol-' + Date.now(),
        prompt: `How many moles are in ${grams} g of ${c.sym} (${c.name})? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: roundTo(mol, 3) + ' mol',
        hint: 'Use: moles = grams ÷ molar mass. Set up as: g × (1 mol / molar mass) = moles',
        steps: [
          `Step 1: Identify what you know.\n  Given: ${grams} g ${c.sym}\n  Find: moles\n  Molar mass: ${c.mm} g/mol (${c.breakdown})`,
          `Step 2: Set up conversion factor.\n  ${grams} g ${c.sym} × (1 mol ${c.sym} / ${c.mm} g ${c.sym})`,
          `Step 3: Calculate.\n  = ${grams} ÷ ${c.mm} = ${mol.toFixed(4)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(mol, 3)} mol ${c.sym}`,
        ],
      };
    }
    case 'mol2g': {
      const c = pick(COMPOUNDS);
      const mol = pick([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 0.25, 0.75, 1.25]);
      const grams = mol * c.mm;
      return {
        id: 'conv-mol2g-' + Date.now(),
        prompt: `Calculate the mass of ${mol} mol ${c.sym} (${c.name}). (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Use: grams = moles × molar mass. Set up as: mol × (molar mass / 1 mol) = grams',
        steps: [
          `Step 1: Identify.\n  Given: ${mol} mol ${c.sym}\n  Find: grams\n  Molar mass: ${c.mm} g/mol (${c.breakdown})`,
          `Step 2: Set up conversion factor.\n  ${mol} mol ${c.sym} × (${c.mm} g ${c.sym} / 1 mol ${c.sym})`,
          `Step 3: Calculate.\n  = ${mol} × ${c.mm} = ${grams.toFixed(2)} g ${c.sym}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(grams, 3)} g ${c.sym}`,
        ],
      };
    }
    case 'mol2particles': {
      const c = pick(COMPOUNDS);
      const mol = pick([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 0.25, 0.75]);
      const particles = mol * N_A;
      const unit = c.atomsPerMolecule > 2 ? 'molecules' : 'atoms';
      return {
        id: 'conv-mol2p-' + Date.now(),
        prompt: `How many ${unit} are in ${mol} mol of ${c.sym}?`,
        answer: fmtSci(particles, 3) + ' ' + unit,
        hint: `Use: ${unit} = moles × Avogadro's number (6.022 × 10²³)`,
        steps: [
          `Step 1: Identify.\n  Given: ${mol} mol ${c.sym}\n  Find: ${unit}\n  Avogadro's number: 6.022 × 10²³`,
          `Step 2: Choose conversion.\n  ${unit} = moles × 6.022 × 10²³`,
          `Step 3: Calculate.\n  ${unit} = ${mol} × 6.022 × 10²³ = ${fmtSci(particles, 4)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${fmtSci(particles, 3)} ${unit} ${c.sym}`,
        ],
      };
    }
    case 'mol2L': {
      const c = pick(GASES);
      const mol = pick([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 0.25, 0.75]);
      const liters = mol * MOLAR_VOLUME;
      return {
        id: 'conv-mol2L-' + Date.now(),
        prompt: `Calculate the volume of ${mol} mol ${c.sym} at STP.`,
        answer: roundTo(liters, 3) + ' L',
        hint: 'At STP, 1 mol of any gas = 22.4 L. Set up as: mol × (22.4 L / 1 mol) = liters',
        steps: [
          `Step 1: Identify.\n  Given: ${mol} mol ${c.sym} at STP\n  Find: volume (liters)\n  At STP: 1 mol = 22.4 L`,
          `Step 2: Set up conversion factor.\n  ${mol} mol ${c.sym} × (22.4 L ${c.sym} / 1 mol ${c.sym})`,
          `Step 3: Calculate.\n  = ${mol} × 22.4 = ${liters.toFixed(2)} L ${c.sym}`,
          `Step 4: Answer: ${roundTo(liters, 3)} L ${c.sym} at STP`,
        ],
      };
    }
    case 'g2atoms': {
      const e = pick(ELEMENTS);
      const grams = roundTo(randInt(10, 200), 3);
      const mol = grams / e.mm;
      const atoms = mol * N_A;
      return {
        id: 'conv-g2a-' + Date.now(),
        prompt: `How many atoms are in ${grams} g of ${e.sym}? (Molar mass = ${e.mm} g/mol)`,
        answer: fmtSci(atoms, 3) + ' atoms',
        hint: 'Two-step: grams → moles (÷ molar mass), then moles → atoms (× Avogadro\'s number)',
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${e.sym}\n  Find: atoms\n  Molar mass: ${e.sym} = ${e.mm} g/mol\n  Avogadro's: 6.022 × 10²³`,
          `Step 2: Convert grams → moles.\n  moles = ${grams} g ÷ ${e.mm} g/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → atoms.\n  atoms = ${mol.toFixed(4)} × 6.022 × 10²³ = ${fmtSci(atoms, 4)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${fmtSci(atoms, 3)} atoms ${e.sym}`,
        ],
      };
    }
    case 'g2L': {
      const c = pick(GASES);
      const grams = roundTo(randInt(5, 100), 3);
      const mol = grams / c.mm;
      const liters = mol * MOLAR_VOLUME;
      return {
        id: 'conv-g2L-' + Date.now(),
        prompt: `What volume does ${grams} g of ${c.sym} occupy at STP? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: roundTo(liters, 3) + ' L',
        hint: 'Two-step: grams → moles (÷ molar mass), then moles → liters (× 22.4). Chain the conversion factors.',
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${c.sym} at STP\n  Find: volume (liters)\n  Molar mass: ${c.mm} g/mol (${c.breakdown})\n  At STP: 1 mol = 22.4 L`,
          `Step 2: Set up the chain.\n  ${grams} g ${c.sym} × (1 mol / ${c.mm} g) × (22.4 L / 1 mol)`,
          `Step 3: Convert grams → moles.\n  = ${grams} ÷ ${c.mm} = ${mol.toFixed(4)} mol ${c.sym}`,
          `Step 4: Convert moles → liters.\n  = ${mol.toFixed(4)} × 22.4 = ${liters.toFixed(2)} L ${c.sym}`,
          `Step 5: Round to 3 significant figures.\n  Answer: ${roundTo(liters, 3)} L ${c.sym} at STP`,
        ],
      };
    }
    case 'L2particles': {
      const c = pick(GASES);
      const liters = roundTo(randInt(2, 20) * 1.12, 3);
      const mol = liters / MOLAR_VOLUME;
      const particles = mol * N_A;
      const unit = c.atomsPerMolecule > 2 ? 'molecules' : 'atoms';
      return {
        id: 'conv-L2p-' + Date.now(),
        prompt: `How many ${unit} are in ${liters} L of ${c.sym} at STP?`,
        answer: fmtSci(particles, 3) + ' ' + unit,
        hint: 'Two-step: liters → moles (÷ 22.4), then moles → particles (× Avogadro\'s number)',
        steps: [
          `Step 1: Identify.\n  Given: ${liters} L ${c.sym} at STP\n  Find: ${unit}\n  Molar volume: 22.4 L/mol\n  Avogadro's: 6.022 × 10²³`,
          `Step 2: Convert liters → moles.\n  moles = ${liters} L ÷ 22.4 L/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → ${unit}.\n  ${unit} = ${mol.toFixed(4)} × 6.022 × 10²³ = ${fmtSci(particles, 4)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${fmtSci(particles, 3)} ${unit} ${c.sym}`,
        ],
      };
    }
    case 'particles2g': {
      const c = pick(COMPOUNDS);
      const mol = pick([0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0]);
      const particles = mol * N_A;
      const grams = mol * c.mm;
      const unit = c.atomsPerMolecule > 2 ? 'molecules' : 'atoms';
      return {
        id: 'conv-p2g-' + Date.now(),
        prompt: `What mass (in grams) contains ${fmtSci(particles, 3)} ${unit} of ${c.sym}? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Two-step: particles → moles (÷ Avogadro\'s), then moles → grams (× molar mass)',
        steps: [
          `Step 1: Identify.\n  Given: ${fmtSci(particles, 3)} ${unit} ${c.sym}\n  Find: mass (grams)\n  Avogadro's: 6.022 × 10²³\n  Molar mass: ${c.mm} g/mol (${c.breakdown})`,
          `Step 2: Convert ${unit} → moles.\n  moles = ${fmtSci(particles, 3)} ÷ 6.022 × 10²³ = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → grams.\n  mass = ${mol.toFixed(4)} × ${c.mm} = ${grams.toFixed(2)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(grams, 3)} g ${c.sym}`,
        ],
      };
    }
    case 'L2g': {
      const c = pick(GASES);
      const liters = roundTo(randInt(5, 50), 3);
      const mol = liters / MOLAR_VOLUME;
      const grams = mol * c.mm;
      return {
        id: 'conv-L2g-' + Date.now(),
        prompt: `What is the mass of ${liters} L of ${c.sym} at STP? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Two-step: liters → moles (÷ 22.4), then moles → grams (× molar mass)',
        steps: [
          `Step 1: Identify.\n  Given: ${liters} L ${c.sym} at STP\n  Find: mass (grams)\n  Molar volume: 22.4 L/mol\n  Molar mass: ${c.mm} g/mol (${c.breakdown})`,
          `Step 2: Convert liters → moles.\n  moles = ${liters} L ÷ 22.4 L/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → grams.\n  mass = ${mol.toFixed(4)} × ${c.mm} = ${grams.toFixed(2)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(grams, 3)} g ${c.sym}`,
        ],
      };
    }
    case 'g2specificAtom': {
      // grams of compound → count of specific element atoms (3-step)
      const c = pick(COMPOUNDS.filter(c => c.hCount || c.oCount || c.nCount || c.cCount));
      const elInfo = [];
      if (c.hCount) elInfo.push(['H', c.hCount]);
      if (c.oCount) elInfo.push(['O', c.oCount]);
      if (c.nCount) elInfo.push(['N', c.nCount]);
      if (c.cCount) elInfo.push(['C', c.cCount]);
      const [elSym, elPerMol] = pick(elInfo);
      const grams = roundTo(randInt(10, 100), 3);
      const mol = grams / c.mm;
      const molecules = mol * N_A;
      const specificAtoms = molecules * elPerMol;
      return {
        id: 'conv-g2sa-' + Date.now(),
        prompt: `How many ${elSym} atoms are in ${grams} g of ${c.sym}? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: fmtSci(specificAtoms, 3) + ' ' + elSym + ' atoms',
        hint: `Three-step: grams → moles → molecules → ${elSym} atoms. Each ${c.sym} has ${elPerMol} ${elSym} atoms.`,
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${c.sym}\n  Find: ${elSym} atoms\n  Molar mass: ${c.mm} g/mol (${c.breakdown})\n  Avogadro's: 6.022 × 10²³\n  Each ${c.sym} has ${elPerMol} ${elSym} atoms`,
          `Step 2: Convert grams → moles.\n  moles = ${grams} g ÷ ${c.mm} g/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → molecules.\n  molecules = ${mol.toFixed(4)} × 6.022 × 10²³ = ${fmtSci(molecules, 4)}`,
          `Step 4: Convert molecules → ${elSym} atoms.\n  Each ${c.sym} has ${elPerMol} ${elSym}.\n  ${elSym} atoms = ${fmtSci(molecules, 4)} × ${elPerMol} = ${fmtSci(specificAtoms, 4)}`,
          `Step 5: Round to 3 significant figures.\n  Answer: ${fmtSci(specificAtoms, 3)} ${elSym} atoms`,
        ],
      };
    }
    case 'L2specificAtom': {
      const c = pick(GASES.filter(c => c.hCount || c.oCount || c.nCount || c.cCount));
      const elInfo = [];
      if (c.hCount) elInfo.push(['H', c.hCount]);
      if (c.oCount) elInfo.push(['O', c.oCount]);
      if (c.nCount) elInfo.push(['N', c.nCount]);
      if (c.cCount) elInfo.push(['C', c.cCount]);
      const [elSym, elPerMol] = pick(elInfo);
      const liters = roundTo(randInt(2, 20) * 1.12, 3);
      const mol = liters / MOLAR_VOLUME;
      const molecules = mol * N_A;
      const specificAtoms = molecules * elPerMol;
      return {
        id: 'conv-L2sa-' + Date.now(),
        prompt: `How many ${elSym} atoms are in ${liters} L of ${c.sym} at STP? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: fmtSci(specificAtoms, 3) + ' ' + elSym + ' atoms',
        hint: `Three-step: liters → moles → molecules → ${elSym} atoms. Each ${c.sym} has ${elPerMol} ${elSym} atoms.`,
        steps: [
          `Step 1: Identify.\n  Given: ${liters} L ${c.sym} at STP\n  Find: ${elSym} atoms\n  Molar volume: 22.4 L/mol\n  Avogadro's: 6.022 × 10²³\n  Each ${c.sym} has ${elPerMol} ${elSym} atoms`,
          `Step 2: Convert liters → moles.\n  moles = ${liters} L ÷ 22.4 L/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → molecules.\n  molecules = ${mol.toFixed(4)} × 6.022 × 10²³ = ${fmtSci(molecules, 4)}`,
          `Step 4: Convert molecules → ${elSym} atoms.\n  ${elSym} atoms = ${fmtSci(molecules, 4)} × ${elPerMol} = ${fmtSci(specificAtoms, 4)}`,
          `Step 5: Round to 3 significant figures.\n  Answer: ${fmtSci(specificAtoms, 3)} ${elSym} atoms`,
        ],
      };
    }
    case 'atoms2g': {
      const e = pick(ELEMENTS);
      const mol = pick([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 0.25, 0.75, 3.5, 4.0]);
      const atoms = mol * N_A;
      const grams = mol * e.mm;
      return {
        id: 'conv-a2g-' + Date.now(),
        prompt: `A sample contains ${fmtSci(atoms, 3)} atoms of ${e.sym}. What is the mass in grams? (Molar mass = ${e.mm} g/mol)`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Two-step: atoms → moles (÷ Avogadro\'s), then moles → grams (× molar mass)',
        steps: [
          `Step 1: Identify.\n  Given: ${fmtSci(atoms, 3)} atoms ${e.sym}\n  Find: mass (grams)\n  Avogadro's: 6.022 × 10²³\n  Molar mass: ${e.sym} = ${e.mm} g/mol`,
          `Step 2: Convert atoms → moles.\n  moles = ${fmtSci(atoms, 3)} ÷ 6.022 × 10²³ = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → grams.\n  mass = ${mol.toFixed(4)} × ${e.mm} = ${grams.toFixed(2)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(grams, 3)} g ${e.sym}`,
        ],
      };
    }
    case 'g2L3step': {
      // grams of compound → liters at STP (3-step through moles)
      const c = pick(GASES);
      const grams = roundTo(randInt(5, 80), 3);
      const mol = grams / c.mm;
      const liters = mol * MOLAR_VOLUME;
      return {
        id: 'conv-g2L3-' + Date.now(),
        prompt: `How many liters does ${grams} g of ${c.sym} occupy at STP? (Molar mass = ${c.mm} g/mol — ${c.breakdown})`,
        answer: roundTo(liters, 3) + ' L',
        hint: 'Two-step: grams → moles (÷ molar mass), then moles → liters (× 22.4)',
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${c.sym} at STP\n  Find: volume (liters)\n  Molar mass: ${c.mm} g/mol (${c.breakdown})\n  Molar volume: 22.4 L/mol`,
          `Step 2: Convert grams → moles.\n  moles = ${grams} g ÷ ${c.mm} g/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → liters at STP.\n  volume = ${mol.toFixed(4)} × 22.4 = ${liters.toFixed(2)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(liters, 3)} L ${c.sym}`,
        ],
      };
    }
  }
}

// ===== SOHCAHTOA GENERATOR =====
// Generates right triangle problems: find a side or angle using sin/cos/tan

function generateSOHCAHTOA(difficulty) {
  // Pythagorean triples for clean numbers
  const triples = {
    easy: [
      { a: 3, b: 4, c: 5 },
      { a: 6, b: 8, c: 10 },
      { a: 5, b: 12, c: 13 },
      { a: 8, b: 15, c: 17 },
    ],
    medium: [
      { a: 7, b: 24, c: 25 },
      { a: 9, b: 40, c: 41 },
      { a: 11, b: 60, c: 61 },
      { a: 12, b: 35, c: 37 },
    ],
    hard: [
      { a: 20, b: 21, c: 29 },
      { a: 28, b: 45, c: 53 },
      { a: 33, b: 56, c: 65 },
      { a: 16, b: 63, c: 65 },
    ],
  };

  const t = pick(triples[difficulty]);
  // Randomly decide: find a side (given angle + side) or find an angle (given two sides)
  const problemType = pick(['findSide', 'findSide', 'findAngle']); // weight sides more

  if (problemType === 'findSide') {
    // Pick which side is unknown, give an angle and a side
    const angles = {
      easy: [
        { deg: 37, sin: 0.602, cos: 0.799, tan: 0.753, label: '37°' },  // 3-4-5
        { deg: 53, sin: 0.799, cos: 0.602, tan: 1.333, label: '53°' },
      ],
      medium: [
        { deg: 16, sin: 0.276, cos: 0.961, tan: 0.287, label: '16.3°' },
        { deg: 74, sin: 0.961, cos: 0.276, tan: 3.49, label: '73.7°' },
      ],
      hard: [
        { deg: 43, sin: 0.682, cos: 0.731, tan: 0.933, label: '43.6°' },
        { deg: 46, sin: 0.731, cos: 0.682, tan: 1.07, label: '46.4°' },
      ],
    };
    const ang = pick(angles[difficulty]);
    const unknown = pick(['opposite', 'adjacent', 'hypotenuse']);

    if (unknown === 'opposite') {
      // Given angle + hypotenuse, find opposite: sin(θ) = opp/hyp → opp = hyp × sin(θ)
      const hyp = t.c;
      const opp = t.a; // we know the answer from the triple
      const ratio = 'sin';
      return {
        id: 'soh-findOpp-' + Date.now(),
        prompt: `A right triangle has a hypotenuse of ${hyp} and an angle of ${ang.label}. Find the length of the side opposite to the angle. (Round to 2 decimal places)`,
        answer: opp + '',
        hint: `Use SOH: sin(θ) = opposite / hypotenuse. So opposite = hypotenuse × sin(${ang.label}).`,
        steps: [
          `Step 1: Identify what you know.\n  Hypotenuse = ${hyp}\n  Angle = ${ang.label}\n  Find: opposite side`,
          `Step 2: Choose the right ratio.\n  We have hypotenuse and need opposite → use SOH\n  sin(θ) = opposite / hypotenuse`,
          `Step 3: Rearrange to solve for opposite.\n  opposite = hypotenuse × sin(θ)\n  opposite = ${hyp} × sin(${ang.label})\n  opposite = ${hyp} × ${ang.sin}`,
          `Step 4: Calculate.\n  opposite = ${(hyp * ang.sin).toFixed(2)}\n  Answer: ${opp}`,
        ],
      };
    } else if (unknown === 'adjacent') {
      // Given angle + hypotenuse, find adjacent: cos(θ) = adj/hyp → adj = hyp × cos(θ)
      const hyp = t.c;
      const adj = t.b;
      return {
        id: 'soh-findAdj-' + Date.now(),
        prompt: `A right triangle has a hypotenuse of ${hyp} and an angle of ${ang.label}. Find the length of the side adjacent to the angle. (Round to 2 decimal places)`,
        answer: adj + '',
        hint: `Use CAH: cos(θ) = adjacent / hypotenuse. So adjacent = hypotenuse × cos(${ang.label}).`,
        steps: [
          `Step 1: Identify what you know.\n  Hypotenuse = ${hyp}\n  Angle = ${ang.label}\n  Find: adjacent side`,
          `Step 2: Choose the right ratio.\n  We have hypotenuse and need adjacent → use CAH\n  cos(θ) = adjacent / hypotenuse`,
          `Step 3: Rearrange to solve for adjacent.\n  adjacent = hypotenuse × cos(θ)\n  adjacent = ${hyp} × cos(${ang.label})\n  adjacent = ${hyp} × ${ang.cos}`,
          `Step 4: Calculate.\n  adjacent = ${(hyp * ang.cos).toFixed(2)}\n  Answer: ${adj}`,
        ],
      };
    } else {
      // Given angle + opposite, find hypotenuse: sin(θ) = opp/hyp → hyp = opp/sin(θ)
      const opp = t.a;
      const hyp = t.c;
      return {
        id: 'soh-findHyp-' + Date.now(),
        prompt: `A right triangle has an opposite side of ${opp} and an angle of ${ang.label}. Find the hypotenuse. (Round to 2 decimal places)`,
        answer: hyp + '',
        hint: `Use SOH: sin(θ) = opposite / hypotenuse. So hypotenuse = opposite / sin(${ang.label}).`,
        steps: [
          `Step 1: Identify what you know.\n  Opposite = ${opp}\n  Angle = ${ang.label}\n  Find: hypotenuse`,
          `Step 2: Choose the right ratio.\n  We have opposite and need hypotenuse → use SOH\n  sin(θ) = opposite / hypotenuse`,
          `Step 3: Rearrange to solve for hypotenuse.\n  hypotenuse = opposite / sin(θ)\n  hypotenuse = ${opp} / sin(${ang.label})\n  hypotenuse = ${opp} / ${ang.sin}`,
          `Step 4: Calculate.\n  hypotenuse = ${(opp / ang.sin).toFixed(2)}\n  Answer: ${hyp}`,
        ],
      };
    }
  } else {
    // findAngle: given two sides, find the angle
    const sidePair = pick([
      { known: 'opposite', value: t.a, other: 'adjacent', otherVal: t.b, ratio: 'tan', fn: Math.atan, label: 'tan' },
      { known: 'opposite', value: t.a, other: 'hypotenuse', otherVal: t.c, ratio: 'sin', fn: Math.asin, label: 'sin' },
      { known: 'adjacent', value: t.b, other: 'hypotenuse', otherVal: t.c, ratio: 'cos', fn: Math.acos, label: 'cos' },
    ]);
    const angleDeg = Math.round(sidePair.fn(sidePair.value / sidePair.otherVal) * 180 / Math.PI);
    const ratioVal = (sidePair.value / sidePair.otherVal).toFixed(3);
    return {
      id: 'soh-findAng-' + Date.now(),
      prompt: `A right triangle has ${sidePair.known} = ${sidePair.value} and ${sidePair.other} = ${sidePair.otherVal}. Find the angle θ. (Round to the nearest degree)`,
      answer: angleDeg + '°',
      hint: `Use ${sidePair.label.toUpperCase()}: ${sidePair.label}(θ) = ${sidePair.known} / ${sidePair.other}. Then use inverse ${sidePair.label} (sin⁻¹, cos⁻¹, or tan⁻¹).`,
      steps: [
        `Step 1: Identify what you know.\n  ${sidePair.known} = ${sidePair.value}\n  ${sidePair.other} = ${sidePair.otherVal}\n  Find: angle θ`,
        `Step 2: Choose the right ratio.\n  We have ${sidePair.known} and ${sidePair.other} → use ${sidePair.label.toUpperCase()}\n  ${sidePair.label}(θ) = ${sidePair.known} / ${sidePair.other}`,
        `Step 3: Plug in values.\n  ${sidePair.label}(θ) = ${sidePair.value} / ${sidePair.otherVal} = ${ratioVal}`,
        `Step 4: Use inverse function to find θ.\n  θ = ${sidePair.label}⁻¹(${ratioVal})\n  θ = ${angleDeg}°`,
      ],
    };
  }
}

// ===== BASIC ALGEBRA GENERATOR =====
// Generates solve-for-X problems: one-step and two-step equations

function generateAlgebra(difficulty) {
  const types = {
    easy: ['oneStepAdd', 'oneStepSub', 'oneStepMul', 'oneStepDiv'],
    medium: ['twoStep', 'twoStep', 'distributive', 'twoStepNeg'],
    hard: ['multiStep', 'bothSides', 'fractional', 'distributiveBoth'],
  };
  const type = pick(types[difficulty]);

  switch (type) {
    case 'oneStepAdd': {
      const x = randInt(2, 20);
      const b = randInt(3, 15);
      return {
        id: 'alg-add-' + Date.now(),
        prompt: `Solve for x:  x + ${b} = ${x + b}`,
        answer: x + '',
        hint: 'Subtract the same number from both sides to isolate x.',
        steps: [
          `Step 1: Identify the equation.\n  x + ${b} = ${x + b}`,
          `Step 2: To isolate x, subtract ${b} from both sides.\n  x + ${b} - ${b} = ${x + b} - ${b}`,
          `Step 3: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'oneStepSub': {
      const x = randInt(5, 25);
      const b = randInt(2, 10);
      return {
        id: 'alg-sub-' + Date.now(),
        prompt: `Solve for x:  x - ${b} = ${x - b}`,
        answer: x + '',
        hint: 'Add the same number to both sides to isolate x.',
        steps: [
          `Step 1: Identify the equation.\n  x - ${b} = ${x - b}`,
          `Step 2: To isolate x, add ${b} to both sides.\n  x - ${b} + ${b} = ${x - b} + ${b}`,
          `Step 3: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'oneStepMul': {
      const x = randInt(2, 12);
      const a = randInt(2, 7);
      return {
        id: 'alg-mul-' + Date.now(),
        prompt: `Solve for x:  ${a}x = ${a * x}`,
        answer: x + '',
        hint: 'Divide both sides by the coefficient of x.',
        steps: [
          `Step 1: Identify the equation.\n  ${a}x = ${a * x}`,
          `Step 2: To isolate x, divide both sides by ${a}.\n  ${a}x / ${a} = ${a * x} / ${a}`,
          `Step 3: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'oneStepDiv': {
      const x = randInt(3, 15);
      const a = randInt(2, 6);
      return {
        id: 'alg-div-' + Date.now(),
        prompt: `Solve for x:  x / ${a} = ${x}`,
        answer: x + '',
        hint: 'Multiply both sides by the denominator.',
        steps: [
          `Step 1: Identify the equation.\n  x / ${a} = ${x}`,
          `Step 2: To isolate x, multiply both sides by ${a}.\n  (x / ${a}) × ${a} = ${x} × ${a}`,
          `Step 3: Simplify.\n  x = ${x * a}`,
        ],
      };
    }
    case 'twoStep': {
      const x = randInt(2, 12);
      const a = randInt(2, 6);
      const b = randInt(3, 15);
      const result = a * x + b;
      return {
        id: 'alg-two-' + Date.now(),
        prompt: `Solve for x:  ${a}x + ${b} = ${result}`,
        answer: x + '',
        hint: 'Two steps: first subtract the constant from both sides, then divide by the coefficient.',
        steps: [
          `Step 1: Identify the equation.\n  ${a}x + ${b} = ${result}`,
          `Step 2: Subtract ${b} from both sides (undo the addition).\n  ${a}x = ${result - b}`,
          `Step 3: Divide both sides by ${a} (undo the multiplication).\n  x = ${result - b} / ${a}`,
          `Step 4: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'twoStepNeg': {
      const x = randInt(2, 12);
      const a = randInt(2, 6);
      const b = randInt(3, 15);
      const result = a * x - b;
      return {
        id: 'alg-twoNeg-' + Date.now(),
        prompt: `Solve for x:  ${a}x - ${b} = ${result}`,
        answer: x + '',
        hint: 'Two steps: first add the constant to both sides, then divide by the coefficient.',
        steps: [
          `Step 1: Identify the equation.\n  ${a}x - ${b} = ${result}`,
          `Step 2: Add ${b} to both sides (undo the subtraction).\n  ${a}x = ${result + b}`,
          `Step 3: Divide both sides by ${a} (undo the multiplication).\n  x = ${result + b} / ${a}`,
          `Step 4: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'distributive': {
      const x = randInt(2, 10);
      const a = randInt(2, 5);
      const b = randInt(2, 8);
      const c = randInt(3, 12);
      const result = a * x + a * b + c;
      return {
        id: 'alg-dist-' + Date.now(),
        prompt: `Solve for x:  ${a}(x + ${b}) + ${c} = ${result}`,
        answer: x + '',
        hint: 'First distribute (multiply the number outside the parentheses by each term inside), then solve the two-step equation.',
        steps: [
          `Step 1: Distribute ${a} into (x + ${b}).\n  ${a}x + ${a * b} + ${c} = ${result}`,
          `Step 2: Combine constant terms.\n  ${a}x + ${a * b + c} = ${result}`,
          `Step 3: Subtract ${a * b + c} from both sides.\n  ${a}x = ${result - (a * b + c)}`,
          `Step 4: Divide both sides by ${a}.\n  x = ${result - (a * b + c)} / ${a} = ${x}`,
        ],
      };
    }
    case 'multiStep': {
      const x = randInt(3, 15);
      const a = randInt(2, 5);
      const b = randInt(2, 8);
      const c = randInt(2, 6);
      // a*x + b = c*x + d  →  (a-c)*x = d-b
      const d = a * x + b - c * x;
      return {
        id: 'alg-multi-' + Date.now(),
        prompt: `Solve for x:  ${a}x + ${b} = ${c}x + ${d}`,
        answer: x + '',
        hint: 'Get all x terms on one side and all constants on the other. Move variables to the left, constants to the right.',
        steps: [
          `Step 1: Move x terms to one side.\n  Subtract ${c}x from both sides:\n  ${a - c}x + ${b} = ${d}`,
          `Step 2: Move constants to the other side.\n  Subtract ${b} from both sides:\n  ${a - c}x = ${d - b}`,
          `Step 3: Divide both sides by ${a - c}.\n  x = ${d - b} / ${a - c}`,
          `Step 4: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'bothSides': {
      const x = randInt(2, 12);
      const a = randInt(3, 8);
      const b = randInt(3, 10);
      // a + x = b + x + k  →  not useful. Let's do: 2x + a = x + b
      const result = 2 * x + a;
      const bVal = x + a;
      return {
        id: 'alg-both-' + Date.now(),
        prompt: `Solve for x:  2x + ${a} = x + ${result - x}`,
        answer: x + '',
        hint: 'Subtract x from both sides first, then subtract the constant.',
        steps: [
          `Step 1: Subtract x from both sides.\n  2x - x + ${a} = ${result - x}\n  x + ${a} = ${result - x}`,
          `Step 2: Subtract ${a} from both sides.\n  x = ${result - x - a}`,
          `Step 3: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'fractional': {
      const x = randInt(2, 15);
      const a = randInt(2, 6);
      const b = randInt(3, 12);
      // (x + a) / b = result
      const result = (x + a) / b;
      if ((x + a) % b !== 0) return generateAlgebra(difficulty); // ensure clean answer
      return {
        id: 'alg-frac-' + Date.now(),
        prompt: `Solve for x:  (x + ${a}) / ${b} = ${result}`,
        answer: x + '',
        hint: 'First multiply both sides by the denominator to clear the fraction, then subtract the constant.',
        steps: [
          `Step 1: Multiply both sides by ${b} (clear the fraction).\n  x + ${a} = ${result * b}`,
          `Step 2: Subtract ${a} from both sides.\n  x = ${result * b - a}`,
          `Step 3: Simplify.\n  x = ${x}`,
        ],
      };
    }
    case 'distributiveBoth': {
      const x = randInt(2, 10);
      const a = randInt(2, 4);
      const b = randInt(2, 6);
      const c = randInt(2, 4);
      const d = randInt(2, 6);
      // a(x + b) = c(x + d)  →  ax + ab = cx + cd  →  (a-c)x = cd - ab
      const cd = c * d;
      const ab = a * b;
      const diff = a - c;
      if (diff === 0 || (cd - ab) % diff !== 0) return generateAlgebra(difficulty);
      return {
        id: 'alg-distBoth-' + Date.now(),
        prompt: `Solve for x:  ${a}(x + ${b}) = ${c}(x + ${d})`,
        answer: x + '',
        hint: 'Distribute both sides first, then get all x terms on one side and constants on the other.',
        steps: [
          `Step 1: Distribute both sides.\n  ${a}x + ${ab} = ${c}x + ${cd}`,
          `Step 2: Subtract ${c}x from both sides.\n  ${diff}x + ${ab} = ${cd}`,
          `Step 3: Subtract ${ab} from both sides.\n  ${diff}x = ${cd - ab}`,
          `Step 4: Divide both sides by ${diff}.\n  x = ${cd - ab} / ${diff} = ${x}`,
        ],
      };
    }
  }
}

// ===== PARTICULATE DIAGRAM GENERATOR =====
// Text-based questions about interpreting particulate diagrams
// Covers: phases, gas behavior, solvation, alloys, ionic vs covalent, concentration

function generateParticulate(difficulty) {
  const types = {
    easy: ['countAtoms', 'identifyPhase', 'ionRatio', 'solvation', 'alloyType'],
    medium: ['gasChange', 'concentration', 'covalentVsIonic', 'countAtomsComplex', 'solvationDetail'],
    hard: ['gasChangeComplex', 'concentrationRatio', 'chemicalVsPhysical', 'multiStepCount', 'pistonScenario'],
  };
  const type = pick(types[difficulty]);

  switch (type) {
    case 'countAtoms': {
      const molecules = randInt(2, 6);
      const compounds = [
        { sym: 'H₂O', hCount: 2, oCount: 1, total: 3 },
        { sym: 'CO₂', cCount: 1, oCount: 2, total: 3 },
        { sym: 'NH₃', nCount: 1, hCount: 3, total: 4 },
        { sym: 'CH₄', cCount: 1, hCount: 4, total: 5 },
      ];
      const c = pick(compounds);
      const element = pick(Object.keys(c).filter(k => k.endsWith('Count')));
      const elName = element.replace('Count', '').toUpperCase();
      const count = c[element];
      const total = molecules * count;
      return {
        id: 'part-count-' + Date.now(),
        prompt: `A particulate diagram shows ${molecules} molecules of ${c.sym}. How many ${elName} atoms are shown in total?`,
        answer: total + '',
        hint: `Each ${c.sym} molecule has ${count} ${elName} atoms. Multiply by the number of molecules.`,
        steps: [
          `Step 1: Identify what's in the diagram.\n  ${molecules} molecules of ${c.sym}`,
          `Step 2: Count atoms per molecule.\n  Each ${c.sym} has ${count} ${elName} atoms`,
          `Step 3: Multiply.\n  ${molecules} × ${count} = ${total} ${elName} atoms`,
        ],
      };
    }
    case 'identifyPhase': {
      const phases = [
        { desc: 'molecules locked in a rigid, fixed lattice with no movement', answer: 'solid', explain: 'In a solid, particles are locked in fixed positions in a lattice. They vibrate but don\'t move past each other.' },
        { desc: 'molecules close together but sliding past each other', answer: 'liquid', explain: 'In a liquid, particles are close but can flow past each other. No fixed shape, but fixed volume.' },
        { desc: 'molecules spread far apart, moving fast with long arrows', answer: 'gas', explain: 'In a gas, particles are far apart and move freely at high speed. No fixed shape or volume.' },
        { desc: 'ions arranged in a regular 3D crystal pattern of alternating + and − charges', answer: 'solid (ionic)', explain: 'Ionic compounds form crystal lattices in solid state — regular 3D arrangement of alternating cations and anions.' },
      ];
      const p = pick(phases);
      return {
        id: 'part-phase-' + Date.now(),
        prompt: `A particulate diagram shows ${p.desc}. What phase/state is this?`,
        answer: p.answer,
        hint: 'Think about how particles are arranged and whether they move.',
        steps: [
          `Step 1: Observe the diagram.\n  ${p.desc}`,
          `Step 2: Match to phase characteristics.\n  ${p.explain}`,
          `Step 3: Answer: ${p.answer}`,
        ],
      };
    }
    case 'ionRatio': {
      const compounds = [
        { sym: 'MgCl₂', cation: 'Mg²⁺', anion: 'Cl⁻', catCount: 1, anCount: 2, ratio: '1:2' },
        { sym: 'NaCl', cation: 'Na⁺', anion: 'Cl⁻', catCount: 1, anCount: 1, ratio: '1:1' },
        { sym: 'CaF₂', cation: 'Ca²⁺', anion: 'F⁻', catCount: 1, anCount: 2, ratio: '1:2' },
        { sym: 'K₂O', cation: 'K⁺', anion: 'O²⁻', catCount: 2, anCount: 1, ratio: '2:1' },
        { sym: 'Al₂O₃', cation: 'Al³⁺', anion: 'O²⁻', catCount: 2, anCount: 3, ratio: '2:3' },
        { sym: 'Na₂S', cation: 'Na⁺', anion: 'S²⁻', catCount: 2, anCount: 1, ratio: '2:1' },
      ];
      const c = pick(compounds);
      return {
        id: 'part-ionRatio-' + Date.now(),
        prompt: `A particulate diagram shows ${c.sym} dissolved in water. What is the ratio of ${c.cation} to ${c.anion} ions? (Write as cation:anion, e.g. 1:2)`,
        answer: c.ratio,
        hint: `Balance the charges. ${c.cation} has charge ${c.cation.match(/[⁺⁻²³]+/)[0]}, ${c.anion} has charge ${c.anion.match(/[⁺⁻²³]+/)[0]}. How many of each makes the total charge zero?`,
        steps: [
          `Step 1: Identify the ions.\n  Cation: ${c.cation}\n  Anion: ${c.anion}`,
          `Step 2: Balance the charges.\n  ${c.catCount} × ${c.cation} + ${c.anCount} × ${c.anion} = 0`,
          `Step 3: Write the ratio.\n  ${c.cation}:${c.anion} = ${c.ratio}`,
        ],
      };
    }
    case 'solvation': {
      const scenarios = [
        { ion: 'Na⁺', charge: 'positive', correctEnd: 'oxygen (δ−)', wrongEnd: 'hydrogen (δ+)', explain: 'Na⁺ is positive → attracted to the negative end of water = oxygen (δ−)' },
        { ion: 'Cl⁻', charge: 'negative', correctEnd: 'hydrogen (δ+)', wrongEnd: 'oxygen (δ−)', explain: 'Cl⁻ is negative → attracted to the positive end of water = hydrogen (δ+)' },
        { ion: 'K⁺', charge: 'positive', correctEnd: 'oxygen (δ−)', wrongEnd: 'hydrogen (δ+)', explain: 'K⁺ is positive → attracted to the negative end of water = oxygen (δ−)' },
        { ion: 'Mg²⁺', charge: 'positive', correctEnd: 'oxygen (δ−)', wrongEnd: 'hydrogen (δ+)', explain: 'Mg²⁺ is positive → attracted to the negative end of water = oxygen (δ−)' },
        { ion: 'F⁻', charge: 'negative', correctEnd: 'hydrogen (δ+)', wrongEnd: 'oxygen (δ−)', explain: 'F⁻ is negative → attracted to the positive end of water = hydrogen (δ+)' },
      ];
      const s = pick(scenarios);
      return {
        id: 'part-solv-' + Date.now(),
        prompt: `During solvation, which end of the water molecule surrounds the ${s.ion} ion?`,
        answer: s.correctEnd,
        hint: 'Water is polar. Oxygen is δ− (negative), hydrogen is δ+. Opposite charges attract.',
        steps: [
          `Step 1: Identify the ion's charge.\n  ${s.ion} is ${s.charge}`,
          `Step 2: Recall water's polarity.\n  Oxygen = δ− (negative end)\n  Hydrogen = δ+ (positive end)`,
          `Step 3: Opposite charges attract.\n  ${s.explain}`,
          `Step 4: Answer: ${s.correctEnd}`,
        ],
      };
    }
    case 'alloyType': {
      const alloys = [
        { desc: 'copper atoms replaced by tin atoms of similar size', answer: 'substitutional', explain: 'Substitutional alloy: similar-size atoms replace each other in the lattice. Bronze = Cu + Sn.' },
        { desc: 'small carbon atoms fit into gaps between iron atoms', answer: 'interstitial', explain: 'Interstitial alloy: small atoms fill the gaps (interstices) between larger atoms. Steel = Fe + C.' },
        { desc: 'zinc atoms replace copper atoms of similar size', answer: 'substitutional', explain: 'Substitutional: similar-size atoms replace each other. Brass = Cu + Zn.' },
        { desc: 'small nitrogen atoms fit into gaps in the iron lattice', answer: 'interstitial', explain: 'Interstitial: small atoms fill gaps between larger atoms. Nitrogen in iron.' },
      ];
      const a = pick(alloys);
      return {
        id: 'part-alloy-' + Date.now(),
        prompt: `A particulate diagram shows ${a.desc}. What type of alloy is this?`,
        answer: a.answer,
        hint: 'Substitutional = similar-size atoms replace each other. Interstitial = small atoms fill gaps.',
        steps: [
          `Step 1: Observe the diagram.\n  ${a.desc}`,
          `Step 2: Determine if atoms are replacing or filling gaps.\n  ${a.explain}`,
          `Step 3: Answer: ${a.answer}`,
        ],
      };
    }
    case 'gasChange': {
      const changes = [
        { before: 'normal arrows, normal spacing', after: 'longer arrows, same spacing', answer: 'temperature increased at constant volume', explain: 'Longer arrows = faster particles = higher temp. Same spacing = same volume. Volume is constant.' },
        { before: 'normal arrows, normal spacing', after: 'same arrows, particles closer together', answer: 'pressure increased at constant temperature', explain: 'Same arrows = same temp. Closer = smaller volume. External pressure compressed the gas.' },
        { before: 'normal arrows, normal spacing', after: 'longer arrows, particles farther apart', answer: 'temperature increased at constant pressure', explain: 'Longer arrows = higher temp. Farther apart = larger volume. At constant pressure, heating expands gas (Charles\'s Law).' },
        { before: 'longer arrows, normal spacing', after: 'normal arrows, normal spacing', answer: 'temperature decreased at constant volume', explain: 'Shorter arrows = slower particles = lower temp. Same spacing = same volume.' },
      ];
      const c = pick(changes);
      return {
        id: 'part-gas-' + Date.now(),
        prompt: `A gas in a piston shows: BEFORE — ${c.before}. AFTER — ${c.after}. What changed?`,
        answer: c.answer,
        hint: 'Arrow length = speed = temperature. Spacing = volume. What stayed the same and what changed?',
        steps: [
          `Step 1: Compare arrows (speed/temperature).\n  Before: ${c.before}\n  After: ${c.after}`,
          `Step 2: Compare spacing (volume).\n  Did the spacing change?`,
          `Step 3: Identify what stayed constant.\n  ${c.explain}`,
          `Step 4: Answer: ${c.answer}`,
        ],
      };
    }
    case 'concentration': {
      const moleculesA = randInt(3, 8);
      const ratio = pick([2, 3, 0.5]);
      const moleculesB = Math.round(moleculesA * ratio);
      const volA = randInt(1, 3);
      const volB = pick([volA, volA, volA]); // usually same volume
      const concA = moleculesA / volA;
      const concB = moleculesB / volB;
      const ratioStr = concB > concA ? Math.round(concB / concA) + '×' : Math.round(concA / concB) + '×';
      const higher = concB > concA ? 'B' : 'A';
      return {
        id: 'part-conc-' + Date.now(),
        prompt: `Two flasks have the same volume. Flask A has ${moleculesA} molecules. Flask B has ${moleculesB} molecules. Which flask has higher concentration, and by what factor? (e.g. "B 2×")`,
        answer: `${higher} ${ratioStr}`,
        hint: 'Concentration = molecules per volume. Same volume, so just compare molecule counts.',
        steps: [
          `Step 1: Count molecules.\n  Flask A: ${moleculesA} molecules\n  Flask B: ${moleculesB} molecules`,
          `Step 2: Compare volumes.\n  Both flasks have the same volume`,
          `Step 3: Concentration = molecules / volume.\n  Flask A: ${moleculesA} / ${volA}\n  Flask B: ${moleculesB} / ${volB}`,
          `Step 4: Flask ${higher} has higher concentration by ${ratioStr}`,
        ],
      };
    }
    case 'covalentVsIonic': {
      const scenarios = [
        { desc: 'molecules stay intact in water, no separate ions visible', answer: 'covalent (molecular)', explain: 'Covalent solutes don\'t ionize — molecules stay intact. Example: sugar, HF (weak acid).' },
        { desc: 'the compound breaks apart into separate cations and anions surrounded by water', answer: 'ionic', explain: 'Ionic compounds dissociate into separate ions in water. Example: NaCl → Na⁺ + Cl⁻.' },
        { desc: 'molecules remain as whole units, no charged particles visible', answer: 'covalent (molecular)', explain: 'No dissociation = covalent. The molecules don\'t break into ions.' },
        { desc: 'positive and negative ions separate and are surrounded by water molecules', answer: 'ionic', explain: 'Ions separate = ionic compound dissociating. Solvation occurs.' },
      ];
      const s = pick(scenarios);
      return {
        id: 'part-cvi-' + Date.now(),
        prompt: `A particulate diagram shows a solute dissolving in water: ${s.desc}. Is the solute ionic or covalent (molecular)?`,
        answer: s.answer,
        hint: 'Ionic compounds break into separate ions. Covalent compounds stay as intact molecules.',
        steps: [
          `Step 1: Observe what happens to the solute.\n  ${s.desc}`,
          `Step 2: Did it break into ions or stay as molecules?\n  ${s.explain}`,
          `Step 3: Answer: ${s.answer}`,
        ],
      };
    }
    case 'countAtomsComplex': {
      const molecules = randInt(3, 8);
      const compounds = [
        { sym: 'C₆H₁₂O₆', hCount: 12, cCount: 6, oCount: 6 },
        { sym: 'C₂H₆', hCount: 6, cCount: 2 },
        { sym: 'NH₃', hCount: 3, nCount: 1 },
        { sym: 'CH₄', hCount: 4, cCount: 1 },
      ];
      const c = pick(compounds);
      const elements = Object.keys(c).filter(k => k.endsWith('Count'));
      const element = pick(elements);
      const elName = element.replace('Count', '').toUpperCase();
      const count = c[element];
      const total = molecules * count;
      return {
        id: 'part-countC-' + Date.now(),
        prompt: `A particulate diagram shows ${molecules} molecules of ${c.sym}. How many ${elName} atoms are shown in total?`,
        answer: total + '',
        hint: `Each ${c.sym} molecule contains ${count} ${elName} atoms. Count = molecules × atoms per molecule.`,
        steps: [
          `Step 1: Identify molecules in diagram.\n  ${molecules} molecules of ${c.sym}`,
          `Step 2: Count ${elName} atoms per molecule.\n  Each ${c.sym} has ${count} ${elName}`,
          `Step 3: Multiply.\n  ${molecules} × ${count} = ${total} ${elName} atoms`,
        ],
      };
    }
    case 'solvationDetail': {
      const ions = [
        { ion: 'Mg²⁺', charge: '+2', end: 'oxygen (δ−)', count: 6 },
        { ion: 'Na⁺', charge: '+1', end: 'oxygen (δ−)', count: 6 },
        { ion: 'Cl⁻', charge: '-1', end: 'hydrogen (δ+)', count: 6 },
        { ion: 'Ca²⁺', charge: '+2', end: 'oxygen (δ−)', count: 6 },
      ];
      const i = pick(ions);
      return {
        id: 'part-solvD-' + Date.now(),
        prompt: `In a particulate diagram of ${i.ion} being solvated by water, which end of water points toward the ion, and why?`,
        answer: i.end + ' — opposite charges attract',
        hint: 'Water is polar. The ion has a charge. Which end of water has the opposite charge?',
        steps: [
          `Step 1: Identify the ion's charge.\n  ${i.ion} has charge ${i.charge}`,
          `Step 2: Recall water's polarity.\n  Oxygen = δ− (negative)\n  Hydrogen = δ+ (positive)`,
          `Step 3: Opposite charges attract.\n  ${i.ion} (${i.charge}) → attracted to ${i.end}`,
          `Step 4: Answer: ${i.end} — opposite charges attract`,
        ],
      };
    }
    case 'gasChangeComplex': {
      const changes = [
        { before: 'longer arrows, normal spacing', after: 'shorter arrows, particles closer together', answer: 'temperature decreased and pressure increased', explain: 'Shorter arrows = lower temp. Closer = smaller volume (higher pressure). Both temp down and pressure up.' },
        { before: 'normal arrows, particles far apart', after: 'longer arrows, particles closer together', answer: 'temperature increased and pressure increased', explain: 'Longer arrows = higher temp. Closer = smaller volume. Temp up + pressure up (compressed and heated).' },
        { before: 'longer arrows, particles far apart', after: 'shorter arrows, particles closer together', answer: 'temperature decreased and pressure increased', explain: 'Shorter arrows = lower temp. Closer = compressed. Temp down, pressure up.' },
      ];
      const c = pick(changes);
      return {
        id: 'part-gasC-' + Date.now(),
        prompt: `A gas in a piston shows: BEFORE — ${c.before}. AFTER — ${c.after}. What TWO things changed?`,
        answer: c.answer,
        hint: 'Check arrows (temp) AND spacing (volume/pressure) separately. Both changed.',
        steps: [
          `Step 1: Compare arrows.\n  Before: ${c.before}\n  After: ${c.after}\n  Arrow change → temperature changed`,
          `Step 2: Compare spacing.\n  Spacing change → volume/pressure changed`,
          `Step 3: ${c.explain}`,
          `Step 4: Answer: ${c.answer}`,
        ],
      };
    }
    case 'concentrationRatio': {
      const moleculesA = randInt(4, 12);
      const volA = pick([1, 2]);
      const moleculesB = randInt(4, 12);
      const volB = pick([1, 2, 3]);
      const concA = moleculesA / volA;
      const concB = moleculesB / volB;
      const ratio = (Math.max(concA, concB) / Math.min(concA, concB)).toFixed(1);
      const higher = concB > concA ? 'B' : (concA > concB ? 'A' : 'equal');
      if (higher === 'equal') return generateParticulate(difficulty);
      return {
        id: 'part-concR-' + Date.now(),
        prompt: `Flask A: ${moleculesA} molecules in ${volA}L. Flask B: ${moleculesB} molecules in ${volB}L. Which has higher concentration and by what factor? (e.g. "B 2.0×")`,
        answer: `${higher} ${ratio}×`,
        hint: 'Concentration = molecules ÷ volume. Calculate each, then divide the larger by the smaller.',
        steps: [
          `Step 1: Calculate concentration of A.\n  ${moleculesA} molecules ÷ ${volA}L = ${concA} mol/L`,
          `Step 2: Calculate concentration of B.\n  ${moleculesB} molecules ÷ ${volB}L = ${concB} mol/L`,
          `Step 3: Compare.\n  ${concA} vs ${concB}`,
          `Step 4: Flask ${higher} is higher by ${ratio}×`,
        ],
      };
    }
    case 'chemicalVsPhysical': {
      const scenarios = [
        { desc: 'iron atoms and sulfur atoms are separate, not bonded', answer: 'mixture (physical)', explain: 'Mixture = elements visible separately, no chemical bonding. Can be separated physically.' },
        { desc: 'iron and sulfur atoms are bonded together in a fixed 1:1 ratio as FeS', answer: 'compound (chemical)', explain: 'Compound = atoms chemically bonded in fixed ratio. New substance formed = chemical change.' },
        { desc: 'water molecules moving from liquid to gas phase', answer: 'physical change', explain: 'Phase change = physical. Same substance (H₂O), just different state. No new substance.' },
        { desc: 'H₂ and O₂ molecules reacting to form H₂O molecules', answer: 'chemical change', explain: 'New substance (water) formed from different substances. Bonds broken and formed.' },
        { desc: 'NaCl dissolving in water, ions separate but no new substance formed', answer: 'physical change', explain: 'Dissolving = physical. The ions are still Na⁺ and Cl⁻, just separated. Can recover by evaporation.' },
      ];
      const s = pick(scenarios);
      return {
        id: 'part-cvp-' + Date.now(),
        prompt: `A particulate diagram shows: ${s.desc}. Is this a chemical or physical change (or mixture)?`,
        answer: s.answer,
        hint: 'Chemical = new substance formed (bonds broken/formed). Physical = same substance, different state/arrangement.',
        steps: [
          `Step 1: Observe the diagram.\n  ${s.desc}`,
          `Step 2: Were any new substances formed?\n  ${s.explain}`,
          `Step 3: Answer: ${s.answer}`,
        ],
      };
    }
    case 'multiStepCount': {
      const molecules = randInt(2, 5);
      const compounds = [
        { sym: 'H₂O', hCount: 2, oCount: 1 },
        { sym: 'CO₂', cCount: 1, oCount: 2 },
        { sym: 'NH₃', nCount: 1, hCount: 3 },
        { sym: 'CH₄', cCount: 1, hCount: 4 },
      ];
      const c = pick(compounds);
      const elements = Object.keys(c).filter(k => k.endsWith('Count'));
      const element = pick(elements);
      const elName = element.replace('Count', '').toUpperCase();
      const count = c[element];
      const total = molecules * count;
      // Also ask for total atoms
      const totalAtoms = molecules * Object.values(c).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0);
      const askTotal = pick([true, false]);
      if (askTotal) {
        return {
          id: 'part-multi-' + Date.now(),
          prompt: `A particulate diagram shows ${molecules} molecules of ${c.sym}. How many total atoms are shown?`,
          answer: totalAtoms + '',
          hint: `Count ALL atoms in each molecule, then multiply by number of molecules. ${c.sym} has ${Object.values(c).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0)} atoms per molecule.`,
          steps: [
            `Step 1: Count atoms per ${c.sym} molecule.\n  ${Object.keys(c).filter(k => k.endsWith('Count')).map(k => k.replace('Count','').toUpperCase() + '=' + c[k]).join(', ')}\n  Total per molecule = ${Object.values(c).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0)}`,
            `Step 2: Multiply by number of molecules.\n  ${molecules} × ${Object.values(c).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0)} = ${totalAtoms}`,
            `Step 3: Answer: ${totalAtoms} total atoms`,
          ],
        };
      } else {
        return {
          id: 'part-multi-' + Date.now(),
          prompt: `A particulate diagram shows ${molecules} molecules of ${c.sym}. How many ${elName} atoms are shown?`,
          answer: total + '',
          hint: `Each ${c.sym} has ${count} ${elName} atoms. Multiply by ${molecules} molecules.`,
          steps: [
            `Step 1: Each ${c.sym} has ${count} ${elName} atoms`,
            `Step 2: ${molecules} molecules × ${count} ${elName}/molecule = ${total}`,
            `Step 3: Answer: ${total} ${elName} atoms`,
          ],
        };
      }
    }
    case 'pistonScenario': {
      // The exact helium piston questions from the notes
      const scenarios = [
        { change: 'longer arrows, same spacing', answer: 'increase temperature at constant volume', explain: 'Longer arrows = faster = higher temp. Same spacing = same volume. Piston is locked.' },
        { change: 'longer arrows, particles farther apart', answer: 'increase temperature at constant pressure', explain: 'Longer arrows = higher temp. Farther apart = volume increased. At constant pressure, gas expands when heated (Charles\'s Law).' },
        { change: 'same arrows, particles closer together', answer: 'increase external pressure at constant temperature', explain: 'Same arrows = same temp. Closer = compressed. External pressure increased (Boyle\'s Law).' },
        { change: 'shorter arrows, same spacing', answer: 'decrease temperature at constant volume', explain: 'Shorter arrows = slower = lower temp. Same spacing = same volume.' },
        { change: 'same arrows, particles farther apart', answer: 'decrease external pressure at constant temperature', explain: 'Same arrows = same temp. Farther apart = expanded. Pressure decreased (Boyle\'s Law reversed).' },
      ];
      const s = pick(scenarios);
      return {
        id: 'part-piston-' + Date.now(),
        prompt: `A sample of helium gas is in a closed piston at 298 K. The diagram changes to show: ${s.change}. What change produced this?`,
        answer: s.answer,
        hint: 'Arrow length = temperature. Spacing = volume. What stayed the same?',
        steps: [
          `Step 1: Check arrow length (temperature).\n  ${s.change.includes('longer') ? 'Longer = higher temp' : s.change.includes('shorter') ? 'Shorter = lower temp' : 'Same = same temp'}`,
          `Step 2: Check spacing (volume).\n  ${s.change.includes('farther') ? 'Farther = larger volume' : s.change.includes('closer') ? 'Closer = smaller volume' : 'Same = same volume'}`,
          `Step 3: ${s.explain}`,
          `Step 4: Answer: ${s.answer}`,
        ],
      };
    }
  }
}

// ===== SKILLS REGISTRY =====
const SKILLS_DATA = {
  balancing: {
    title: 'Balancing Chemical Equations',
    icon: '⚖️',
    description: 'Apply conservation of mass — same number of each atom on both sides',
    generate: generateBalancing,
  },
  conversions: {
    title: 'Mole Conversions',
    icon: '🔄',
    description: 'Convert between grams, moles, atoms, and liters at STP',
    generate: generateConversion,
  },
  particulate: {
    title: 'Particulate Diagrams',
    icon: '🔬',
    description: 'Interpret particle diagrams — phases, gas behavior, solvation, alloys',
    generate: generateParticulate,
  },

  // ===== SOHCAHTOA =====
  sohcahtoa: {
    title: 'SOHCAHTOA — Trig Ratios',
    icon: '📐',
    description: 'Find sides and angles of right triangles using sin, cos, tan',
    generate: generateSOHCAHTOA,
  },

  // ===== BASIC ALGEBRA (Solve for X) =====
  algebra: {
    title: 'Basic Algebra — Solve for X',
    icon: '🔢',
    description: 'Isolate X in one-step and two-step equations',
    generate: generateAlgebra,
  },
};

if (typeof window !== 'undefined') {
  window.SKILLS_DATA = SKILLS_DATA;
}
