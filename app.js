function getNumber(id) {
  return Number(document.getElementById(id).value) || 0;
}

function setHiddenFromButtons(groupId, inputId, activeClass, dataAttr) {
  const group = document.getElementById(groupId);
  const input = document.getElementById(inputId);
  if (!group || !input) return;
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const value = btn.dataset[dataAttr] ?? "";
    input.value = value;

    [...group.querySelectorAll("button")].forEach((b) =>
      b.classList.remove(activeClass)
    );
    btn.classList.add(activeClass);
  });
}

function calculateTN() {
  const skill = getNumber("skill");
  const range = getNumber("range");
  const tmm = getNumber("tmm");
  const amm = getNumber("amm");
  const cover = getNumber("cover");
  const other = getNumber("other");

  const tn = skill + range + tmm + amm + cover + other;

  const resultEl = document.getElementById("result");
  const breakdownEl = document.getElementById("breakdown");

  resultEl.textContent = "Target Number: " + tn;

  breakdownEl.textContent =
    `${skill} (skill) + ${range} (range) + ` +
    `${tmm} (TMM) + ${amm} (attacker move) + ${cover} (cover) + ${other} (other)`;
}

function setupTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = btn.dataset.tab;

      // Remove active class from all buttons and content
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      const targetTab = document.getElementById(tabName + "-tab");
      if (targetTab) {
        targetTab.classList.add("active");
      }
    });
  });
}

/**
 * Evaluate Aces behavior based on form inputs
 */
function evaluateAcesFromForm() {
  const deck = document.getElementById("aces-deck").value;
  const cardNumber = parseInt(document.getElementById("aces-card-number").value, 10);
  const moveFirstVal = document.getElementById("aces-move-first").value;
  // Card logic expects enemyMoved: moveFirst "yes" => false, moveFirst "no" => true.
  const enemyMoved = moveFirstVal !== "yes";
  const context = {
    range: document.getElementById("aces-range").value,
    cover: document.getElementById("aces-cover").value,
    situation: document.getElementById("aces-situation").value,
    moveFirst: moveFirstVal
  };

  const result = evaluateAcesBehavior({ deck, cardNumber, enemyMoved });

  if (result.error) {
    alert(result.error);
    return;
  }

  displayAcesBehavior(result, context);
}

/**
 * Display Aces card-based guidance results
 */
function displayAcesBehavior(result, context = null) {
  const resultSection = document.getElementById("aces-result");
  const { card, useIfFirst } = result;

  // Card header: "Brawler 3/8" and priority badge
  document.getElementById("aces-card-label").textContent =
    `${card.deck} ${card.cardNumber}/8`;
  document.getElementById("aces-priority-badge").textContent =
    `Priority ${card.priority}`;

  const contextLabels = {
    range: { short: "Short", medium: "Medium", long: "Long" },
    cover: { none: "None", partial: "Partial", heavy: "Heavy" },
    situation: {
      standard: "Standard",
      isolated: "Isolated Target",
      damaged: "Damaged Visible",
      clustered: "Clustered Formation"
    }
  };
  const contextSection = document.getElementById("aces-context-section");
  const contextSummary = document.getElementById("aces-context-summary");
  const contextHints = document.getElementById("aces-context-hints");
  if (context && contextSection && contextSummary && contextHints) {
    const summary = [
      `Range: ${contextLabels.range[context.range] || context.range}`,
      `Cover: ${contextLabels.cover[context.cover] || context.cover}`,
      `Situation: ${contextLabels.situation[context.situation] || context.situation}`,
      `First to Move: ${context.moveFirst === "yes" ? "Yes" : "No"}`
    ];
    contextSummary.textContent = "";
    summary.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "aces-context-chip";
      chip.textContent = item;
      contextSummary.appendChild(chip);
    });

    const hints = [];
    if (context.range === "short") {
      hints.push("Short range favors pressure cards and close engagement priorities.");
    } else if (context.range === "medium") {
      hints.push("Medium range keeps flexible firing lanes while preserving spacing.");
    } else if (context.range === "long") {
      hints.push("Long range favors safer positioning and ranged pressure.");
    }
    if (context.cover === "none") {
      hints.push("No cover: use movement priorities to claim safer terrain where possible.");
    } else if (context.cover === "heavy") {
      hints.push("Heavy cover: you can hold stronger firing lines if target priority allows.");
    }
    if (context.situation === "isolated") {
      hints.push("Isolated target present: prioritize finish opportunities when legal.");
    } else if (context.situation === "damaged") {
      hints.push("Damaged enemy visible: look for destroy-first priorities on this card.");
    } else if (context.situation === "clustered") {
      hints.push("Clustered formation: favor lines that pressure multiple threats.");
    }
    contextHints.textContent = "";
    hints.forEach((hint) => {
      const listItem = document.createElement("li");
      listItem.textContent = hint;
      contextHints.appendChild(listItem);
    });
    contextSection.style.display = "block";
  } else if (contextSection) {
    contextSection.style.display = "none";
  }

  // Movement section
  const movementContent = document.getElementById("aces-movement-content");
  if (useIfFirst) {
    movementContent.innerHTML =
      `<p class="aces-if-first-badge">⚡ First Move</p>` +
      `<p class="aces-value">${card.ifFirst}</p>`;
  } else {
    const listItems = card.movementLogic
      .map((step, i) =>
        `<li><span class="step-num">${i + 1}</span><span>${step}</span></li>`
      )
      .join("");
    movementContent.innerHTML =
      `<p class="hint">Evaluate in order; use the next row as a tiebreaker when tied.</p>` +
      `<ol class="aces-movement-list">${listItems}</ol>`;
  }

  // Combat priority chain
  const chainHtml = card.combatPriorities
    .map((icon, i) => {
      const arrow = i < card.combatPriorities.length - 1
        ? `<span class="chain-arrow">→</span>`
        : "";
      return `<span class="combat-icon">${icon}</span>${arrow}`;
    })
    .join("");
  document.getElementById("aces-combat-chain").innerHTML =
    `<div class="combat-chain">${chainHtml}</div>`;

  // Target icon descriptions
  const descHtml = card.combatPriorities
    .map((icon, i) => {
      const desc = TARGET_ICON_DESCRIPTIONS[icon] || icon;
      return `<p class="icon-desc"><strong>${i + 1}. ${icon}</strong> — ${desc}</p>`;
    })
    .join("");
  document.getElementById("aces-combat-descriptions").innerHTML = descHtml;

  // Special rules
  const specialSection = document.getElementById("aces-special-section");
  const specialList = document.getElementById("aces-special-list");
  const specials = [];
  if (card.usesOverheat) {
    specials.push(
      "<strong>Uses Overheat</strong>: AI will fire past the heat threshold if it can destroy the target."
    );
  }
  if (specials.length > 0) {
    specialList.innerHTML = specials.map(s => `<li>${s}</li>`).join("");
    specialSection.style.display = "block";
  } else {
    specialSection.style.display = "none";
  }

  resultSection.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  
  setHiddenFromButtons("range-buttons", "range", "active", "range");
  setHiddenFromButtons("cover-buttons", "cover", "active", "cover");
  setHiddenFromButtons("aces-deck-buttons", "aces-deck", "active", "deck");
  setHiddenFromButtons("aces-range-buttons", "aces-range", "active", "range");
  setHiddenFromButtons("aces-cover-buttons", "aces-cover", "active", "cover");
  setHiddenFromButtons("aces-situation-buttons", "aces-situation", "active", "situation");
  setHiddenFromButtons("aces-move-first-buttons", "aces-move-first", "active", "first");

  // Draw random card button — pick from the currently selected deck's cards
  const drawBtn = document.getElementById("aces-draw-btn");
  if (drawBtn) {
    drawBtn.addEventListener("click", () => {
      const selectedDeck = document.getElementById("aces-deck").value;
      const deckCards = ACES_CARDS.filter(c => c.deck === selectedDeck);
      const randomCard = deckCards[Math.floor(Math.random() * deckCards.length)].cardNumber;
      document.getElementById("aces-card-number").value = randomCard;
    });
  }

  const suggestDeckBtn = document.getElementById("aces-suggest-deck-btn");
  if (suggestDeckBtn) {
    suggestDeckBtn.addEventListener("click", () => {
      const weaponRangeInput = document.getElementById("aces-weapon-range");
      if (!weaponRangeInput) return;
      const weaponRange = weaponRangeInput.value;
      const deckMap = {
        short: "Brawler",
        balanced: "Skirmisher",
        long: "Sniper",
        mobile: "Striker"
      };
      const suggestedDeck = deckMap[weaponRange];
      if (!suggestedDeck) return;

      const deckInput = document.getElementById("aces-deck");
      deckInput.value = suggestedDeck;
      document.querySelectorAll("#aces-deck-buttons button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.deck === suggestedDeck);
      });
    });
  }

  ["skill", "tmm", "amm", "other"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("input", calculateTN);
      element.addEventListener("change", calculateTN);
    }
  });

  const calcBtn = document.getElementById("calc-btn");
  if (calcBtn) {
    calcBtn.addEventListener("click", calculateTN);
  }

  const acesBtn = document.getElementById("aces-btn");
  if (acesBtn) {
    acesBtn.addEventListener("click", evaluateAcesFromForm);
  }

  calculateTN();
});