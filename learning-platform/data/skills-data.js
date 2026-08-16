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
  { sym: 'H₂O', name: 'water', mm: 18.02, atomsPerMolecule: 3, hCount: 2, oCount: 1, isGas: false },
  { sym: 'CO₂', name: 'carbon dioxide', mm: 44.01, atomsPerMolecule: 3, oCount: 2, cCount: 1, isGas: true },
  { sym: 'NaCl', name: 'sodium chloride', mm: 58.44, atomsPerMolecule: 2, isGas: false },
  { sym: 'CH₄', name: 'methane', mm: 16.04, atomsPerMolecule: 5, hCount: 4, cCount: 1, isGas: true },
  { sym: 'O₂', name: 'oxygen gas', mm: 32.00, atomsPerMolecule: 2, oCount: 2, isGas: true },
  { sym: 'N₂', name: 'nitrogen gas', mm: 28.02, atomsPerMolecule: 2, nCount: 2, isGas: true },
  { sym: 'H₂', name: 'hydrogen gas', mm: 2.02, atomsPerMolecule: 2, hCount: 2, isGas: true },
  { sym: 'CO', name: 'carbon monoxide', mm: 28.01, atomsPerMolecule: 2, isGas: true },
  { sym: 'NH₃', name: 'ammonia', mm: 17.03, atomsPerMolecule: 4, hCount: 3, nCount: 1, isGas: true },
  { sym: 'C₆H₁₂O₆', name: 'glucose', mm: 180.16, atomsPerMolecule: 24, hCount: 12, cCount: 6, oCount: 6, isGas: false },
  { sym: 'HCl', name: 'hydrochloric acid', mm: 36.46, atomsPerMolecule: 2, isGas: true },
  { sym: 'KCl', name: 'potassium chloride', mm: 74.55, atomsPerMolecule: 2, isGas: false },
  { sym: 'MgO', name: 'magnesium oxide', mm: 40.31, atomsPerMolecule: 2, isGas: false },
  { sym: 'C₂H₆', name: 'ethane', mm: 30.07, atomsPerMolecule: 8, hCount: 6, cCount: 2, isGas: true },
  { sym: 'SO₂', name: 'sulfur dioxide', mm: 64.07, atomsPerMolecule: 3, oCount: 2, isGas: true },
];
const GASES = COMPOUNDS.filter(c => c.isGas);

const ELEMENTS = [
  { sym: 'Mg', mm: 24.31 },
  { sym: 'Fe', mm: 55.85 },
  { sym: 'Na', mm: 22.99 },
  { sym: 'Ca', mm: 40.08 },
  { sym: 'Al', mm: 26.98 },
  { sym: 'Cu', mm: 63.55 },
  { sym: 'Zn', mm: 65.38 },
  { sym: 'C', mm: 12.01 },
  { sym: 'S', mm: 32.07 },
  { sym: 'K', mm: 39.10 },
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
        prompt: `How many moles are in ${grams} g of ${c.sym} (${c.name})? (Molar mass = ${c.mm} g/mol)`,
        answer: roundTo(mol, 3) + ' mol',
        hint: 'Use: moles = grams ÷ molar mass. Set up as: g × (1 mol / molar mass) = moles',
        steps: [
          `Step 1: Identify what you know.\n  Given: ${grams} g ${c.sym}\n  Find: moles\n  Molar mass: ${c.mm} g/mol`,
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
        prompt: `Calculate the mass of ${mol} mol ${c.sym} (${c.name}). (Molar mass = ${c.mm} g/mol)`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Use: grams = moles × molar mass. Set up as: mol × (molar mass / 1 mol) = grams',
        steps: [
          `Step 1: Identify.\n  Given: ${mol} mol ${c.sym}\n  Find: grams\n  Molar mass: ${c.mm} g/mol`,
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
          `Step 1: Identify.\n  Given: ${grams} g ${e.sym}\n  Find: atoms\n  Molar mass: ${e.mm} g/mol\n  Avogadro's: 6.022 × 10²³`,
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
        prompt: `What volume does ${grams} g of ${c.sym} occupy at STP? (Molar mass = ${c.mm} g/mol)`,
        answer: roundTo(liters, 3) + ' L',
        hint: 'Two-step: grams → moles (÷ molar mass), then moles → liters (× 22.4). Chain the conversion factors.',
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${c.sym} at STP\n  Find: volume (liters)\n  Molar mass: ${c.mm} g/mol\n  At STP: 1 mol = 22.4 L`,
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
        prompt: `What mass (in grams) contains ${fmtSci(particles, 3)} ${unit} of ${c.sym}? (Molar mass = ${c.mm} g/mol)`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Two-step: particles → moles (÷ Avogadro\'s), then moles → grams (× molar mass)',
        steps: [
          `Step 1: Identify.\n  Given: ${fmtSci(particles, 3)} ${unit} ${c.sym}\n  Find: mass (grams)\n  Avogadro's: 6.022 × 10²³\n  Molar mass: ${c.mm} g/mol`,
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
        prompt: `What is the mass of ${liters} L of ${c.sym} at STP? (Molar mass = ${c.mm} g/mol)`,
        answer: roundTo(grams, 3) + ' g',
        hint: 'Two-step: liters → moles (÷ 22.4), then moles → grams (× molar mass)',
        steps: [
          `Step 1: Identify.\n  Given: ${liters} L ${c.sym} at STP\n  Find: mass (grams)\n  Molar volume: 22.4 L/mol\n  Molar mass: ${c.mm} g/mol`,
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
        prompt: `How many ${elSym} atoms are in ${grams} g of ${c.sym}? (Molar mass = ${c.mm} g/mol)`,
        answer: fmtSci(specificAtoms, 3) + ' ' + elSym + ' atoms',
        hint: `Three-step: grams → moles → molecules → ${elSym} atoms. Each ${c.sym} has ${elPerMol} ${elSym} atoms.`,
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${c.sym}\n  Find: ${elSym} atoms\n  Molar mass: ${c.mm} g/mol\n  Avogadro's: 6.022 × 10²³\n  Each ${c.sym} has ${elPerMol} ${elSym} atoms`,
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
        prompt: `How many ${elSym} atoms are in ${liters} L of ${c.sym} at STP? (Molar mass = ${c.mm} g/mol)`,
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
          `Step 1: Identify.\n  Given: ${fmtSci(atoms, 3)} atoms ${e.sym}\n  Find: mass (grams)\n  Avogadro's: 6.022 × 10²³\n  Molar mass: ${e.mm} g/mol`,
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
        prompt: `How many liters does ${grams} g of ${c.sym} occupy at STP? (Molar mass = ${c.mm} g/mol)`,
        answer: roundTo(liters, 3) + ' L',
        hint: 'Two-step: grams → moles (÷ molar mass), then moles → liters (× 22.4)',
        steps: [
          `Step 1: Identify.\n  Given: ${grams} g ${c.sym} at STP\n  Find: volume (liters)\n  Molar mass: ${c.mm} g/mol\n  Molar volume: 22.4 L/mol`,
          `Step 2: Convert grams → moles.\n  moles = ${grams} g ÷ ${c.mm} g/mol = ${mol.toFixed(4)}`,
          `Step 3: Convert moles → liters at STP.\n  volume = ${mol.toFixed(4)} × 22.4 = ${liters.toFixed(2)}`,
          `Step 4: Round to 3 significant figures.\n  Answer: ${roundTo(liters, 3)} L ${c.sym}`,
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
};

if (typeof window !== 'undefined') {
  window.SKILLS_DATA = SKILLS_DATA;
}
