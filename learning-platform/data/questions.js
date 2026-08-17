// ===== QUIZ QUESTIONS DATA =====
// Organized by class → section
// "prereq" = AP Chem prerequisite (Chem 101)
// "chem-1.0" = AP Chem Section 1.0 (Particulate Diagrams)
// "chem-1.1" = AP Chem Section 1.1 (Moles & Molar Mass)

const TOPICS = [
  { id: 'prereq', label: 'AP Chem — Prerequisite (Chem 101)', class: 'AP Chemistry' },
  { id: 'chem-1.0', label: 'AP Chem — 1.0: Particulate Diagrams', class: 'AP Chemistry' },
  { id: 'chem-1.1', label: 'AP Chem — 1.1: Moles & Molar Mass', class: 'AP Chemistry' },
  { id: 'skill-check', label: '🧪 Skill Check — Chem + AP Bio Unit 1', class: 'Skill Check' },
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

  // ===== SKILL CHECK: CHEM NOTES + AP BIO UNIT 1 =====
  // Covers: Chem 101 prereq (electronegativity, bonds, polarity, water, redox)
  //         + AP Bio Unit 1 (macromolecules, dehydration synthesis, DNA structure, proteins, lipids)
  { id:'sc1', topic:'skill-check', q:'Water has a high specific heat, meaning it absorbs lots of energy before changing temperature. Which property of water is responsible for this, and why does it matter biologically?', options:['H-bonds absorb/release lots of energy → temperature regulation (sweating, stable aquatic environments)','Covalent bonds are very strong → prevents water from boiling','Ionic bonds store heat → releases it at night','Metallic bonds conduct heat → warms organisms'], correct:0, explain:'H-bonds between water molecules absorb/release large amounts of energy → high specific heat → temperature regulation. Why sweating cools you, why oceans are stable, why organisms can maintain homeostasis.' },
  { id:'sc2', topic:'skill-check', q:'A phospholipid bilayer forms the cell membrane. Which end faces the water (hydrophilic) and which faces inward (hydrophobic), and why?', options:['Phosphate heads face water (polar), fatty acid tails face inward (nonpolar)','Fatty acid tails face water (polar), phosphate heads face inward (nonpolar)','Both ends face water — bilayer is symmetrical','Heads face inward because they repel water'], correct:0, explain:'Phosphate heads = polar (hydrophilic) → face water. Fatty acid tails = nonpolar (hydrophobic) → face inward, away from water. This creates selective permeability — polar molecules need transport proteins.' },
  { id:'sc3', topic:'skill-check', q:'In cellular respiration, glucose is oxidized and oxygen is reduced. What does this mean in terms of electron transfer?', options:['Glucose loses electrons (and H), oxygen gains electrons (and H → water)','Glucose gains electrons, oxygen loses electrons','Both gain electrons from NAD+','Both lose electrons to the electron transport chain'], correct:0, explain:'OIL RIG: Oxidation Is Loss, Reduction Is Gain. Glucose is oxidized (loses e⁻/H), O₂ is reduced (gains e⁻/H → H₂O). Energy released drives ATP synthesis.' },
  { id:'sc4', topic:'skill-check', q:'Dehydration synthesis builds a polymer from monomers. What happens, and what is removed?', options:['Monomers join by forming covalent bonds; a water molecule is removed for each bond','Monomers split apart; water is added to break bonds','Monomers exchange electrons; no water is involved','Monomers form ionic bonds; CO₂ is removed'], correct:0, explain:'Dehydration synthesis: monomers join → covalent bond forms → H₂O removed (one H from one monomer, one OH from the other). Hydrolysis is the reverse — water is ADDED to break bonds.' },
  { id:'sc5', topic:'skill-check', q:'DNA is structured as an antiparallel double helix. How do the bases pair, and how many H-bonds hold each pair together?', options:['A-T (2 H-bonds), C-G (3 H-bonds)','A-G (2 H-bonds), C-T (3 H-bonds)','A-T (3 H-bonds), C-G (2 H-bonds)','A-C (2 H-bonds), G-T (3 H-bonds)'], correct:0, explain:'Adenine pairs with Thymine via 2 hydrogen bonds. Cytosine pairs with Guanine via 3 hydrogen bonds. The 3 H-bonds in C-G make it stronger (harder to separate). Strands run antiparallel (5′→3′ and 3′→5′).' },
  { id:'sc6', topic:'skill-check', q:'Why can\'t polar molecules easily cross the cell membrane without a transport protein?', options:['The membrane interior is nonpolar (hydrophobic tails), so polar molecules are blocked','Polar molecules are too large to fit through the membrane','The membrane is made of metal and repels polar molecules','Polar molecules dissolve the membrane'], correct:0, explain:'Cell membrane interior = hydrophobic (nonpolar fatty acid tails). Polar molecules can\'t pass through without a transport protein. This is selective permeability — "like dissolves like" applied to membranes.' },
  { id:'sc7', topic:'skill-check', q:'A protein\'s primary structure is the sequence of amino acids. What determines the protein\'s overall shape (and therefore its function)?', options:['The specific order of amino acids and interactions between their R groups (hydrophobic, hydrophilic, ionic)','The number of water molecules around it','The temperature of the cell only','The type of cell it is in'], correct:0, explain:'Primary structure (amino acid sequence) determines shape because R groups interact: hydrophobic R groups fold inward, hydrophilic face water, ionic R groups attract/repel. Shape = function (e.g., enzyme active site).' },
  { id:'sc8', topic:'skill-check', q:'Carbon is the backbone of all biological macromolecules. Why is carbon so well-suited for this role?', options:['Carbon forms 4 covalent bonds, allowing complex, stable, diverse molecular structures','Carbon is the most electronegative element, pulling electrons from other atoms','Carbon forms ionic bonds that are very strong','Carbon is the lightest element, making molecules less dense'], correct:0, explain:'Carbon has 4 valence electrons → forms 4 covalent bonds → can build long chains, rings, branched structures. This diversity allows carbohydrates, proteins, lipids, and nucleic acids. Carbon is the basis of all organic chemistry.' },
  { id:'sc9', topic:'skill-check', q:'NAD⁺ becomes NADH during cellular respiration. Is this oxidation or reduction, and why does it matter?', options:['Reduction — NAD⁺ gains electrons; NADH carries them to the electron transport chain to make ATP','Oxidation — NAD⁺ loses electrons; NADH is a waste product','Reduction — but NADH is immediately broken down for energy','Oxidation — NAD⁺ gives electrons to glucose'], correct:0, explain:'NAD⁺ + 2e⁻ + H⁺ → NADH = reduction (gains electrons). NADH is an electron carrier — it shuttles high-energy electrons to the ETC, where their energy is used to make ATP. FAD → FADH₂ works the same way.' },
  { id:'sc10', topic:'skill-check', q:'Lipids are nonpolar macromolecules. How does the saturation of fatty acid tails affect their structure and function?', options:['Saturated = no double bonds = straight chains = pack tightly (solid at room temp, like butter). Unsaturated = double bonds = kinks = pack loosely (liquid, like oil).','Saturated = many double bonds = liquid. Unsaturated = no double bonds = solid.','Saturation only affects taste, not structure','Saturated fats are always healthier than unsaturated fats'], correct:0, explain:'Saturated fatty acids have no C=C double bonds → straight chains → pack tightly → solid at room temp (butter, animal fat). Unsaturated have C=C double bonds → kinks → pack loosely → liquid (olive oil, fish oil). Phospholipids in cell membranes have both saturated and unsaturated tails.' },
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
  'skill-check': [
    'Can you connect this concept to something specific you learned in BOTH chem and bio?',
    'How would you explain this to a friend who only took one of the two classes?',
    'Can you draw a quick diagram of this concept from memory?',
    'What would happen to a cell if this process stopped working?',
    'Can you think of a real-world example where this concept matters outside of class?',
  ],
};

// Make available globally
if (typeof window !== 'undefined') {
  window.TOPICS = TOPICS;
  window.QUESTIONS = QUESTIONS;
  window.WORKED_EXAMPLES = WORKED_EXAMPLES;
  window.ELABORATION_PROMPTS = ELABORATION_PROMPTS;
}
