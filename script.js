const bill = document.getElementById("bill");
const people = document.getElementById("people");
const customTip = document.getElementById("customTip");

const tipAmountEl = document.getElementById("tipAmount");
const totalAmountEl = document.getElementById("totalAmount");

const errorEl = document.getElementById("error");
const resetBtn = document.getElementById("reset");
const tipButtons = document.querySelectorAll(".tip");

let tipPercent = 0;

// Select tip buttons
tipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tipButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tipPercent = parseFloat(btn.dataset.value);
    customTip.value = "";
    calculate();
  });
});

// Custom tip
customTip.addEventListener("input", () => {
  tipButtons.forEach(b => b.classList.remove("active"));
  tipPercent = parseFloat(customTip.value) || 0;
  calculate();
});

// Inputs
[bill, people].forEach(input => {
  input.addEventListener("input", calculate);
});

function calculate() {
  const billValue = parseFloat(bill.value);
  const peopleValue = parseInt(people.value);

  if (peopleValue === 0) {
    errorEl.textContent = "Can't be zero";
    return;
  } else {
    errorEl.textContent = "error";
  }

  if (!billValue || !peopleValue) return;

  const tip = (billValue * tipPercent/ 100 ) / peopleValue;
  const total = (billValue + billValue * tipPercent / 100) / peopleValue;

  tipAmountEl.textContent = tip.toFixed(2);
  totalAmountEl.textContent = total.toFixed(2);
}

// Reset
resetBtn.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  customTip.value = "";
  tipPercent = 0;

  tipAmountEl.textContent = "0.00";
  totalAmountEl.textContent = "0.00";
  errorEl.textContent = "";

  tipButtons.forEach(b => b.classList.remove("active"));
});