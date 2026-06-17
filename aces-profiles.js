/**
 * Aces AI Card Deck Data
 * Based on BattleTech Aces Alpha Strike ruleset
 * Four decks: Brawler, Skirmisher, Sniper, Striker — 8 cards each
 */

const ACES_CARDS = [
  // ============= BRAWLER DECK =============
  // Close-range specialists that push into short range and overwhelm targets.
  {
    deck: "Brawler",
    cardNumber: 1,
    priority: 18,
    usesOverheat: false,
    ifFirst: "Move toward the nearest enemy at maximum speed.",
    movementLogic: [
      "Move to short range of the nearest enemy.",
      "Move into cover.",
      "Move into LOS of the nearest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Near", "No Cover"]
  },
  {
    deck: "Brawler",
    cardNumber: 2,
    priority: 44,
    usesOverheat: false,
    ifFirst: "Advance to short range of the nearest enemy.",
    movementLogic: [
      "Move to short range of the nearest enemy.",
      "Move into cover.",
      "Move into LOS of the most damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "TMM", "Near"]
  },
  {
    deck: "Brawler",
    cardNumber: 3,
    priority: 67,
    usesOverheat: false,
    ifFirst: "Move toward the nearest enemy while seeking cover.",
    movementLogic: [
      "Move to short range.",
      "Move into cover.",
      "Move into LOS of the nearest enemy.",
      "Move toward the largest enemy cluster."
    ],
    combatPriorities: ["Can Destroy", "Near", "No Cover", "TMM"]
  },
  {
    deck: "Brawler",
    cardNumber: 4,
    priority: 89,
    usesOverheat: true,
    ifFirst: "Charge the nearest enemy at maximum speed.",
    movementLogic: [
      "Move to short range of the nearest enemy.",
      "Move into LOS of the nearest enemy.",
      "Move into cover.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "TMM", "Damaged"]
  },
  {
    deck: "Brawler",
    cardNumber: 5,
    priority: 112,
    usesOverheat: false,
    ifFirst: "Move to engage the most damaged enemy at short range.",
    movementLogic: [
      "Move to short range of the most damaged enemy.",
      "Move into cover.",
      "Move into LOS of the most damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "Near", "No Cover"]
  },
  {
    deck: "Brawler",
    cardNumber: 6,
    priority: 136,
    usesOverheat: false,
    ifFirst: "Rush into close range while using terrain for cover.",
    movementLogic: [
      "Move to short range.",
      "Move into cover.",
      "Move into LOS of the lowest-TMM enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Near", "Damaged"]
  },
  {
    deck: "Brawler",
    cardNumber: 7,
    priority: 158,
    usesOverheat: true,
    ifFirst: "Sprint toward the nearest group of enemies.",
    movementLogic: [
      "Move to short range.",
      "Move into LOS of the nearest enemy.",
      "Move toward the nearest enemy.",
      "Move into cover."
    ],
    combatPriorities: ["Can Destroy", "Near", "No Cover", "Damaged"]
  },
  {
    deck: "Brawler",
    cardNumber: 8,
    priority: 181,
    usesOverheat: false,
    ifFirst: "Advance at full speed toward the nearest enemy.",
    movementLogic: [
      "Move to short range of the nearest enemy.",
      "Move toward the enemy with the most remaining structure.",
      "Move into LOS of the nearest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "TMM", "No Cover"]
  },

  // ============= SKIRMISHER DECK =============
  // Mobile harassers that maintain medium range, use cover, and exploit LOS.
  {
    deck: "Skirmisher",
    cardNumber: 1,
    priority: 22,
    usesOverheat: false,
    ifFirst: "Move to medium range while taking cover.",
    movementLogic: [
      "Move to medium range.",
      "Move into cover.",
      "Move into LOS of the lowest-TMM enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Range", "No Cover", "Near"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 2,
    priority: 166,
    usesOverheat: false,
    ifFirst: "Move to medium range, prioritizing cover.",
    movementLogic: [
      "Move to medium range.",
      "Move into cover.",
      "Move into LOS of the lowest-TMM enemy.",
      "Move into LOS of the nearest enemy within medium range.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Range", "No Cover", "Near"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 3,
    priority: 51,
    usesOverheat: false,
    ifFirst: "Reposition to an optimal medium-range firing position.",
    movementLogic: [
      "Move to medium range.",
      "Move into cover.",
      "Move into LOS of the most damaged enemy.",
      "Move toward the nearest enemy at medium range."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "TMM", "Range", "Near"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 4,
    priority: 74,
    usesOverheat: false,
    ifFirst: "Move to medium range with maximum available cover.",
    movementLogic: [
      "Stay at medium range.",
      "Move into heavy cover.",
      "Move into LOS of the lowest-TMM enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "No Cover", "Range", "Near"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 5,
    priority: 97,
    usesOverheat: false,
    ifFirst: "Rush toward medium range of the nearest enemy.",
    movementLogic: [
      "Move to medium range of the nearest enemy.",
      "Move into LOS.",
      "Move into cover.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "TMM", "Range", "No Cover"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 6,
    priority: 120,
    usesOverheat: false,
    ifFirst: "Find a covered medium-range firing position.",
    movementLogic: [
      "Move to medium range.",
      "Move into cover.",
      "Move into LOS of the highest-threat enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Range", "TMM", "Damaged", "Near"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 7,
    priority: 143,
    usesOverheat: true,
    ifFirst: "Move to medium range while staying in cover.",
    movementLogic: [
      "Move to medium range.",
      "Move into cover.",
      "Move into LOS of the nearest enemy.",
      "Move to a flank position."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Range", "No Cover", "Near"]
  },
  {
    deck: "Skirmisher",
    cardNumber: 8,
    priority: 188,
    usesOverheat: false,
    ifFirst: "Hold position and engage from medium range.",
    movementLogic: [
      "Hold at medium range.",
      "Move into cover.",
      "Move into LOS of the most damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "Near", "TMM", "Range"]
  },

  // ============= SNIPER DECK =============
  // Long-range precision units that maximize distance, cover, and LOS advantage.
  {
    deck: "Sniper",
    cardNumber: 1,
    priority: 12,
    usesOverheat: false,
    ifFirst: "Find a covered long-range firing position.",
    movementLogic: [
      "Move to long range.",
      "Move into cover.",
      "Move into LOS of the lowest-TMM enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Range", "No Cover", "Damaged"]
  },
  {
    deck: "Sniper",
    cardNumber: 2,
    priority: 36,
    usesOverheat: false,
    ifFirst: "Establish a long-range position with LOS to priority targets.",
    movementLogic: [
      "Maintain long range.",
      "Move into cover.",
      "Move into LOS of the most damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "TMM", "Range", "Near"]
  },
  {
    deck: "Sniper",
    cardNumber: 3,
    priority: 59,
    usesOverheat: true,
    ifFirst: "Move to a dominant long-range position.",
    movementLogic: [
      "Move to long range.",
      "Move into heavy cover.",
      "Move into LOS of multiple enemies.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Range", "Damaged", "No Cover"]
  },
  {
    deck: "Sniper",
    cardNumber: 4,
    priority: 82,
    usesOverheat: false,
    ifFirst: "Take the most defensible long-range position available.",
    movementLogic: [
      "Move to long range.",
      "Move into heavy cover.",
      "Stay out of short range.",
      "Move toward the nearest enemy at long range."
    ],
    combatPriorities: ["Can Destroy", "TMM", "No Cover", "Range", "Near"]
  },
  {
    deck: "Sniper",
    cardNumber: 5,
    priority: 105,
    usesOverheat: false,
    ifFirst: "Reposition to gain LOS advantage at long range.",
    movementLogic: [
      "Move to long range.",
      "Move into cover.",
      "Move into LOS of the lowest-armor enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Range", "TMM", "Damaged", "Near"]
  },
  {
    deck: "Sniper",
    cardNumber: 6,
    priority: 128,
    usesOverheat: false,
    ifFirst: "Advance to long range of priority targets.",
    movementLogic: [
      "Move to long range while maintaining LOS.",
      "Move into cover.",
      "Move into LOS of the damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "Range", "TMM", "No Cover"]
  },
  {
    deck: "Sniper",
    cardNumber: 7,
    priority: 151,
    usesOverheat: false,
    ifFirst: "Set up in an elevated or covered long-range position.",
    movementLogic: [
      "Move to long range.",
      "Move to the highest available terrain with LOS.",
      "Move into cover.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Range", "Near", "No Cover"]
  },
  {
    deck: "Sniper",
    cardNumber: 8,
    priority: 174,
    usesOverheat: false,
    ifFirst: "Move to maximum-range position with any available cover.",
    movementLogic: [
      "Move to long or extreme range.",
      "Move into cover.",
      "Move into LOS of the weakest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Range", "Damaged", "TMM", "Near"]
  },

  // ============= STRIKER DECK =============
  // Fast flankers that close quickly, hit hard, and exploit isolated targets.
  {
    deck: "Striker",
    cardNumber: 1,
    priority: 28,
    usesOverheat: false,
    ifFirst: "Rush to a flanking position at maximum speed.",
    movementLogic: [
      "Move to flank the nearest enemy.",
      "Move to short range.",
      "Move into LOS of the nearest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "TMM", "No Cover"]
  },
  {
    deck: "Striker",
    cardNumber: 2,
    priority: 52,
    usesOverheat: true,
    ifFirst: "Move at maximum speed toward the closest enemy.",
    movementLogic: [
      "Move to short range of the closest enemy.",
      "Move into cover.",
      "Move into LOS of the nearest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "No Cover", "TMM"]
  },
  {
    deck: "Striker",
    cardNumber: 3,
    priority: 75,
    usesOverheat: false,
    ifFirst: "Advance toward the most damaged enemy at full speed.",
    movementLogic: [
      "Move to short range of the most damaged enemy.",
      "Move into cover.",
      "Move into LOS of the damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "Near", "TMM", "No Cover"]
  },
  {
    deck: "Striker",
    cardNumber: 4,
    priority: 98,
    usesOverheat: false,
    ifFirst: "Flank the enemy formation at maximum speed.",
    movementLogic: [
      "Move to flank the nearest enemy cluster.",
      "Move to short range.",
      "Move into LOS of the nearest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "No Cover", "Near", "TMM"]
  },
  {
    deck: "Striker",
    cardNumber: 5,
    priority: 121,
    usesOverheat: false,
    ifFirst: "Rush to an optimal firing position.",
    movementLogic: [
      "Move to short or medium range.",
      "Move into cover.",
      "Move into LOS of the priority target.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "TMM", "Near", "Damaged", "No Cover"]
  },
  {
    deck: "Striker",
    cardNumber: 6,
    priority: 144,
    usesOverheat: false,
    ifFirst: "Move quickly to a covered short-range position.",
    movementLogic: [
      "Move to short range with cover.",
      "Move into LOS of the nearest enemy.",
      "Hold position for defense.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "TMM", "Range", "No Cover"]
  },
  {
    deck: "Striker",
    cardNumber: 7,
    priority: 167,
    usesOverheat: false,
    ifFirst: "Advance to support the main assault at speed.",
    movementLogic: [
      "Move to short range of an enemy engaged with an ally.",
      "Move into cover.",
      "Move into LOS of the damaged enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Damaged", "Near", "No Cover", "TMM"]
  },
  {
    deck: "Striker",
    cardNumber: 8,
    priority: 190,
    usesOverheat: false,
    ifFirst: "Move to intercept position at maximum speed.",
    movementLogic: [
      "Move to short range of the isolated enemy.",
      "Move into cover.",
      "Move into LOS of the closest enemy.",
      "Move toward the nearest enemy."
    ],
    combatPriorities: ["Can Destroy", "Near", "Damaged", "TMM", "No Cover"]
  }
];

/**
 * Descriptions for each target icon used in combat priority chains.
 * Evaluated left-to-right; use the next icon as a tiebreaker when multiple
 * targets satisfy the current icon equally.
 */
const TARGET_ICON_DESCRIPTIONS = {
  "Can Destroy": "A target whose structure you can reduce to 0 this round",
  "TMM": "The target with the lowest Target Movement Modifier (easiest to hit)",
  "Range": "A target within your deck's preferred range bracket",
  "No Cover": "A target not in cover (no terrain defense bonus)",
  "Near": "The nearest enemy unit",
  "Damaged": "The most damaged enemy (fewest remaining structure points)",
  "High TMM": "The target with the highest TMM — avoid this target when possible"
};

/**
 * Evaluate Aces AI card behavior based on deck, card, and situation.
 * @param {Object} answers
 * @param {string}  answers.deck        - "Brawler" | "Skirmisher" | "Sniper" | "Striker"
 * @param {number}  answers.cardNumber  - 1–8
 * @param {boolean} answers.enemyMoved  - true if at least one enemy unit has moved this round
 * @returns {Object} Card data and movement/combat guidance
 */
function evaluateAcesBehavior(answers) {
  const { deck, cardNumber, enemyMoved } = answers;

  const card = ACES_CARDS.find(
    c => c.deck === deck && c.cardNumber === parseInt(cardNumber, 10)
  );

  if (!card) {
    return { error: "Invalid deck or card number" };
  }

  return {
    card,
    useIfFirst: !enemyMoved
  };
}

// Export for use in HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ACES_CARDS,
    TARGET_ICON_DESCRIPTIONS,
    evaluateAcesBehavior
  };
}
