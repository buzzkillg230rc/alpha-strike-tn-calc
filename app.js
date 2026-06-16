function getNumber(id) {
  return Number(document.getElementById(id).value) || 0;
}

function setHiddenFromButtons(groupId, inputId, activeClass, dataAttr) {
  const group = document.getElementById(groupId);
  const input = document.getElementById(inputId);
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const value = Number(btn.dataset[dataAttr] ?? 0);
    input.value = value;

    [...group.querySelectorAll("button")].forEach((b) =>
      b.classList.remove(activeClass)
    );
    btn.classList.add(activeClass);
    calculateTN();
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
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;

      // Remove active class from all buttons and content
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      document.getElementById(tabName + "-tab").classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  
  setHiddenFromButtons("range-buttons", "range", "active", "range");
  setHiddenFromButtons("cover-buttons", "cover", "active", "cover");

  ["skill", "tmm", "amm", "other"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calculateTN);
    document.getElementById(id).addEventListener("change", calculateTN);
  });

  document.getElementById("calc-btn").addEventListener("click", calculateTN);

  calculateTN();
});
