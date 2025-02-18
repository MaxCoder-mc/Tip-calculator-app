const _customTip = document.getElementById("customTip");
const _billAmount = document.getElementById("billAmount");
const _numPeople = document.getElementById("numPeople");
const _tipAmount = document.getElementById("tipAmount");
const _totalPerPerson = document.getElementById("totalPerPerson");
const _resetBtn = document.querySelector(".reset-button");
const _tipButtons = document.querySelectorAll(".tip-buttons button");

let tipPercent = 0;

function setTip(percent) {
  tipPercent = percent;
  calculateTip();
}

function setCustomTip() {
  tipPercent =
    parseFloat(_customTip.value) / 100 > 0
      ? parseFloat(_customTip.value) / 100
      : 0;
  calculateTip();
}

function calculateTip() {
  let bill = parseFloat(_billAmount.value) || 0;
  let people = parseInt(_numPeople.value) || 0;

  if (people <= 0 || isNaN(people)) {
    document.querySelector(".people .errorMsg").textContent = "Can't be zero";
    _numPeople.classList.add("error-input");
    return;
  } else {
    document.querySelector(".people .errorMsg").textContent = "";
    _numPeople.classList.remove("error-input");
  }

  if (isNaN(bill) || bill <= 0) return;

  let tipAmount = (bill * tipPercent) / people;
  let totalPerPerson = (bill + bill * tipPercent) / people;

  _tipAmount.textContent = `$${tipAmount.toFixed(2)}`;
  _totalPerPerson.textContent = `$${totalPerPerson.toFixed(2)}`;

  toggleResetButton();
}
function clearButtonSelection() {
  document
    .querySelector(".tip-buttons .selected")
    ?.classList.remove("selected");
}

function resetCalculator() {
  _billAmount.value = "";
  _numPeople.value = "";
  _customTip.value = "";
  _tipAmount.textContent = "$0.00";
  _totalPerPerson.textContent = "$0.00";
  _numPeople.classList.remove("error-input");
  document.querySelector(".people .errorMsg").textContent = "";
  tipPercent = 0;
  clearButtonSelection();
  toggleResetButton();
}

function toggleResetButton() {
  if (
    _tipAmount.textContent === "$0.00" &&
    _totalPerPerson.textContent === "$0.00"
  ) {
    _resetBtn.classList.add("disabled");
  } else _resetBtn.classList.remove("disabled");
}

// Event listeners
////////////////////////

/*
_customTip.addEventListener("focus", () => {
  clearButtonSelection();
  setCustomTip();
});
_customTip.addEventListener("input", () => {
  clearButtonSelection();
  setCustomTip();
});
*/

// Event Delegation - Shortcut for above code (Lines 78 - 85)
["focus", "input"].forEach((event) =>
  _customTip.addEventListener(event, () => {
    clearButtonSelection();
    setCustomTip();
  })
);
// --------------------------------------------

_numPeople.addEventListener("input", calculateTip);

_billAmount.addEventListener("input", calculateTip);

_tipButtons.forEach((button) =>
  button.addEventListener("click", ({ target }) => {
    clearButtonSelection();
    target.classList.add("selected");
    setTip(parseFloat(target.textContent) / 100);
  })
);
