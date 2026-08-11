const hourlyRateInput = document.getElementById("hourlyRate");
const fromCurrencyInput = document.getElementById("fromCurrency");
const toCurrencyInput = document.getElementById("toCurrency");
const hoursPerDayInput = document.getElementById("hoursPerDay");
const daysPerWeekInput = document.getElementById("daysPerWeek");
const weeksPerMonthInput = document.getElementById("weeksPerMonth");
const monthsPerYearInput = document.getElementById("monthsPerYear");

const calculateButton = document.getElementById("calculateRate");
const resultsArea = document.getElementById("calculatorResults");

const startAssessmentButton =
  document.getElementById("startAssessment");

const generateNicheButton =
  document.getElementById("generateNiche");

const nicheResults =
  document.getElementById("nicheResults");

const nicheAssessment =
  document.getElementById("nicheAssessment");


/*
  Temporary exchange-rate table.
  These are planning estimates only.
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

  const fromRate =
    exchangeRatesToUSD[fromCurrency];

  const toRate =
    exchangeRatesToUSD[toCurrency];

  if (!fromRate || !toRate) {
    return amount;
  }

  const amountInUSD =
    amount / fromRate;

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


/*
  RATE CALCULATOR
*/

function calculateRate() {

  const hourlyRate =
    Number(hourlyRateInput.value);

  const fromCurrency =
    fromCurrencyInput.value;

  const toCurrency =
    toCurrencyInput.value;

  const hoursPerDay =
    Number(hoursPerDayInput.value);

  const daysPerWeek =
    Number(daysPerWeekInput.value);

  const weeksPerMonth =
    Number(weeksPerMonthInput.value);

  const monthsPerYear =
    Number(monthsPerYearInput.value);


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
    hourlyRate * hoursPerDay;

  const weekly =
    daily * daysPerWeek;

  const monthly =
    weekly * weeksPerMonth;

  const yearly =
    monthly * monthsPerYear;


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


/*
  START FOR FREE
  Now goes to IDENTIFY YOUR NICHE
  instead of the currency calculator.
*/

if (startAssessmentButton && nicheAssessment) {

  startAssessmentButton.addEventListener(
    "click",
    () => {

      nicheAssessment.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

}


/*
  IDENTIFY YOUR NICHE
*/

if (generateNicheButton) {

  generateNicheButton.addEventListener(
    "click",
    generateNiche
  );

}


function getSelectedValue(name) {

  const selected =
    document.querySelector(
      `input[name="${name}"]:checked`
    );

  return selected ? selected.value : null;
}


function generateNiche() {

  const skill =
    getSelectedValue("skill");

  const interest =
    getSelectedValue("interest");

  const time =
    getSelectedValue("time");

  const goal =
    getSelectedValue("goal");

  const startingPoint =
    getSelectedValue("startingPoint");


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
          Please answer all five questions
          so we can suggest possible sideline paths
          that fit you better.
        </p>

      </div>
    `;

    nicheResults.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    return;
  }


  let niches = [];


  /*
    Match skills to possible sideline paths.
  */

  if (skill === "admin") {

    niches.push(
      "Virtual Assistant",
      "Administrative Support",
      "Data Entry Specialist",
      "Executive Assistant"
    );

  }


  if (skill === "customer") {

    niches.push(
      "Customer Support",
      "Chat Support",
      "Client Success Assistant",
      "Appointment Setter"
    );

  }


  if (skill === "writing") {

    niches.push(
      "Content Writer",
      "Copywriter",
      "Social Media Assistant",
      "Virtual Assistant"
    );

  }


  if (skill === "sales") {

    niches.push(
      "Appointment Setter",
      "Sales Assistant",
      "Lead Generation Specialist",
      "Social Selling Assistant"
    );

  }


  if (skill === "creative") {

    niches.push(
      "Canva Designer",
      "Social Media Assistant",
      "Graphic Design Assistant",
      "Content Creator"
    );

  }


  if (skill === "teaching") {

    niches.push(
      "Online Tutor",
      "Course Assistant",
      "Learning Support Assistant",
      "Online Coach"
    );

  }


  if (skill === "tech") {

    niches.push(
      "AI Assistant",
      "No-Code Assistant",
      "Automation Assistant",
      "Technical Virtual Assistant"
    );

  }


  /*
    Remove duplicates.
  */

  niches =
    [...new Set(niches)];


  /*
    Show the results.
  */

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

        ${niches
          .slice(0, 4)
          .map(
            niche => `
              <div class="niche-option">
                <strong>${niche}</strong>
                <span>
                  A possible direction based
                  on your answers.
                </span>
              </div>
            `
          )
          .join("")}

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
          Your answers are only a starting point.
          Your actual experience, portfolio,
          location, availability, and market demand
          will also matter.
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


  /*
    Allow the user to continue
    from niche discovery to rate calculator.
  */

  const goToRateCalculator =
    document.getElementById(
      "goToRateCalculator"
    );


  if (goToRateCalculator) {

    goToRateCalculator.addEventListener(
      "click",
      () => {

        document
          .getElementById("rateCalculator")
          .scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      }
    );

  }


  nicheResults.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/*
  CALCULATE DEFAULT EXAMPLE
*/

calculateRate();
