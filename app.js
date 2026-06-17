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
  const role = document.getElementById("aces-role").value;
  const faction = document.getElementById("aces-faction").value;
  const objective = document.getElementById("aces-objective").value;
  const unitHealth = document.getElementById("aces-health").value;
  const enemyDistance = document.getElementById("aces-distance").value;
  const riskTolerance = document.getElementById("aces-risk").value;

  // Call the behavior evaluation logic from aces-profiles.js
  const result = evaluateAcesBehavior({
    role,
    faction,
    objective,
    unitHealth,
    enemyDistance,
    riskTolerance
  });

  if (result.error) {
    alert(result.error);
    return;
  }

  // Display results
  displayAcesBehavior(result);
}

/**
 * Display Aces behavior results
 */
function displayAcesBehavior(result) {
  const resultSection = document.getElementById("aces-result");
  const roleProfile = ACES_PROFILES.roles[result.role];
  const factionData = ACES_PROFILES.factions[result.faction];
  const objectiveData = ACES_PROFILES.objectives[result.objective];

  // Profile name and description
  document.getElementById("aces-profile-name").textContent = 
    `${result.role}: ${roleProfile.profile}`;
  document.getElementById("aces-profile-desc").textContent = 
    `Preferred Range: ${roleProfile.preferredRange} | Unit Health: ${result.unitHealth}`;

  // Movement behavior
  document.getElementById("aces-movement").textContent = 
    roleProfile.movement[result.unitHealth]
      .replace(/_/g, " ")
      .toUpperCase();

  // Attack behavior
  document.getElementById("aces-attack").textContent = 
    roleProfile.attack.risk[result.riskTolerance]
      .replace(/_/g, " ")
      .toUpperCase();

  // Target priority
  const targetPriority = objectiveData.targetPriority.join(" → ");
  document.getElementById("aces-target").textContent = targetPriority;

  // TN Modifier breakdown
  const rationale = result.rationale.join(" | ");
  document.getElementById("aces-rationale").textContent = rationale;

  const modifierDisplay = document.getElementById("aces-modifier-display");
  const modifierClass = result.tnModifier > 0 ? "penalty" : result.tnModifier < 0 ? "bonus" : "neutral";
  modifierDisplay.className = `aces-modifier-value ${modifierClass}`;
  modifierDisplay.textContent = 
    `TN Modifier: ${result.tnModifier > 0 ? "+" : ""}${result.tnModifier}`;

  // Faction quirks
  const quirksSection = document.getElementById("aces-quirks-section");
  const quirksList = document.getElementById("aces-quirks-list");
  if (result.factionQuirks && result.factionQuirks.length > 0) {
    quirksList.innerHTML = result.factionQuirks
      .map(q => `<li>${q.replace(/([A-Z])/g, " $1").trim()}</li>`)
      .join("");
    quirksSection.style.display = "block";
  } else {
    quirksSection.style.display = "none";
  }

  // Show result section
  resultSection.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  
  setHiddenFromButtons("range-buttons", "range", "active", "range");
  setHiddenFromButtons("cover-buttons", "cover", "active", "cover");
  setHiddenFromButtons("aces-health-buttons", "aces-health", "active", "health");
  setHiddenFromButtons("aces-risk-buttons", "aces-risk", "active", "risk");

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