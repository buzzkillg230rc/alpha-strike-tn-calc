function calc() {
  const skill = Number(document.getElementById("skill").value);
  const range = Number(document.getElementById("range").value);
  const tmm = Number(document.getElementById("tmm").value);
  const amm = Number(document.getElementById("amm").value);
  const other = Number(document.getElementById("other").value);

  const tn = 2 + skill + range + tmm + amm + other;
  document.getElementById("result").innerText = "Target Number: " + tn;
}
