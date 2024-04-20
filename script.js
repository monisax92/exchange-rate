const currencyFromEl = document.getElementById('currency-from');
const amountFromEl = document.getElementById('amount-from');
const currencyToEl = document.getElementById('currency-to');
const amountToEl = document.getElementById('amount-to');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function caclulate() {
  const currencyFrom = currencyFromEl.value;
  const currencyTo = currencyToEl.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currencyTo];

      rateEl.innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}`;

      amountToEl.value = (amountFromEl.value * rate).toFixed(2);
    });
}

// Event listeners
currencyFromEl.addEventListener('change', caclulate);
amountFromEl.addEventListener('input', caclulate);
currencyToEl.addEventListener('change', caclulate);
amountToEl.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyFromEl.value;
  currencyFromEl.value = currencyToEl.value;
  currencyToEl.value = temp;
  caclulate();
});

caclulate();
