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
const generateNicheButton = document.getElementById("generateNiche");
const nicheResults = document.getElementById("nicheResults");
const nicheAssessment = document.getElementById("nicheAssessment");


/* =========================
   CURRENCY CALCULATOR
========================= */

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

  return (amount / fromRate) * toRate;
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
  const daily = hourlyRate * hoursPerDay;
  const weekly = daily * daysPerWeek;
  const monthly = weekly * weeksPerMonth;
  const yearly = monthly * monthsPerYear;

  const values = [
    ["Hourly", hourly],
    ["Daily", daily],
    ["Weekly", weekly],
    ["Monthly", monthly],
    ["Yearly", yearly]
  ];

  const rows = values.map(([period, amount]) => {
    const convertedAmount = convertCurrency(
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
  }).join("");

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


/* =========================
   START FOR FREE
========================= */

if (startAssessmentButton) {
  startAssessmentButton.addEventListener("click", function () {
    if (nicheAssessment) {
      nicheAssessment.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}


/* =========================
   NICHE ASSESSMENT
========================= */

function getAnswer(questionName) {
  const selected = document.querySelector(
    'input[name="' + questionName + '"]:checked'
  );

  return selected ? selected.value : "";
}


function generateNiche() {

  const skill = getAnswer("skill");
  const interest = getAnswer("interest");
  const time = getAnswer("time");
  const goal = getAnswer("goal");
  const startingPoint = getAnswer("startingPoint");

  if (
    !skill ||
    !interest ||
    !time ||
    !goal ||
    !startingPoint
  ) {
    nicheResults.hidden = false;

    nicheResults.innerHTML = `
      <div class="results-placeholder">
        <h3>Almost there!</h3>
        <p>
          Please answer all five questions before
          showing your possible niches.
        </p>
      </div>
    `;

    nicheResults.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return;
  }


  let niches = [];


  if (skill === "admin") {
    niches = [
      "Virtual Assistant",
      "Administrative Support",
      "Data Entry Specialist",
      "Executive Assistant"
    ];
  }

  else if (skill === "customer") {
    niches = [
      "Customer Support",
      "Chat Support",
      "Client Success Assistant",
      "Appointment Setter"
    ];
  }

  else if (skill === "writing") {
    niches = [
      "Content Writer",
      "Copywriter",
      "Social Media Assistant",
      "Virtual Assistant"
    ];
  }

  else if (skill === "sales") {
    niches = [
      "Appointment Setter",
      "Sales Assistant",
      "Lead Generation Specialist",
      "Social Selling Assistant"
    ];
  }

  else if (skill === "creative") {
    niches = [
      "Canva Designer",
      "Social Media Assistant",
      "Graphic Design Assistant",
      "Content Creator"
    ];
  }

  else if (skill === "teaching") {
    niches = [
      "Online Tutor",
      "Course Assistant",
      "Learning Support Assistant",
      "Online Coach"
    ];
  }

  else if (skill === "tech") {
    niches = [
      "AI Assistant",
      "No-Code Assistant",
      "Automation Assistant",
      "Technical Virtual Assistant"
    ];
  }


  nicheResults.hidden = false;

  nicheResults.innerHTML = `
    <div class="niche-result-card">

      <p class="eyebrow">
        YOUR POSSIBLE SIDELINE PATHS
      </p>

      <h2>
        You may want to explore:
      </h2>

      <div class="niche-list">
        ${niches.map(function(niche) {
          return `
            <div class="niche-option">
              <strong>${niche}</strong>
              <span>
                A possible direction based on your answers.
              </span>
            </div>
          `;
        }).join("")}
      </div>

      <div class="niche-next-step">

        <h3>
          What's next?
        </h3>

        <p>
          You don't need to master everything first.
          Pick one direction, build the skills,
          and start exploring real opportunities.
        </p>

        <p>
          Your results are only a starting point.
          Your experience, portfolio, availability,
          location, and market demand will also matter.
        </p>

      </div>

      <button
        class="secondary-button"
        type="button"
        id="goToRateCalculator"
      >
        💰 Explore Your Possible Rate
      </button>

    </div>
  `;


  const goToRateCalculator =
    document.getElementById("goToRateCalculator");

  if (goToRateCalculator) {
    goToRateCalculator.addEventListener("click", function() {

      const calculator =
        document.getElementById("rateCalculator");

      if (calculator) {
        calculator.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });
  }


  nicheResults.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================
   CONNECT NICHE BUTTON
========================= */

if (generateNicheButton) {

  generateNicheButton.addEventListener(
    "click",
    generateNiche
  );

}


/* =========================
   CALCULATOR BUTTON
========================= */

if (calculateButton) {

  calculateButton.addEventListener(
    "click",
    calculateRate
  );

}


/* =========================
   INITIAL CALCULATION
========================= */

if (
  hourlyRateInput &&
  fromCurrencyInput &&
  toCurrencyInput &&
  hoursPerDayInput &&
  daysPerWeekInput &&
  weeksPerMonthInput &&
  monthsPerYearInput &&
  resultsArea
) {
  calculateRate();
}
