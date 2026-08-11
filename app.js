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


// ===============================
// START / FIND MY NICHE
// ===============================

if (startAssessmentButton) {
  startAssessmentButton.addEventListener("click", function () {

    const assessment =
      document.getElementById("nicheAssessment");

    if (assessment) {
      assessment.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });
}


// ===============================
// NICHE GENERATOR
// ===============================

function generateNiche() {

  const skill =
    document.querySelector('input[name="skill"]:checked');

  const interest =
    document.querySelector('input[name="interest"]:checked');

  const time =
    document.querySelector('input[name="time"]:checked');

  const goal =
    document.querySelector('input[name="goal"]:checked');

  const startingPoint =
    document.querySelector(
      'input[name="startingPoint"]:checked'
    );


  if (
    !skill ||
    !interest ||
    !time ||
    !goal ||
    !startingPoint
  ) {

    nicheResults.hidden = false;

    nicheResults.innerHTML = `
      <div class="niche-result-card">
        <h3>Almost there!</h3>

        <p>
          Please answer all five questions
          before we identify possible niches for you.
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


  // ADMIN
  if (skill.value === "admin") {
    niches.push(
      "Virtual Assistant",
      "Administrative Assistant",
      "Executive Virtual Assistant",
      "Data Entry Specialist"
    );
  }


  // CUSTOMER SERVICE
  if (skill.value === "customer") {
    niches.push(
      "Customer Support Specialist",
      "Chat Support",
      "Customer Success Assistant",
      "Virtual Receptionist"
    );
  }


  // WRITING
  if (skill.value === "writing") {
    niches.push(
      "Content Writer",
      "Copywriting Assistant",
      "Social Media Assistant",
      "Email Support Specialist"
    );
  }


  // SALES
  if (skill.value === "sales") {
    niches.push(
      "Appointment Setter",
      "Lead Generation Assistant",
      "Sales Support",
      "Social Media Sales Assistant"
    );
  }


  // CREATIVE
  if (skill.value === "creative") {
    niches.push(
      "Canva Designer",
      "Social Media Content Creator",
      "Short-Form Video Assistant",
      "Graphic Design Assistant"
    );
  }


  // TEACHING
  if (skill.value === "teaching") {
    niches.push(
      "Online Tutor",
      "Learning Assistant",
      "Course Assistant",
      "Virtual Training Assistant"
    );
  }


  // TECHNOLOGY
  if (skill.value === "tech") {
    niches.push(
      "AI Assistant",
      "No-Code Automation Assistant",
      "Tech Virtual Assistant",
      "AI Content Assistant"
    );
  }


  // ADD INTEREST-BASED OPTIONS

  if (interest.value === "creative") {
    niches.push("Canva Content Creator");
  }

  if (interest.value === "technology") {
    niches.push("AI Tools Assistant");
  }

  if (interest.value === "business") {
    niches.push("E-commerce Assistant");
  }

  if (interest.value === "teaching") {
    niches.push("Online Teaching Assistant");
  }

  if (interest.value === "people") {
    niches.push("Customer Success Assistant");
  }

  if (interest.value === "behind") {
    niches.push("Back-Office Virtual Assistant");
  }


  // REMOVE DUPLICATES
  niches = [...new Set(niches)];


  // LIMIT RESULTS
  niches = niches.slice(0, 6);


  let timeMessage = "";

  if (time.value === "small") {
    timeMessage =
      "Since you have limited time, consider starting with flexible tasks that can be done a few hours per week.";
  }

  if (time.value === "medium") {
    timeMessage =
      "Your available time gives you room to build a consistent part-time sideline.";
  }

  if (time.value === "large") {
    timeMessage =
      "You have enough time to seriously develop a freelance or remote-work path.";
  }

  if (time.value === "full") {
    timeMessage =
      "With 20+ hours available, you can explore a more substantial freelance or remote career path.";
  }


  let goalMessage = "";

  if (goal.value === "income") {
    goalMessage =
      "Focus first on skills you can already offer and monetize quickly.";
  }

  if (goal.value === "remote") {
    goalMessage =
      "Remote support, administration, customer service, and online assistant roles may be worth exploring.";
  }

  if (goal.value === "freelance") {
    goalMessage =
      "Build a simple service around one skill and gradually develop your portfolio.";
  }

  if (goal.value === "business") {
    goalMessage =
      "Consider combining your skill with a small digital service or online business.";
  }

  if (goal.value === "learn") {
    goalMessage =
      "Choose one skill to strengthen instead of trying to learn everything at once.";
  }


  nicheResults.hidden = false;

  nicheResults.innerHTML = `

    <div class="niche-result-card">

      <p class="eyebrow">
        YOUR POSSIBLE SIDELINE PATHS
      </p>

      <h2>
        Here are some directions worth exploring.
      </h2>

      <p>
        Based on your answers, these are possible
        niches that may fit your current starting point.
      </p>

      <div class="niche-list">

        ${niches.map((niche, index) => `
          <div class="niche-option">

            <span class="niche-number">
              ${index + 1}
            </span>

            <div>
              <strong>${niche}</strong>
              <p>
                A possible sideline direction
                to research and try.
              </p>
            </div>

          </div>
        `).join("")}

      </div>

      <div class="niche-guidance">

        <h3>
          Your next step
        </h3>

        <p>
          ${timeMessage}
        </p>

        <p>
          ${goalMessage}
        </p>

        <p>
          You don't have to be an expert before
          you begin. Start small, learn, practice,
          and test whether the niche fits you.
        </p>

      </div>

      <p class="niche-disclaimer">
        These are possible directions, not job
        recommendations or guarantees of employment.
      </p>

    </div>
  `;


  nicheResults.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// CONNECT BUTTON TO FUNCTION

if (generateNicheButton) {

  generateNicheButton.addEventListener(
    "click",
    generateNiche
  );

}


// ===============================
// CURRENCY CALCULATOR
// ===============================

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


function convertCurrency(
  amount,
  fromCurrency,
  toCurrency
) {

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

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2
      }
    ).format(amount);

  } catch {

    return `${currency} ${amount.toFixed(2)}`;

  }

}


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


  const daily =
    hourlyRate * hoursPerDay;

  const weekly =
    daily * daysPerWeek;

  const monthly =
    weekly * weeksPerMonth;

  const yearly =
    monthly * monthsPerYear;


  const values = [

    ["Hourly", hourlyRate],
    ["Daily", daily],
    ["Weekly", weekly],
    ["Monthly", monthly],
    ["Yearly", yearly]

  ];


  const rows = values.map(
    ([period, amount]) => {

      const convertedAmount =
        convertCurrency(
          amount,
          fromCurrency,
          toCurrency
        );


      return `

        <tr>

          <td>${period}</td>

          <td>
            ${formatMoney(
              amount,
              fromCurrency
            )}
          </td>

          <td>
            ${formatMoney(
              convertedAmount,
              toCurrency
            )}
          </td>

        </tr>

      `;

    }
  ).join("");


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


if (calculateButton) {

  calculateButton.addEventListener(
    "click",
    calculateRate
  );

}


// Calculate example on page load

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
