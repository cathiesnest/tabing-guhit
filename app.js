const hourlyRateInput = document.getElementById("hourlyRate");
const fromCurrencyInput = document.getElementById("fromCurrency");
const toCurrencyInput = document.getElementById("toCurrency");
const hoursPerDayInput = document.getElementById("hoursPerDay");
const daysPerWeekInput = document.getElementById("daysPerWeek");
const weeksPerMonthInput = document.getElementById("weeksPerMonth");
const monthsPerYearInput = document.getElementById("monthsPerYear");

const calculateButton = document.getElementById("calculateRate");
const resultsArea = document.getElementById("calculatorResults");
const startAssessmentButton = document.getElementById("startAssessment");

/*
  Temporary exchange-rate table for the first version.

  We will connect this to a live exchange-rate API
  after the basic app is working correctly.
*/

const exchangeRatesToUSD = {
  USD: 1,
  PHP: 60.83,
  CAD: 1.37,
  AUD: 1.53,
  GBP: 0.74,
  EUR: 0.86,
  SGD: 1.28,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  JPY: 147
};

function convertCurrency(amount, fromCurrency, toCurrency) {
  const fromRate = exchangeRatesToUSD[fromCurrency];
  const toRate = exchangeRatesToUSD[toCurrency];

  if (!fromRate || !toRate) {
    return amount;
  }

  const amountInUSD = amount / fromRate;

  return amountInUSD * toRate;
}

function formatMoney(amount, currency) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function calculateRate() {
  const hourlyRate = Number(hourlyRateInput.value);
  const fromCurrency = fromCurrencyInput.value;
  const toCurrency = toCurrencyInput.value;

  const hoursPerDay = Number(hoursPerDayInput.value);
  const daysPerWeek = Number(daysPerWeekInput.value);
  const weeksPerMonth = Number(weeksPerMonthInput.value);
  const monthsPerYear = Number(monthsPerYearInput.value);

  if (
    hourlyRate < 0 ||
    hoursPerDay <= 0 ||
    daysPerWeek <= 0 ||
    weeksPerMonth <= 0 ||
    monthsPerYear <= 0
  ) {
    resultsArea.innerHTML = `
      <p class="results-placeholder">
        Please enter valid numbers before calculating.
      </p>
    `;

    return;
  }

  const hourly = hourlyRate;

  const daily =
    hourlyRate *
    hoursPerDay;

  const weekly =
    daily *
    daysPerWeek;

  const monthly =
    weekly *
    weeksPerMonth;

  const yearly =
    monthly *
    monthsPerYear;

  const values = [
    ["Hourly", hourly],
    ["Daily", daily],
    ["Weekly", weekly],
    ["Monthly", monthly],
    ["Yearly", yearly]
  ];

  const rows = values
    .map(([period, amount]) => {

      const convertedAmount =
        convertCurrency(
          amount,
          fromCurrency,
          toCurrency
        );

      return `
        <tr>
          <td>${period}</td>
          <td>${formatMoney(amount, fromCurrency)}</td>
          <td>${formatMoney(convertedAmount, toCurrency)}</td>
        </tr>
      `;
    })
    .join("");

  resultsArea.innerHTML = `
    <table class="results-table">

      <thead>
        <tr>
          <th>Period</th>
          <th>${fromCurrency}</th>
          <th>${toCurrency}</th>
        </tr>
      </thead>

      <tbody>
        ${rows}
      </tbody>

    </table>

    <p class="calculator-disclaimer">
      This is a planning estimate only.
      Actual earnings may vary because of taxes,
      unpaid leave, platform fees, payment fees,
      exchange-rate changes, and contract terms.
    </p>
  `;
}

calculateButton.addEventListener(
  "click",
  calculateRate
);

startAssessmentButton.addEventListener(
  "click",
  () => {

    document
      .getElementById("rateCalculator")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);

/*
  Calculate the default example when the page loads.
*/

calculateRate();
