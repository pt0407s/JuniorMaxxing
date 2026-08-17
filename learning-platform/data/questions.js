// ===== QUIZ QUESTIONS DATA =====
// Organized by class → section
// "prereq" = AP Chem prerequisite (Chem 101)
// "chem-1.0" = AP Chem Section 1.0 (Particulate Diagrams)
// "chem-1.1" = AP Chem Section 1.1 (Moles & Molar Mass)

const TOPICS = [
  { id: 'sc-chem101', label: '🧪 Skill Check: Chem 101 (AP Bio Prereq)', class: 'Skill Check' },
  { id: 'sc-1.0', label: '🧪 Skill Check: AP Chem 1.0 — Particulate Diagrams', class: 'Skill Check' },
  { id: 'sc-1.1', label: '🧪 Skill Check: AP Chem 1.1 — Moles & Molar Mass', class: 'Skill Check' },
  { id: 'prereq', label: 'Practice Bank: Chem 101 (All Questions)', class: 'AP Chemistry' },
  { id: 'chem-1.0', label: 'Practice Bank: AP Chem 1.0 (All Questions)', class: 'AP Chemistry' },
  { id: 'chem-1.1', label: 'Practice Bank: AP Chem 1.1 (All Questions)', class: 'AP Chemistry' },
];

const QUESTIONS = [
  // ===== PREREQUISITE (Chem 101) =====
  { id:'p1', topic:'prereq', q:'Which 6 elements are the essential biological elements that form the backbone of macromolecules?', options:['C, H, O, N, P, S','C, H, O, N, Na, Cl','C, H, O, N, Fe, Mg','C, H, O, N, Ca, K'], correct:0, explain:'C, H, O, N, P, S — Carbon, Hydrogen, Oxygen, Nitrogen, Phosphorus, Sulfur.' },
  { id:'p2', topic:'prereq', q:'What is electronegativity?', options:['An atom\'s ability to attract electrons in a bond','The number of protons in an atom','The energy released when a bond forms','The mass of an atom\'s nucleus'], correct:0, explain:'Electronegativity = ability to attract electrons in a chemical bond. Determines bond polarity.' },
  { id:'p3', topic:'prereq', q:'Which direction does electronegativity increase on the periodic table?', options:['Left and down','Right and up','Right and down','Left and up'], correct:1, explain:'Increases RIGHT across a period and UP a group. Fluorine is most electronegative.' },
  { id:'p4', topic:'prereq', q:'What is the most electronegative element?', options:['Oxygen','Nitrogen','Fluorine','Chlorine'], correct:2, explain:'Fluorine (F) is the most electronegative element.' },
  { id:'p5', topic:'prereq', q:'What are valence electrons?', options:['Electrons in the innermost shell','Electrons in the outermost shell that participate in bonding','Electrons that have been lost','Electrons shared between two atoms'], correct:1, explain:'Outermost shell electrons. They determine how atoms interact and bond.' },
  { id:'p6', topic:'prereq', q:'How does sodium (Na) become Na⁺?', options:['Gains 1 electron','Loses 1 electron','Gains 1 proton','Shares 1 electron'], correct:1, explain:'Na has 1 valence electron. It loses it to achieve a full outer shell → Na⁺ (cation).' },
  { id:'p7', topic:'prereq', q:'What is a cation?', options:['A positive ion (lost electrons)','A negative ion (gained electrons)','A neutral atom','A molecule with covalent bonds'], correct:0, explain:'Cation = positive ion (lost electrons). Anion = negative ion (gained electrons).' },
  { id:'p8', topic:'prereq', q:'How many valence electrons does oxygen (O, group 16) have?', options:['4','6','8','2'], correct:1, explain:'Group 16 = 6 valence electrons. Oxygen needs 2 more for a full octet.' },
  { id:'p9', topic:'prereq', q:'Why are ions important in biological systems?', options:['They form covalent bonds in DNA','They are electrolytes that regulate nerve function and osmotic balance','They store genetic information','They catalyze enzyme reactions'], correct:1, explain:'Ions (Na⁺, K⁺, Cl⁻) are electrolytes — regulate nerves, muscles, osmotic balance.' },
  { id:'p10', topic:'prereq', q:'What does OIL RIG stand for?', options:['Oil In Liquids, Rigs In Ground','Oxidation Is Loss, Reduction Is Gain (of electrons)','Oxygen Inside Living, Respiration In Growth','Only Ionic Reactions Include Gases'], correct:1, explain:'OIL RIG: Oxidation Is Loss, Reduction Is Gain — of electrons.' },
  { id:'p11', topic:'prereq', q:'In cellular respiration, is glucose oxidized or reduced?', options:['Oxidized','Reduced','Neither','Both'], correct:0, explain:'Glucose is oxidized (loses electrons/H). Oxygen is reduced (gains them → water).' },
  { id:'p12', topic:'prereq', q:'When NAD⁺ becomes NADH, is that oxidation or reduction?', options:['Oxidation','Reduction','Neither','Both'], correct:1, explain:'NAD⁺ gains electrons → NADH = reduction.' },
  { id:'p13', topic:'prereq', q:'If a molecule gains oxygen atoms, is it oxidized or reduced?', options:['Oxidized','Reduced','Neither','It depends'], correct:0, explain:'Gaining O = oxidation. Losing O = reduction.' },
  { id:'p14', topic:'prereq', q:'If a molecule loses hydrogen atoms, is it oxidized or reduced?', options:['Oxidized','Reduced','Neither','It depends'], correct:0, explain:'Losing H = oxidation. Gaining H = reduction.' },
  { id:'p15', topic:'prereq', q:'What are the 3 main types of chemical bonds (biologically relevant)?', options:['Ionic, covalent, hydrogen','Ionic, metallic, nuclear','Covalent, magnetic, gravitational','Hydrogen, metallic, ionic'], correct:0, explain:'Ionic (transfer), covalent (sharing), hydrogen (attraction H↔O/N/F).' },
  { id:'p16', topic:'prereq', q:'How does an ionic bond form?', options:['By sharing electrons equally','By transferring electrons from metal to nonmetal','By attraction between two nonmetals','By sharing protons'], correct:1, explain:'Electron transfer: metal loses (cation), nonmetal gains (anion). Example: NaCl.' },
  { id:'p17', topic:'prereq', q:'Which bond type holds DNA base pairs together?', options:['Covalent','Ionic','Hydrogen bonds','Metallic'], correct:2, explain:'Hydrogen bonds hold base pairs (A-T, G-C). Backbone is covalent.' },
  { id:'p18', topic:'prereq', q:'What is bond energy and why does it matter for ATP?', options:['Energy stored in bonds; breaking ATP releases energy the cell uses','Strength of ionic bonds in ATP','Number of bonds in ATP','Energy to form bonds; ATP absorbs energy'], correct:0, explain:'ATP → ADP + Pᵢ releases energy that powers cellular work.' },
  { id:'p19', topic:'prereq', q:'Are hydrogen bonds strong or weak? Why do they matter?', options:['Strong like covalent','Weak individually, but many together = strong collective effect','Strongest bond type','Only in metals'], correct:1, explain:'Weak individually, collectively strong — DNA helix, protein folding, water.' },
  { id:'p20', topic:'prereq', q:'What makes a molecule polar vs nonpolar?', options:['Polar = equal sharing; nonpolar = unequal','Polar = unequal sharing (different electronegativities); nonpolar = equal','Polar always has oxygen','Polar molecules are larger'], correct:1, explain:'Polar = unequal sharing → partial charges. Nonpolar = equal sharing → no charges.' },
  { id:'p21', topic:'prereq', q:'What does "like dissolves like" mean?', options:['Similar-sized molecules dissolve each other','Polar dissolves polar; nonpolar dissolves nonpolar','Only liquids dissolve liquids','Same atom count = dissolve'], correct:1, explain:'Polar dissolves polar; nonpolar dissolves nonpolar. Salt(polar) in water(polar) ✓.' },
  { id:'p22', topic:'prereq', q:'Why does salt dissolve in water but oil doesn\'t?', options:['Salt is heavier','Salt is polar/ionic, water is polar; oil is nonpolar','Oil evaporates faster','Salt is smaller'], correct:1, explain:'Salt = ionic/polar → dissolves in polar water. Oil = nonpolar → doesn\'t.' },
  { id:'p23', topic:'prereq', q:'What part of a phospholipid is hydrophilic? Hydrophobic?', options:['Tails hydrophilic; heads hydrophobic','Heads (phosphate) hydrophilic; tails (fatty acids) hydrophobic','Both hydrophilic','Both hydrophobic'], correct:1, explain:'Phosphate heads = hydrophilic. Fatty acid tails = hydrophobic. Forms bilayer.' },
  { id:'p24', topic:'prereq', q:'Why can\'t polar molecules easily cross the cell membrane?', options:['Membrane is metal','Membrane interior is nonpolar (hydrophobic tails), polar molecules need transport proteins','Polar molecules too large','No pores at all'], correct:1, explain:'Hydrophobic interior blocks polar molecules. Need transport proteins = selective permeability.' },
  { id:'p25', topic:'prereq', q:'Why is water polar?', options:['It has 3 atoms','O is more electronegative than H, pulls electrons (bent shape, dipoles don\'t cancel)','It\'s liquid at room temp','It contains ionic bonds'], correct:1, explain:'O is δ−, H is δ+. Bent shape → dipoles don\'t cancel → polar.' },
  { id:'p26', topic:'prereq', q:'What property makes water the "universal solvent"?', options:['Its polarity — dissolves other polar substances','High specific heat','Cohesion','Low density as ice'], correct:0, explain:'Water is polar → dissolves polar/ionic substances = universal solvent.' },
  { id:'p27', topic:'prereq', q:'Why does ice float?', options:['Ice is heavier','H-bonds form a lattice that spreads molecules apart → less dense','Air bubbles','Water contracts when freezing'], correct:1, explain:'Ice H-bond lattice spaces molecules farther apart → less dense → floats.' },
  { id:'p28', topic:'prereq', q:'What is cohesion? What is adhesion?', options:['Cohesion = sticks to surfaces; Adhesion = sticks to itself','Cohesion = sticks to itself (H-bonds); Adhesion = sticks to surfaces','Same thing','Cohesion = dissolving; Adhesion = evaporating'], correct:1, explain:'Cohesion = water-water (surface tension). Adhesion = water-surface (capillary action).' },
  { id:'p29', topic:'prereq', q:'Why does sweating cool you down?', options:['Water is cold','High specific heat — absorbs heat to evaporate, pulling heat from skin','Reflects sunlight','Below body temp'], correct:1, explain:'High specific heat = absorbs lots of heat to evaporate → cools skin.' },
  { id:'p30', topic:'prereq', q:'How does water move up a tree trunk against gravity?', options:['Pushed by roots','Cohesion + adhesion = capillary action','Pumped by tree\'s heart','Vacuum at top'], correct:1, explain:'Cohesion (water-water) + adhesion (water-xylem) = capillary action upward.' },

  // ===== SECTION 1.0: PARTICULATE DIAGRAMS =====
  { id:'s10_1', topic:'chem-1.0', q:'In a particulate diagram of a gas, what do the arrows represent?', options:['Charge of each particle','Direction of movement and relative velocity','Mass of each particle','Number of bonds'], correct:1, explain:'Arrows = direction + velocity. Longer = faster. Not all same speed.' },
  { id:'s10_2', topic:'chem-1.0', q:'What is a substitutional alloy?', options:['Smaller atoms inserted into holes of metal lattice','One metal atom substituted for another of similar size','Electrons transferred between atoms','Covalent molecule of two metals'], correct:1, explain:'Substitutional = similar-size metal replaces another. Example: Bronze (Cu+Sn).' },
  { id:'s10_3', topic:'chem-1.0', q:'What is an interstitial alloy?', options:['One metal replaces another of similar size','Smaller atoms inserted into holes of the metal lattice','Ionic compound with metal ions','Covalent network solid'], correct:1, explain:'Interstitial = small atoms in gaps. Example: Steel (Fe+C).' },
  { id:'s10_4', topic:'chem-1.0', q:'Which is an example of an interstitial alloy?', options:['Bronze (Cu+Sn)','Steel (Fe+C)','Brass (Cu+Zn)','Solder (Sn+Pb)'], correct:1, explain:'Steel = Iron + Carbon. C atoms fit in gaps of Fe lattice.' },
  { id:'s10_5', topic:'chem-1.0', q:'Ionic compounds exist as what at room temperature?', options:['Liquids','Gases','Solids','Plasmas'], correct:2, explain:'Ionic compounds are solids. Ions arranged in crystal lattice.' },
  { id:'s10_6', topic:'chem-1.0', q:'What is the arrangement of ions in an ionic solid called?', options:['A molecule','A crystal lattice','A polymer','An alloy'], correct:1, explain:'Regular 3D arrangement of alternating + and - ions = crystal lattice.' },
  { id:'s10_7', topic:'chem-1.0', q:'During solvation of NaCl, which end of water surrounds Na⁺?', options:['Hydrogen end (positive dipole)','Oxygen end (negative dipole)','Both equally','Neither'], correct:1, explain:'Na⁺ is positive → attracted to negative dipole = oxygen end (δ−).' },
  { id:'s10_8', topic:'chem-1.0', q:'During solvation of NaCl, which end of water surrounds Cl⁻?', options:['Hydrogen end (positive dipole)','Oxygen end (negative dipole)','Both equally','Neither'], correct:0, explain:'Cl⁻ is negative → attracted to positive dipole = hydrogen end (δ+).' },
  { id:'s10_9', topic:'chem-1.0', q:'What is solvation?', options:['Ionic compound forming a crystal lattice','Dissolving an ionic solute in water','Water freezing','Metals forming alloys'], correct:1, explain:'Solvation = dissolving ionic solute in water. Water surrounds and separates ions.' },
  { id:'s10_10', topic:'chem-1.0', q:'How can you tell MgCl₂ has a different ratio than KCl in a particulate diagram?', options:['MgCl₂ has equal cations/anions','MgCl₂ has 2 Cl⁻ per Mg²⁺; KCl has 1:1','Both equal','MgCl₂ has no anions'], correct:1, explain:'MgCl₂ → 1 Mg²⁺ + 2 Cl⁻ (2:1). KCl → 1:1 ratio.' },
  { id:'s10_11', topic:'chem-1.0', q:'How can you tell a solute is covalent (molecular) rather than ionic?', options:['Molecules ionize completely','Molecules stay intact, don\'t break into ions','Forms crystal lattice','Molecules disappear'], correct:1, explain:'Covalent solutes (like HF) don\'t ionize much — molecules stay intact.' },
  { id:'s10_12', topic:'chem-1.0', q:'Mixture of iron and sulfur vs compound iron(II) sulfide — key difference?', options:['Mixture has bonded atoms; compound has separate','Mixture has separate Fe and S; compound has Fe-S bonded in fixed ratio','No difference','Compound has more atoms'], correct:1, explain:'Mixture = separate atoms. Compound = bonded in fixed ratio = chemical change.' },
  { id:'s10_13', topic:'chem-1.0', q:'Gas diagram: longer arrows, same spacing. What changed?', options:['Temperature increased at constant volume','Temperature increased at constant pressure','Pressure increased at constant temp','Volume increased'], correct:0, explain:'Longer arrows = faster = higher temp. Same spacing = same volume.' },
  { id:'s10_14', topic:'chem-1.0', q:'Gas diagram: particles spread farther apart, same speed. What changed?', options:['Temp increased at constant volume','Temp increased at constant pressure (volume increased)','Pressure increased at constant temp','Nothing'], correct:1, explain:'Same speed = same temp. Spread out = volume increased (constant pressure).' },
  { id:'s10_15', topic:'chem-1.0', q:'Gas diagram: particles closer together, same speed. What changed?', options:['Temp decreased','External pressure increased at constant temp (volume decreased)','Temp increased at constant volume','More particles added'], correct:1, explain:'Same speed = same temp. Closer = volume decreased (pressure increased).' },
  { id:'s10_16', topic:'chem-1.0', q:'Water is a __________ compound that can exist as solid, liquid, or gas.', options:['Ionic','Covalent','Metallic','Nuclear'], correct:1, explain:'Water (H₂O) is covalent — atoms share electrons. Exists in all 3 phases.' },

  // ===== SECTION 1.1: MOLES & MOLAR MASS =====
  { id:'s11_1', topic:'chem-1.1', q:'What is Avogadro\'s Number?', options:['6.022 × 10²³','3.14 × 10²³','1.6 × 10⁻¹⁹','9.8 m/s²'], correct:0, explain:'N_A = 6.022 × 10²³. Number of representative particles in 1 mole.' },
  { id:'s11_2', topic:'chem-1.1', q:'What is the representative particle of a monatomic element (like Carbon)?', options:['Molecule','Formula unit','Atom','Ion'], correct:2, explain:'Monatomic elements = individual atoms. Representative particle = atom.' },
  { id:'s11_3', topic:'chem-1.1', q:'What is the representative particle of a covalent compound (like C₁₂H₂₂O₁₁)?', options:['Atom','Molecule','Formula unit','Ion'], correct:1, explain:'Covalent compounds = molecules (atoms sharing electrons).' },
  { id:'s11_4', topic:'chem-1.1', q:'What is the representative particle of an ionic compound (like LiCl)?', options:['Atom','Molecule','Formula unit','Electron'], correct:2, explain:'Ionic compounds = formula units (ions formed by electron transfer).' },
  { id:'s11_5', topic:'chem-1.1', q:'Which is a diatomic element?', options:['C','He','N₂','NaCl'], correct:2, explain:'Diatomic: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂. N₂ is diatomic.' },
  { id:'s11_6', topic:'chem-1.1', q:'What is the molar mass of water (H₂O)? (H=1.01, O=16.00)', options:['16.00','17.01','18.02','20.02'], correct:2, explain:'2(1.01) + 16.00 = 18.02 g/mol.' },
  { id:'s11_7', topic:'chem-1.1', q:'What is the molar mass of carbon (C)?', options:['6.01','12.01','14.01','16.00'], correct:1, explain:'Carbon = 12.01 g/mol (from periodic table).' },
  { id:'s11_8', topic:'chem-1.1', q:'What is STP (Standard Temperature and Pressure)?', options:['0°C and 1 atm','25°C and 1 atm','0°C and 2 atm','25°C and 2 atm'], correct:0, explain:'STP = 0°C (273 K) and 1 atm.' },
  { id:'s11_9', topic:'chem-1.1', q:'At STP, 1 mole of an ideal gas occupies what volume?', options:['1 L','12.4 L','22.4 L','44.0 L'], correct:2, explain:'At STP, 1 mol gas = 22.4 L (molar volume).' },
  { id:'s11_10', topic:'chem-1.1', q:'Calculate the mass of 1.5 mol H₂. (Molar mass H₂ = 2.02 g/mol)', options:['1.01 g','3.03 g','4.04 g','0.75 g'], correct:1, explain:'1.5 × 2.02 = 3.03 g H₂.' },
  { id:'s11_11', topic:'chem-1.1', q:'Calculate the volume of 1.5 mol H₂ at STP.', options:['11.2 L','22.4 L','33.6 L','44.8 L'], correct:2, explain:'1.5 × 22.4 = 33.6 L at STP.' },
  { id:'s11_12', topic:'chem-1.1', q:'How many moles in 1.8 × 10²³ molecules of H₂?', options:['0.15 mol','0.30 mol','1.8 mol','6.02 mol'], correct:1, explain:'1.8×10²³ / 6.02×10²³ = 0.30 mol.' },
  { id:'s11_13', topic:'chem-1.1', q:'Mass of 4.5 L CO₂ at STP? (Molar mass CO₂ = 44.01)', options:['4.4 g','8.8 g','22.4 g','44.0 g'], correct:1, explain:'4.5/22.4 × 44.01 = 8.8 g CO₂.' },
  { id:'s11_14', topic:'chem-1.1', q:'How many atoms in 100.0 g Mg? (Molar mass = 24.31)', options:['1.2 × 10²⁴','2.4 × 10²⁴','4.1 × 10²⁴','6.02 × 10²³'], correct:1, explain:'100/24.31 × 6.02×10²³ = 2.4×10²⁴ atoms.' },
  { id:'s11_15', topic:'chem-1.1', q:'To convert grams → moles, you:', options:['Multiply by molar mass','Divide by molar mass (multiply by 1/molar mass)','Multiply by Avogadro\'s number','Multiply by 22.4'], correct:1, explain:'grams ÷ molar mass = moles.' },
  { id:'s11_16', topic:'chem-1.1', q:'To convert moles → atoms, you:', options:['Multiply by molar mass','Multiply by Avogadro\'s number (6.022 × 10²³)','Multiply by 22.4','Divide by Avogadro\'s number'], correct:1, explain:'moles × 6.022×10²³ = atoms.' },
  { id:'s11_17', topic:'chem-1.1', q:'To convert liters of gas at STP → moles, you:', options:['Multiply by 22.4','Divide by 22.4 (multiply by 1/22.4)','Multiply by molar mass','Multiply by Avogadro\'s number'], correct:1, explain:'liters ÷ 22.4 = moles at STP.' },
  { id:'s11_18', topic:'chem-1.1', q:'What is a "representative particle"?', options:['Largest particle of a substance','Smallest particle that has all properties of that substance','Any atom','Heaviest particle'], correct:1, explain:'Smallest unit retaining properties — atom, molecule, or formula unit.' },
  { id:'s11_19', topic:'chem-1.1', q:'1 mole of LiCl contains how many formula units?', options:['6.022 × 10²³','12.044 × 10²³','22.4','1'], correct:0, explain:'1 mole of anything = 6.022 × 10²³ particles. LiCl = formula units.' },

  // ===== SKILL CHECK: CHEM 101 (10 questions) =====
  // Curated from the Chem 101 prereq — covers all 6 topics
  { id:'scc1', topic:'sc-chem101', q:'Which 6 elements are the essential biological elements that form the backbone of macromolecules?', options:['C, H, O, N, P, S','C, H, O, N, Na, Cl','C, H, O, N, Fe, Mg','C, H, O, N, Ca, K'], correct:0, explain:'C, H, O, N, P, S — Carbon, Hydrogen, Oxygen, Nitrogen, Phosphorus, Sulfur. C/H/O/N in all macromolecules, P in nucleic acids/ATP, S in proteins.' },
  { id:'scc2', topic:'sc-chem101', q:'Which direction does electronegativity increase on the periodic table, and which element is most electronegative?', options:['Right and up; Fluorine','Left and down; Cesium','Right and down; Francium','Left and up; Helium'], correct:0, explain:'Electronegativity increases RIGHT across a period and UP a group. Fluorine (F) is the most electronegative element. Determines bond polarity.' },
  { id:'scc3', topic:'sc-chem101', q:'How does sodium (Na) become Na⁺, and what is this type of ion called?', options:['Loses 1 electron → cation (positive ion)','Gains 1 electron → anion (negative ion)','Gains 1 proton → cation','Shares 1 electron → neutral'], correct:0, explain:'Na has 1 valence electron → loses it to achieve full shell → Na⁺ (cation). Cations are positive ions (lost electrons), anions are negative (gained electrons).' },
  { id:'scc4', topic:'sc-chem101', q:'What does OIL RIG stand for, and in cellular respiration, what happens to glucose?', options:['Oxidation Is Loss, Reduction Is Gain; glucose is oxidized (loses e⁻/H)','Oxygen In Lungs, Respiration In Gut; glucose is reduced','Only Ionic Reactions Include Gases; glucose is neutral','Oil Inside Liquids, Rigs In Ground; glucose is unchanged'], correct:0, explain:'OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons). In cellular respiration, glucose is oxidized (loses H/e⁻), O₂ is reduced (gains H/e⁻ → H₂O).' },
  { id:'scc5', topic:'sc-chem101', q:'What are the 3 main types of chemical bonds, and which holds DNA base pairs together?', options:['Ionic, covalent, hydrogen; DNA base pairs = hydrogen bonds','Ionic, metallic, nuclear; DNA = ionic','Covalent, magnetic, gravitational; DNA = covalent','Hydrogen, metallic, ionic; DNA = metallic'], correct:0, explain:'Ionic (electron transfer), covalent (sharing), hydrogen (H↔O/N/F attraction). DNA base pairs (A-T, G-C) held by hydrogen bonds. DNA backbone = covalent.' },
  { id:'scc6', topic:'sc-chem101', q:'What makes a molecule polar vs nonpolar, and what does "like dissolves like" mean?', options:['Polar = unequal sharing (partial charges); polar dissolves polar, nonpolar dissolves nonpolar','Polar = equal sharing; polar dissolves everything','Polar = has oxygen; polar dissolves metals only','Polar = large molecule; polar dissolves small molecules'], correct:0, explain:'Polar = unequal electron sharing → δ+/δ− partial charges. Nonpolar = equal sharing. "Like dissolves like": polar dissolves polar (salt in water), nonpolar dissolves nonpolar (oil in gasoline).' },
  { id:'scc7', topic:'sc-chem101', q:'What part of a phospholipid is hydrophilic vs hydrophobic, and why can\'t polar molecules easily cross the membrane?', options:['Heads (phosphate) hydrophilic, tails (fatty acids) hydrophobic; membrane interior is nonpolar so polar molecules need transport proteins','Tails hydrophilic, heads hydrophobic; membrane is polar so nonpolar molecules can\'t cross','Both hydrophilic; everything crosses freely','Both hydrophobic; nothing crosses without protein'], correct:0, explain:'Phosphate heads = hydrophilic (polar), fatty acid tails = hydrophobic (nonpolar). Membrane interior = nonpolar → blocks polar molecules → selective permeability → need transport proteins.' },
  { id:'scc8', topic:'sc-chem101', q:'Why is water polar, and what property makes it the "universal solvent"?', options:['O is more electronegative than H (bent shape, dipoles don\'t cancel); its polarity dissolves other polar substances','Water has 3 atoms; it dissolves everything','Water contains ionic bonds; it dissolves ionic compounds only','Water is nonpolar; it dissolves nonpolar substances'], correct:0, explain:'O is δ−, H is δ+; bent shape → dipoles don\'t cancel → polar. Water is the "universal solvent" because it\'s polar → dissolves other polar/ionic substances (like dissolves like).' },
  { id:'scc9', topic:'sc-chem101', q:'Why does ice float, and what is the difference between cohesion and adhesion?', options:['H-bond lattice spreads molecules apart (less dense); cohesion = water-water, adhesion = water-surface','Ice is heavier; cohesion = water-surface, adhesion = water-water','Air bubbles; cohesion and adhesion are the same thing','Water contracts when freezing; cohesion = dissolving, adhesion = evaporating'], correct:0, explain:'Ice: H-bonds form a lattice → molecules farther apart → less dense → floats. Cohesion = water sticks to water (surface tension). Adhesion = water sticks to surfaces (capillary action).' },
  { id:'scc10', topic:'sc-chem101', q:'Why does sweating cool you down, and how does water move up a tree trunk against gravity?', options:['High specific heat — absorbs heat to evaporate; cohesion + adhesion = capillary action','Water is cold; pushed by roots','Reflects sunlight; pumped by tree\'s heart','Below body temp; vacuum at top'], correct:0, explain:'Sweating: high specific heat → water absorbs lots of heat to evaporate → cools skin. Trees: cohesion (water-water H-bonds) + adhesion (water-xylem walls) = capillary action pulls water upward.' },

  // ===== SKILL CHECK: AP CHEM 1.0 — PARTICULATE DIAGRAMS (10 questions) =====
  { id:'sc10a', topic:'sc-1.0', q:'In a particulate diagram of a gas, what do the arrows represent?', options:['Direction of movement and relative velocity','Charge of each particle','Mass of each particle','Number of bonds'], correct:0, explain:'Arrows = direction + velocity. Longer = faster. Not all particles move at the same speed.' },
  { id:'sc10b', topic:'sc-1.0', q:'What is the difference between a substitutional and interstitial alloy?', options:['Substitutional = similar-size metal replaces another; interstitial = small atoms fill gaps in metal lattice','Substitutional = small atoms fill gaps; interstitial = metal replaces another','Both are the same process','Substitutional = ionic; interstitial = covalent'], correct:0, explain:'Substitutional: similar-size atom replaces another (Bronze = Cu+Sn). Interstitial: small atoms fit in gaps (Steel = Fe+C).' },
  { id:'sc10c', topic:'sc-1.0', q:'Which is an example of an interstitial alloy, and why?', options:['Steel (Fe+C) — carbon atoms fit into gaps in the iron lattice','Bronze (Cu+Sn) — tin replaces copper atoms','Brass (Cu+Zn) — zinc replaces copper','Solder (Sn+Pb) — lead replaces tin'], correct:0, explain:'Steel = Iron + Carbon. C atoms are small enough to fit in the gaps (interstices) of the Fe lattice. Bronze/Brass are substitutional (similar-size atoms replace each other).' },
  { id:'sc10d', topic:'sc-1.0', q:'Ionic compounds exist as what at room temperature, and what is the arrangement called?', options:['Solids; crystal lattice (regular 3D arrangement of alternating + and - ions)','Liquids; random distribution','Gases; free-floating ions','Plasmas; charged particles'], correct:0, explain:'Ionic compounds are solids at room temperature. Ions arranged in a crystal lattice — regular 3D pattern of alternating cations and anions.' },
  { id:'sc10e', topic:'sc-1.0', q:'During solvation of NaCl, which end of water surrounds Na⁺ and which surrounds Cl⁻?', options:['Na⁺ → oxygen end (δ−); Cl⁻ → hydrogen end (δ+)','Na⁺ → hydrogen end (δ+); Cl⁻ → oxygen end (δ−)','Both → oxygen end','Both → hydrogen end'], correct:0, explain:'Na⁺ is positive → attracted to negative dipole = oxygen end (δ−). Cl⁻ is negative → attracted to positive dipole = hydrogen end (δ+). Opposite charges attract.' },
  { id:'sc10f', topic:'sc-1.0', q:'How can you tell a solute is covalent (molecular) rather than ionic in a particulate diagram?', options:['Molecules stay intact — don\'t break into separate ions','Molecules ionize completely into individual ions','Forms a crystal lattice','Molecules disappear completely'], correct:0, explain:'Covalent solutes (like HF, sugar) don\'t ionize much — molecules stay intact in solution. Ionic solutes break into separate cations and anions.' },
  { id:'sc10g', topic:'sc-1.0', q:'Mixture of iron and sulfur vs compound iron(II) sulfide — what\'s the key difference in a particulate diagram?', options:['Mixture has separate Fe and S atoms; compound has Fe-S bonded in fixed ratio','Mixture has bonded atoms; compound has separate atoms','No difference — both are the same','Compound has more atoms than mixture'], correct:0, explain:'Mixture = separate Fe and S atoms (can vary ratio). Compound = Fe-S chemically bonded in fixed 1:1 ratio = chemical change occurred.' },
  { id:'sc10h', topic:'sc-1.0', q:'Gas diagram: longer arrows, same spacing. What changed?', options:['Temperature increased at constant volume','Temperature increased at constant pressure','Pressure increased at constant temp','Volume increased'], correct:0, explain:'Longer arrows = faster particles = higher temperature. Same spacing = same volume. This is constant-volume heating.' },
  { id:'sc10i', topic:'sc-1.0', q:'Gas diagram: particles spread farther apart, same speed. What changed?', options:['Temperature increased at constant pressure (volume increased)','Temperature increased at constant volume','Pressure increased at constant temp','Nothing changed'], correct:0, explain:'Same speed = same temperature. Particles spread out = volume increased. At constant pressure, higher temp → larger volume (Charles\'s Law behavior).' },
  { id:'sc10j', topic:'sc-1.0', q:'How can you tell MgCl₂ has a different ratio than KCl in a particulate diagram?', options:['MgCl₂ has 2 Cl⁻ per Mg²⁺ (2:1 ratio); KCl has 1:1 ratio','MgCl₂ has 1:1 ratio; KCl has 2:1','Both have 1:1 ratio','MgCl₂ has no anions'], correct:0, explain:'Mg²⁺ has +2 charge → needs 2 Cl⁻ (−1 each) → MgCl₂ = 2:1 ratio. K⁺ has +1 → needs 1 Cl⁻ → KCl = 1:1 ratio. The diagram shows different ion counts.' },

  // ===== SKILL CHECK: AP CHEM 1.1 — MOLES & MOLAR MASS (10 questions) =====
  { id:'sc11a', topic:'sc-1.1', q:'What is Avogadro\'s Number and what does it represent?', options:['6.022 × 10²³ — number of representative particles in 1 mole','3.14 × 10²³ — number of atoms in 1 gram','1.6 × 10⁻¹⁹ — charge of one electron','9.8 — acceleration due to gravity'], correct:0, explain:'N_A = 6.022 × 10²³. One mole of any substance contains this many representative particles (atoms, molecules, or formula units).' },
  { id:'sc11b', topic:'sc-1.1', q:'What is the representative particle of each: Carbon (element), C₁₂H₂₂O₁₁ (covalent), LiCl (ionic)?', options:['Atom; molecule; formula unit','Molecule; atom; ion','Formula unit; molecule; atom','Ion; formula unit; molecule'], correct:0, explain:'Monatomic element (C) → atom. Covalent compound (sugar) → molecule. Ionic compound (LiCl) → formula unit. The representative particle is the smallest unit retaining properties.' },
  { id:'sc11c', topic:'sc-1.1', q:'What is the molar mass of water (H₂O)? (H=1.01, O=16.00)', options:['18.02 g/mol','16.00 g/mol','17.01 g/mol','20.02 g/mol'], correct:0, explain:'2(1.01) + 16.00 = 18.02 g/mol. Molar mass = sum of all atomic masses in the formula.' },
  { id:'sc11d', topic:'sc-1.1', q:'What is STP, and what volume does 1 mole of ideal gas occupy at STP?', options:['0°C (273 K) and 1 atm; 22.4 L','25°C and 1 atm; 24.5 L','0°C and 2 atm; 11.2 L','25°C and 2 atm; 12.2 L'], correct:0, explain:'STP = Standard Temperature and Pressure = 0°C (273 K) and 1 atm. At STP, 1 mole of any ideal gas occupies 22.4 L (molar volume).' },
  { id:'sc11e', topic:'sc-1.1', q:'Calculate the mass of 1.5 mol H₂. (Molar mass H₂ = 2.02 g/mol)', options:['3.03 g','1.01 g','4.04 g','0.75 g'], correct:0, explain:'mass = moles × molar mass = 1.5 × 2.02 = 3.03 g H₂.' },
  { id:'sc11f', topic:'sc-1.1', q:'Calculate the volume of 1.5 mol H₂ at STP.', options:['33.6 L','22.4 L','11.2 L','44.8 L'], correct:0, explain:'volume = moles × 22.4 L/mol = 1.5 × 22.4 = 33.6 L at STP.' },
  { id:'sc11g', topic:'sc-1.1', q:'How many moles are in 1.8 × 10²³ molecules of H₂?', options:['0.30 mol','0.15 mol','1.8 mol','6.02 mol'], correct:0, explain:'moles = molecules ÷ Avogadro\'s number = (1.8 × 10²³) ÷ (6.022 × 10²³) = 0.30 mol.' },
  { id:'sc11h', topic:'sc-1.1', q:'What is the mass of 4.5 L CO₂ at STP? (Molar mass CO₂ = 44.01 g/mol)', options:['8.8 g','4.4 g','22.4 g','44.0 g'], correct:0, explain:'Step 1: moles = 4.5 L ÷ 22.4 L/mol = 0.201 mol. Step 2: mass = 0.201 × 44.01 = 8.8 g CO₂.' },
  { id:'sc11i', topic:'sc-1.1', q:'How many atoms are in 100.0 g Mg? (Molar mass = 24.31 g/mol)', options:['2.4 × 10²⁴ atoms','1.2 × 10²⁴ atoms','4.1 × 10²⁴ atoms','6.02 × 10²³ atoms'], correct:0, explain:'Step 1: moles = 100.0 ÷ 24.31 = 4.114 mol. Step 2: atoms = 4.114 × 6.022 × 10²³ = 2.4 × 10²⁴ atoms.' },
  { id:'sc11j', topic:'sc-1.1', q:'To convert grams → moles → atoms, what two operations do you perform?', options:['Divide by molar mass, then multiply by Avogadro\'s number','Multiply by molar mass, then divide by Avogadro\'s number','Multiply by 22.4, then divide by molar mass','Divide by Avogadro\'s number, then multiply by 22.4'], correct:0, explain:'grams ÷ molar mass = moles. moles × 6.022 × 10²³ = atoms. Two-step conversion: divide by molar mass, multiply by Avogadro\'s number.' },
];

// ===== WORKED EXAMPLES =====
// Step-by-step solutions for key questions (Cognitive Load Theory: worked examples > problem solving for novices)
// Fading: as mastery increases, fewer steps are shown (expertise reversal effect)

const WORKED_EXAMPLES = {
  's11_6': {
    steps: [
      'Identify the compound: H₂O (water)',
      'Find atomic masses from periodic table: H = 1.01, O = 16.00',
      'Count atoms: 2 hydrogen + 1 oxygen',
      'Calculate: 2(1.01) + 1(16.00) = 2.02 + 16.00',
      'Molar mass = 18.02 g/mol',
    ],
  },
  's11_10': {
    steps: [
      'Given: 1.5 mol H₂, molar mass H₂ = 2.02 g/mol',
      'Formula: mass = moles × molar mass',
      'Plug in: mass = 1.5 × 2.02',
      'Calculate: 1.5 × 2.02 = 3.03',
      'Answer: 3.03 g H₂',
    ],
  },
  's11_11': {
    steps: [
      'Given: 1.5 mol H₂ at STP',
      'At STP, 1 mol of any gas = 22.4 L',
      'Formula: volume = moles × 22.4 L/mol',
      'Plug in: volume = 1.5 × 22.4',
      'Calculate: 1.5 × 22.4 = 33.6',
      'Answer: 33.6 L H₂',
    ],
  },
  's11_12': {
    steps: [
      'Given: 1.8 × 10²³ molecules H₂',
      'Avogadro\'s number: 1 mol = 6.022 × 10²³ molecules',
      'Formula: moles = molecules ÷ Avogadro\'s number',
      'Plug in: moles = (1.8 × 10²³) ÷ (6.022 × 10²³)',
      'Calculate: 1.8 ÷ 6.022 = 0.299',
      'Answer: 0.30 mol H₂',
    ],
  },
  's11_13': {
    steps: [
      'Given: 4.5 L CO₂ at STP, molar mass CO₂ = 44.01 g/mol',
      'Step 1: Convert liters → moles using 22.4 L/mol',
      'moles = 4.5 ÷ 22.4 = 0.201 mol',
      'Step 2: Convert moles → grams using molar mass',
      'mass = 0.201 × 44.01 = 8.85',
      'Answer: 8.8 g CO₂',
    ],
  },
  's11_14': {
    steps: [
      'Given: 100.0 g Mg, molar mass = 24.31 g/mol',
      'Step 1: Convert grams → moles',
      'moles = 100.0 ÷ 24.31 = 4.114 mol',
      'Step 2: Convert moles → atoms using Avogadro\'s number',
      'atoms = 4.114 × 6.022 × 10²³',
      'Calculate: 4.114 × 6.022 = 24.77',
      'Answer: 2.4 × 10²⁴ atoms Mg',
    ],
  },
  'p3': {
    steps: [
      'Electronegativity trends on the periodic table:',
      'Across a period (left → right): increases (more protons = stronger pull)',
      'Down a group (top → bottom): decreases (more shells = farther from nucleus)',
      'Therefore: increases RIGHT and UP',
      'Fluorine (top-right, excluding noble gases) is most electronegative',
    ],
  },
  'p6': {
    steps: [
      'Sodium (Na) is in Group 1 → 1 valence electron',
      'Goal: achieve stable octet (8 outer electrons, like noble gases)',
      'Option A: gain 7 electrons → too many, impractical',
      'Option B: lose 1 electron → reveals full shell below → stable',
      'Na → Na⁺ + e⁻ (lost 1 electron → +1 charge = cation)',
    ],
  },
  's10_3': {
    steps: [
      'Interstitial alloy definition: small atoms fit into GAPS of metal lattice',
      'Think of it like marbles in a jar of larger balls',
      'The small atoms don\'t replace — they fill spaces',
      'Steel = Iron (large) + Carbon (small) → Carbon fills gaps in Fe lattice',
      'Contrast with substitutional: Bronze = Cu + Sn (similar size, Sn replaces Cu)',
    ],
  },
  's10_7': {
    steps: [
      'NaCl dissolving in water — which end of H₂O attracts Na⁺?',
      'Na⁺ is a CATION (positive ion)',
      'Water is polar: O is δ⁻ (partial negative), H is δ⁺ (partial positive)',
      'Opposite charges attract: Na⁺ (positive) → attracted to O (negative)',
      'So the OXYGEN end of water surrounds Na⁺',
    ],
  },
};

// ===== ELABORATION PROMPTS =====
// After correct answers, prompt self-generated examples (constructive retrieval, 2024)
// These are open-ended — the student generates their own answer

const ELABORATION_PROMPTS = {
  'prereq': [
    'Can you think of a real-world example where electronegativity differences matter?',
    'How does the concept you just answered relate to something you learned in biology?',
    'Can you draw a quick particulate diagram of this concept?',
    'What would happen if this principle were reversed?',
  ],
  'chem-1.0': [
    'Sketch a particulate diagram showing this concept.',
    'Can you think of another example of this type of substance?',
    'How would this look different at a different temperature?',
    'What real-world material uses this concept?',
  ],
  'chem-1.1': [
    'Can you estimate the answer without calculating first?',
    'What units should the answer have? Why?',
    'Can you think of a real object that contains about 1 mole of this substance?',
    'How would you explain this calculation to someone who hasn\'t taken chemistry?',
  ],
  'sc-chem101': [
    'How does this chemistry concept connect to something in AP Bio Unit 1?',
    'Can you think of a real-world example where this concept matters?',
    'How would you explain this to someone who hasn\'t taken chemistry?',
    'What would happen to a cell if this property didn\'t exist?',
  ],
  'sc-1.0': [
    'Can you sketch a particulate diagram of this concept from memory?',
    'What would this look like at a different temperature or pressure?',
    'Can you think of a real-world material that uses this concept?',
    'How would you identify this in a lab experiment?',
  ],
  'sc-1.1': [
    'Can you estimate the answer before calculating?',
    'What units should the answer have? Why?',
    'Can you think of a real object that contains about 1 mole of this substance?',
    'How would you explain this calculation to a friend?',
  ],
};

// Make available globally
if (typeof window !== 'undefined') {
  window.TOPICS = TOPICS;
  window.QUESTIONS = QUESTIONS;
  window.WORKED_EXAMPLES = WORKED_EXAMPLES;
  window.ELABORATION_PROMPTS = ELABORATION_PROMPTS;
}
