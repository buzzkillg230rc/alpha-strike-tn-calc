function getNumber(id) {
  return Number(document.getElementById(id).value) || 0;
}

function setHiddenFromButtons(groupId, inputId, activeClass, dataAttr) {
  const group = document.getElementById(groupId);
  const input = document.getElementById(inputId);
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
  const enemyMovedVal = document.getElementById("aces-enemy-moved").value;
  const enemyMoved = enemyMovedVal === "yes";

  const result = evaluateAcesBehavior({ deck, cardNumber, enemyMoved });

  if (result.error) {
    alert(result.error);
    return;
  }

  displayAcesBehavior(result);
}

/**
 * Display Aces card-based guidance results
 */
function displayAcesBehavior(result) {
  const resultSection = document.getElementById("aces-result");
  const { card, useIfFirst } = result;

  // Card header: "Brawler 3/8" and priority badge
  document.getElementById("aces-card-label").textContent =
    `${card.deck} ${card.cardNumber}/8`;
  document.getElementById("aces-priority-badge").textContent =
    `Priority ${card.priority}`;

  // Movement section
  const movementContent = document.getElementById("aces-movement-content");
  if (useIfFirst) {
    movementContent.innerHTML =
      `<p class="aces-if-first-badge">⚡ If First — no enemies have moved yet</p>` +
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
  setHiddenFromButtons("aces-enemy-moved-buttons", "aces-enemy-moved", "active", "moved");

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