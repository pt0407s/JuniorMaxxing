// ===== SKILLS DATA =====
// Concept-application problems with difficulty levels + step-by-step solutions
// Focus: applying patterns, not memorizing facts

// Each problem: { id, equation/problem, answer, steps[], hint, difficulty }
// steps = step-by-step solution for the "Show Solution" feature

const SKILLS_DATA = {

  // ===== BALANCING EQUATIONS =====
  balancing: {
    title: 'Balancing Chemical Equations',
    icon: '⚖️',
    description: 'Apply conservation of mass — same number of each atom on both sides',
    problems: {
      easy: [
        {
          id: 'bal-e1',
          prompt: 'Balance: H₂ + O₂ → H₂O',
          answer: '2H₂ + O₂ → 2H₂O',
          hint: 'Count H and O on each side. Left: 2 H, 2 O. Right: 2 H, 1 O. Start with O.',
          steps: [
            'Step 1: Count atoms on each side.\n  Left: H=2, O=2\n  Right: H=2, O=1',
            'Step 2: O is unbalanced (2 left, 1 right). Put a 2 in front of H₂O.\n  H₂ + O₂ → 2H₂O\n  Now: Left H=2, O=2 | Right H=4, O=2',
            'Step 3: Now H is unbalanced (2 left, 4 right). Put a 2 in front of H₂.\n  2H₂ + O₂ → 2H₂O\n  Now: Left H=4, O=2 | Right H=4, O=2 ✓',
            'Step 4: Verify — H: 4=4 ✓, O: 2=2 ✓. Balanced!\n  Answer: 2H₂ + O₂ → 2H₂O',
          ],
        },
        {
          id: 'bal-e2',
          prompt: 'Balance: Na + Cl₂ → NaCl',
          answer: '2Na + Cl₂ → 2NaCl',
          hint: 'Cl comes in pairs (Cl₂). You need 2 NaCl to use both Cl atoms.',
          steps: [
            'Step 1: Count atoms.\n  Left: Na=1, Cl=2\n  Right: Na=1, Cl=1',
            'Step 2: Cl is unbalanced (2 left, 1 right). Put 2 in front of NaCl.\n  Na + Cl₂ → 2NaCl\n  Now: Left Na=1, Cl=2 | Right Na=2, Cl=2',
            'Step 3: Na is now unbalanced (1 left, 2 right). Put 2 in front of Na.\n  2Na + Cl₂ → 2NaCl\n  Now: Left Na=2, Cl=2 | Right Na=2, Cl=2 ✓',
            'Step 4: Verify — Na: 2=2 ✓, Cl: 2=2 ✓. Balanced!\n  Answer: 2Na + Cl₂ → 2NaCl',
          ],
        },
        {
          id: 'bal-e3',
          prompt: 'Balance: Mg + O₂ → MgO',
          answer: '2Mg + O₂ → 2MgO',
          hint: 'O comes in pairs. You need 2 MgO to balance the 2 O atoms.',
          steps: [
            'Step 1: Count atoms.\n  Left: Mg=1, O=2\n  Right: Mg=1, O=1',
            'Step 2: O unbalanced. Put 2 in front of MgO.\n  Mg + O₂ → 2MgO\n  Now: Left Mg=1, O=2 | Right Mg=2, O=2',
            'Step 3: Mg unbalanced. Put 2 in front of Mg.\n  2Mg + O₂ → 2MgO\n  Now: Left Mg=2, O=2 | Right Mg=2, O=2 ✓',
            'Step 4: Verify — Mg: 2=2 ✓, O: 2=2 ✓. Balanced!',
          ],
        },
        {
          id: 'bal-e4',
          prompt: 'Balance: CH₄ + O₂ → CO₂ + H₂O',
          answer: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
          hint: 'Start with H (it appears in only one compound on each side). 4 H on left means 2 H₂O on right.',
          steps: [
            'Step 1: Count atoms.\n  Left: C=1, H=4, O=2\n  Right: C=1, H=2, O=3',
            'Step 2: H is unbalanced (4 left, 2 right). Put 2 in front of H₂O.\n  CH₄ + O₂ → CO₂ + 2H₂O\n  Now: Left C=1, H=4, O=2 | Right C=1, H=4, O=4',
            'Step 3: O is unbalanced (2 left, 4 right). Put 2 in front of O₂.\n  CH₄ + 2O₂ → CO₂ + 2H₂O\n  Now: Left C=1, H=4, O=4 | Right C=1, H=4, O=4 ✓',
            'Step 4: Verify — C: 1=1 ✓, H: 4=4 ✓, O: 4=4 ✓. Balanced!',
          ],
        },
      ],
      medium: [
        {
          id: 'bal-m1',
          prompt: 'Balance: C₃H₈ + O₂ → CO₂ + H₂O',
          answer: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
          hint: 'Start with C (3 on left → 3 CO₂). Then H (8 → 4 H₂O). Then count O on right and balance O₂.',
          steps: [
            'Step 1: Count atoms.\n  Left: C=3, H=8, O=2\n  Right: C=1, H=2, O=3',
            'Step 2: Balance C. Put 3 in front of CO₂.\n  C₃H₈ + O₂ → 3CO₂ + H₂O\n  C: 3=3 ✓',
            'Step 3: Balance H. Put 4 in front of H₂O.\n  C₃H₈ + O₂ → 3CO₂ + 4H₂O\n  H: 8=8 ✓',
            'Step 4: Count O on right: 3×2 (from CO₂) + 4×1 (from H₂O) = 10 O.\n  Need 10 O on left. Put 5 in front of O₂.\n  C₃H₈ + 5O₂ → 3CO₂ + 4H₂O\n  O: 10=10 ✓',
            'Step 5: Verify — C: 3=3 ✓, H: 8=8 ✓, O: 10=10 ✓. Balanced!',
          ],
        },
        {
          id: 'bal-m2',
          prompt: 'Balance: Fe₂O₃ + CO → Fe + CO₂',
          answer: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂',
          hint: 'Start with Fe (2 on left → 2 Fe on right). Then O: 3+3=6 on left, need 6 on right → 3 CO₂. Then balance C.',
          steps: [
            'Step 1: Count atoms.\n  Left: Fe=2, O=3+1=4 (from Fe₂O₃ + CO), C=1\n  Right: Fe=1, O=2, C=1',
            'Step 2: Balance Fe. Put 2 in front of Fe.\n  Fe₂O₃ + CO → 2Fe + CO₂\n  Fe: 2=2 ✓',
            'Step 3: Balance O. Left has 3 (Fe₂O₃) + 1 (CO) = 4. Right has 2 (CO₂).\n  Try 3CO₂ on right: 3×2=6 O. Need 6 on left: 3 (Fe₂O₃) + 3 (CO) = 6. Put 3 in front of CO.\n  Fe₂O₃ + 3CO → 2Fe + 3CO₂\n  O: 6=6 ✓',
            'Step 4: Check C. Left: 3 (from 3CO). Right: 3 (from 3CO₂). C: 3=3 ✓',
            'Step 5: Verify — Fe: 2=2 ✓, O: 6=6 ✓, C: 3=3 ✓. Balanced!',
          ],
        },
        {
          id: 'bal-m3',
          prompt: 'Balance: Al + HCl → AlCl₃ + H₂',
          answer: '2Al + 6HCl → 2AlCl₃ + 3H₂',
          hint: 'Cl appears as Cl₃ on right and Cl on left. LCM of 1 and 3 is 3. H appears as H₂ on right and H on left. LCM of 1 and 2 is 2. Find a common multiple.',
          steps: [
            'Step 1: Count atoms.\n  Left: Al=1, H=1, Cl=1\n  Right: Al=1, Cl=3, H=2',
            'Step 2: Balance Cl. Left has 1, right has 3. LCM = 6. Put 6 in front of HCl, 2 in front of AlCl₃.\n  Al + 6HCl → 2AlCl₃ + H₂\n  Cl: 6=6 ✓',
            'Step 3: Balance Al. Right has 2 (from 2AlCl₃). Put 2 in front of Al.\n  2Al + 6HCl → 2AlCl₃ + H₂\n  Al: 2=2 ✓',
            'Step 4: Balance H. Left has 6 (from 6HCl). Right has 2 (from H₂). Put 3 in front of H₂.\n  2Al + 6HCl → 2AlCl₃ + 3H₂\n  H: 6=6 ✓',
            'Step 5: Verify — Al: 2=2 ✓, H: 6=6 ✓, Cl: 6=6 ✓. Balanced!',
          ],
        },
        {
          id: 'bal-m4',
          prompt: 'Balance: KClO₃ → KCl + O₂',
          answer: '2KClO₃ → 2KCl + 3O₂',
          hint: 'O appears as O₃ on left and O₂ on right. LCM of 3 and 2 is 6. Use 2 KClO₃ and 3 O₂.',
          steps: [
            'Step 1: Count atoms.\n  Left: K=1, Cl=1, O=3\n  Right: K=1, Cl=1, O=2',
            'Step 2: K and Cl are balanced. Focus on O.\n  Left: 3 O (in KClO₃). Right: 2 O (in O₂).\n  LCM of 3 and 2 = 6. Need 2 KClO₃ (2×3=6) and 3 O₂ (3×2=6).',
            'Step 3: Put 2 in front of KClO₃ and 3 in front of O₂.\n  2KClO₃ → KCl + 3O₂\n  O: 6=6 ✓',
            'Step 4: Now K and Cl are unbalanced (2 left, 1 right). Put 2 in front of KCl.\n  2KClO₃ → 2KCl + 3O₂\n  K: 2=2 ✓, Cl: 2=2 ✓',
            'Step 5: Verify — K: 2=2 ✓, Cl: 2=2 ✓, O: 6=6 ✓. Balanced!',
          ],
        },
      ],
      hard: [
        {
          id: 'bal-h1',
          prompt: 'Balance: C₄H₁₀ + O₂ → CO₂ + H₂O',
          answer: '2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O',
          hint: 'Start with C (4 → 4CO₂). Then H (10 → 5H₂O). Then count total O on right and balance. You may need to double everything.',
          steps: [
            'Step 1: Count atoms.\n  Left: C=4, H=10, O=2\n  Right: C=1, H=2, O=3',
            'Step 2: Balance C. Put 4 in front of CO₂.\n  C₄H₁₀ + O₂ → 4CO₂ + H₂O\n  C: 4=4 ✓',
            'Step 3: Balance H. Put 5 in front of H₂O.\n  C₄H₁₀ + O₂ → 4CO₂ + 5H₂O\n  H: 10=10 ✓',
            'Step 4: Count O on right: 4×2 + 5×1 = 13 O. Need 13/2 O₂.\n  C₄H₁₀ + 13/2 O₂ → 4CO₂ + 5H₂O\n  But we can\'t have fractions! Multiply everything by 2.',
            'Step 5: Multiply all coefficients by 2.\n  2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O\n  C: 8=8 ✓, H: 20=20 ✓, O: 26=26 ✓. Balanced!',
          ],
        },
        {
          id: 'bal-h2',
          prompt: 'Balance: NH₃ + O₂ → NO + H₂O',
          answer: '4NH₃ + 5O₂ → 4NO + 6H₂O',
          hint: 'Balance H first (6 H on left → 3 H₂O... but wait, NH₃ has 3H). Try: 2NH₃ gives 6H → 3H₂O. Then N: 2→2NO. Then O: 2+3=5 on right → 5/2 O₂. Double everything.',
          steps: [
            'Step 1: Count atoms.\n  Left: N=1, H=3, O=2\n  Right: N=1, O=1+1=2, H=2',
            'Step 2: Balance H. 3 on left, 2 on right. LCM=6. Put 2 in front of NH₃, 3 in front of H₂O.\n  2NH₃ + O₂ → NO + 3H₂O\n  H: 6=6 ✓',
            'Step 3: Balance N. 2 on left (from 2NH₃). Put 2 in front of NO.\n  2NH₃ + O₂ → 2NO + 3H₂O\n  N: 2=2 ✓',
            'Step 4: Count O on right: 2×1 (NO) + 3×1 (H₂O) = 5. Need 5/2 O₂.\n  2NH₃ + 5/2 O₂ → 2NO + 3H₂O\n  Fraction! Multiply everything by 2.',
            'Step 5: Multiply all by 2.\n  4NH₃ + 5O₂ → 4NO + 6H₂O\n  N: 4=4 ✓, H: 12=12 ✓, O: 10=10 ✓. Balanced!',
          ],
        },
        {
          id: 'bal-h3',
          prompt: 'Balance: Fe + H₂O → Fe₃O₄ + H₂',
          answer: '3Fe + 4H₂O → Fe₃O₄ + 4H₂',
          hint: 'Fe₃O₄ has 3 Fe and 4 O. So you need 3 Fe and 4 H₂O on the left. That gives 8 H → 4 H₂.',
          steps: [
            'Step 1: Count atoms.\n  Left: Fe=1, H=2, O=1\n  Right: Fe=3, O=4, H=2',
            'Step 2: Balance Fe. 3 on right. Put 3 in front of Fe.\n  3Fe + H₂O → Fe₃O₄ + H₂\n  Fe: 3=3 ✓',
            'Step 3: Balance O. 4 on right (Fe₃O₄). Put 4 in front of H₂O.\n  3Fe + 4H₂O → Fe₃O₄ + H₂\n  O: 4=4 ✓',
            'Step 4: Balance H. Left: 4×2=8. Put 4 in front of H₂.\n  3Fe + 4H₂O → Fe₃O₄ + 4H₂\n  H: 8=8 ✓',
            'Step 5: Verify — Fe: 3=3 ✓, O: 4=4 ✓, H: 8=8 ✓. Balanced!',
          ],
        },
      ],
    },
  },

  // ===== MOLE CONVERSIONS =====
  conversions: {
    title: 'Mole Conversions',
    icon: '🔄',
    description: 'Convert between grams, moles, atoms, and liters at STP',
    problems: {
      easy: [
        {
          id: 'conv-e1',
          prompt: 'How many moles are in 36.0 g of H₂O? (Molar mass H₂O = 18.02 g/mol)',
          answer: '2.00 mol',
          hint: 'Use: moles = grams ÷ molar mass',
          steps: [
            'Step 1: Identify what you know and what you need.\n  Given: 36.0 g H₂O\n  Find: moles of H₂O\n  Molar mass: 18.02 g/mol',
            'Step 2: Choose the conversion.\n  moles = grams ÷ molar mass',
            'Step 3: Plug in and calculate.\n  moles = 36.0 g ÷ 18.02 g/mol = 1.998...',
            'Step 4: Round to 3 significant figures.\n  Answer: 2.00 mol H₂O',
          ],
        },
        {
          id: 'conv-e2',
          prompt: 'How many grams are in 2.5 mol of NaCl? (Molar mass NaCl = 58.44 g/mol)',
          answer: '146 g',
          hint: 'Use: grams = moles × molar mass',
          steps: [
            'Step 1: Identify.\n  Given: 2.5 mol NaCl\n  Find: grams of NaCl\n  Molar mass: 58.44 g/mol',
            'Step 2: Choose conversion.\n  grams = moles × molar mass',
            'Step 3: Calculate.\n  grams = 2.5 mol × 58.44 g/mol = 146.1',
            'Step 4: Round to 2 significant figures (matching 2.5).\n  Answer: 146 g NaCl',
          ],
        },
        {
          id: 'conv-e3',
          prompt: 'How many molecules are in 1.5 mol of CO₂?',
          answer: '9.03 × 10²³ molecules',
          hint: 'Use: molecules = moles × Avogadro\'s number (6.022 × 10²³)',
          steps: [
            'Step 1: Identify.\n  Given: 1.5 mol CO₂\n  Find: molecules of CO₂\n  Avogadro\'s number: 6.022 × 10²³',
            'Step 2: Choose conversion.\n  molecules = moles × 6.022 × 10²³',
            'Step 3: Calculate.\n  molecules = 1.5 × 6.022 × 10²³ = 9.033 × 10²³',
            'Step 4: Round to 2 significant figures.\n  Answer: 9.03 × 10²³ molecules CO₂',
          ],
        },
        {
          id: 'conv-e4',
          prompt: 'What volume does 2.0 mol of O₂ occupy at STP?',
          answer: '44.8 L',
          hint: 'At STP, 1 mol of any gas = 22.4 L. Use: volume = moles × 22.4 L/mol',
          steps: [
            'Step 1: Identify.\n  Given: 2.0 mol O₂ at STP\n  Find: volume in liters\n  Molar volume at STP: 22.4 L/mol',
            'Step 2: Choose conversion.\n  volume = moles × 22.4 L/mol',
            'Step 3: Calculate.\n  volume = 2.0 mol × 22.4 L/mol = 44.8 L',
            'Step 4: Answer: 44.8 L O₂ at STP',
          ],
        },
      ],
      medium: [
        {
          id: 'conv-m1',
          prompt: 'How many atoms are in 25.0 g of Mg? (Molar mass Mg = 24.31 g/mol)',
          answer: '6.19 × 10²³ atoms',
          hint: 'Two-step: grams → moles (÷ molar mass), then moles → atoms (× Avogadro\'s number)',
          steps: [
            'Step 1: Identify.\n  Given: 25.0 g Mg\n  Find: atoms of Mg\n  Molar mass: 24.31 g/mol\n  Avogadro\'s: 6.022 × 10²³',
            'Step 2: Convert grams → moles.\n  moles = 25.0 g ÷ 24.31 g/mol = 1.028 mol',
            'Step 3: Convert moles → atoms.\n  atoms = 1.028 mol × 6.022 × 10²³ = 6.19 × 10²³',
            'Step 4: Round to 3 significant figures.\n  Answer: 6.19 × 10²³ atoms Mg',
          ],
        },
        {
          id: 'conv-m2',
          prompt: 'How many liters does 44.0 g of CO₂ occupy at STP? (Molar mass CO₂ = 44.01 g/mol)',
          answer: '22.4 L',
          hint: 'Two-step: grams → moles (÷ molar mass), then moles → liters (× 22.4 L/mol)',
          steps: [
            'Step 1: Identify.\n  Given: 44.0 g CO₂ at STP\n  Find: volume in liters\n  Molar mass: 44.01 g/mol\n  Molar volume: 22.4 L/mol',
            'Step 2: Convert grams → moles.\n  moles = 44.0 g ÷ 44.01 g/mol = 0.9998 mol ≈ 1.00 mol',
            'Step 3: Convert moles → liters at STP.\n  volume = 1.00 mol × 22.4 L/mol = 22.4 L',
            'Step 4: Answer: 22.4 L CO₂ at STP',
          ],
        },
        {
          id: 'conv-m3',
          prompt: 'How many molecules are in 5.6 L of N₂ gas at STP?',
          answer: '1.5 × 10²³ molecules',
          hint: 'Two-step: liters → moles (÷ 22.4), then moles → molecules (× Avogadro\'s number)',
          steps: [
            'Step 1: Identify.\n  Given: 5.6 L N₂ at STP\n  Find: molecules of N₂\n  Molar volume: 22.4 L/mol\n  Avogadro\'s: 6.022 × 10²³',
            'Step 2: Convert liters → moles.\n  moles = 5.6 L ÷ 22.4 L/mol = 0.25 mol',
            'Step 3: Convert moles → molecules.\n  molecules = 0.25 mol × 6.022 × 10²³ = 1.506 × 10²³',
            'Step 4: Round to 2 significant figures.\n  Answer: 1.5 × 10²³ molecules N₂',
          ],
        },
        {
          id: 'conv-m4',
          prompt: 'What mass of CH₄ contains 3.01 × 10²³ molecules? (Molar mass CH₄ = 16.04 g/mol)',
          answer: '8.02 g',
          hint: 'Two-step: molecules → moles (÷ Avogadro\'s), then moles → grams (× molar mass)',
          steps: [
            'Step 1: Identify.\n  Given: 3.01 × 10²³ molecules CH₄\n  Find: mass in grams\n  Avogadro\'s: 6.022 × 10²³\n  Molar mass: 16.04 g/mol',
            'Step 2: Convert molecules → moles.\n  moles = (3.01 × 10²³) ÷ (6.022 × 10²³) = 0.500 mol',
            'Step 3: Convert moles → grams.\n  mass = 0.500 mol × 16.04 g/mol = 8.02 g',
            'Step 4: Answer: 8.02 g CH₄',
          ],
        },
      ],
      hard: [
        {
          id: 'conv-h1',
          prompt: 'How many atoms of hydrogen are in 18.0 g of H₂O? (Molar mass H₂O = 18.02 g/mol)',
          answer: '1.20 × 10²⁴ H atoms',
          hint: 'Three-step: grams → moles → molecules → H atoms. Each H₂O has 2 H atoms, so multiply by 2 at the end.',
          steps: [
            'Step 1: Identify.\n  Given: 18.0 g H₂O\n  Find: H atoms (not molecules!)\n  Molar mass: 18.02 g/mol\n  Avogadro\'s: 6.022 × 10²³\n  Each H₂O has 2 H atoms',
            'Step 2: Convert grams → moles.\n  moles = 18.0 g ÷ 18.02 g/mol = 0.999 mol ≈ 1.00 mol',
            'Step 3: Convert moles → molecules.\n  molecules = 1.00 × 6.022 × 10²³ = 6.02 × 10²³ molecules H₂O',
            'Step 4: Convert molecules → H atoms.\n  Each H₂O has 2 H atoms.\n  H atoms = 6.02 × 10²³ × 2 = 1.20 × 10²⁴',
            'Step 5: Answer: 1.20 × 10²⁴ H atoms',
          ],
        },
        {
          id: 'conv-h2',
          prompt: 'How many oxygen atoms are in 2.24 L of CO₂ at STP? (Molar mass CO₂ = 44.01 g/mol)',
          answer: '1.20 × 10²³ O atoms',
          hint: 'Three-step: liters → moles → molecules → O atoms. Each CO₂ has 2 O atoms.',
          steps: [
            'Step 1: Identify.\n  Given: 2.24 L CO₂ at STP\n  Find: O atoms\n  Molar volume: 22.4 L/mol\n  Avogadro\'s: 6.022 × 10²³\n  Each CO₂ has 2 O atoms',
            'Step 2: Convert liters → moles.\n  moles = 2.24 L ÷ 22.4 L/mol = 0.100 mol',
            'Step 3: Convert moles → molecules.\n  molecules = 0.100 × 6.022 × 10²³ = 6.02 × 10²²',
            'Step 4: Convert molecules → O atoms.\n  Each CO₂ has 2 O atoms.\n  O atoms = 6.02 × 10²² × 2 = 1.20 × 10²³',
            'Step 5: Answer: 1.20 × 10²³ O atoms',
          ],
        },
        {
          id: 'conv-h3',
          prompt: 'A sample contains 1.81 × 10²⁴ atoms of Fe. What is the mass of this sample in grams? (Molar mass Fe = 55.85 g/mol)',
          answer: '168 g',
          hint: 'Two-step: atoms → moles (÷ Avogadro\'s), then moles → grams (× molar mass)',
          steps: [
            'Step 1: Identify.\n  Given: 1.81 × 10²⁴ atoms Fe\n  Find: mass in grams\n  Avogadro\'s: 6.022 × 10²³\n  Molar mass: 55.85 g/mol',
            'Step 2: Convert atoms → moles.\n  moles = (1.81 × 10²⁴) ÷ (6.022 × 10²³) = 3.005 mol',
            'Step 3: Convert moles → grams.\n  mass = 3.005 mol × 55.85 g/mol = 167.8 g',
            'Step 4: Round to 3 significant figures.\n  Answer: 168 g Fe',
          ],
        },
      ],
    },
  },
};

if (typeof window !== 'undefined') {
  window.SKILLS_DATA = SKILLS_DATA;
}
