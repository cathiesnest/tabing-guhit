// ==========================================
// TABING GUHIT — APP.JS
// Niche Finder + Rate Calculator
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const hourlyRateInput = document.getElementById("hourlyRate");
const fromCurrencyInput = document.getElementById("fromCurrency");
const toCurrencyInput = document.getElementById("toCurrency");

const hoursPerDayInput = document.getElementById("hoursPerDay");
const daysPerWeekInput = document.getElementById("daysPerWeek");
const monthsPerYearInput = document.getElementById("monthsPerYear");

const calculateButton = document.getElementById("calculateRate");
const clearCalculatorButton = document.getElementById("clearCalculator");

const resultsArea = document.getElementById("calculatorResults");

const startAssessmentButton =
  document.getElementById("startAssessment");

const generateNicheButton =
  document.getElementById("generateNiche");

const clearAssessmentButton =
  document.getElementById("clearAssessment");

const nicheResults =
  document.getElementById("nicheResults");


// ==========================================
// EXCHANGE RATES
// Temporary planning rates
// ==========================================

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


// ==========================================
// CURRENCY CONVERSION
// ==========================================

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


// ==========================================
// MONEY FORMAT
// ==========================================

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


// ==========================================
// RATE CALCULATOR
// ==========================================

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

  const monthsPerYear =
    Number(monthsPerYearInput.value);


  // Automatic average weeks per month
  const weeksPerMonth = 4.33;


  // Validation

  if (

    !Number.isFinite(hourlyRate) ||

    hourlyRate <= 0 ||

    hoursPerDay <= 0 ||

    daysPerWeek <= 0 ||

    monthsPerYear <= 0

  ) {

    resultsArea.innerHTML = `

      <p class="results-placeholder">

        Please enter a valid hourly rate.

      </p>

    `;

    return;

  }


  // Calculations

  const hourly =
    hourlyRate;

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

    .map(
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
    )

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

      Based on 4.33 weeks per month.

      This is a planning estimate only.

      Actual earnings may vary because of taxes,

      unpaid leave, platform fees,

      payment fees, exchange-rate changes,

      and contract terms.

    </p>

  `;

}


// ==========================================
// CALCULATOR BUTTON
// ==========================================

if (calculateButton) {

  calculateButton.addEventListener(
    "click",
    calculateRate
  );

}


// ==========================================
// CLEAR CALCULATOR
// ==========================================

if (clearCalculatorButton) {

  clearCalculatorButton.addEventListener(
    "click",
    function () {

      hourlyRateInput.value = "";

      fromCurrencyInput.value = "USD";

      toCurrencyInput.value = "PHP";

      hoursPerDayInput.value = "8";

      daysPerWeekInput.value = "5";

      monthsPerYearInput.value = "12";


      resultsArea.innerHTML = `

        <p class="results-placeholder">

          Enter your hourly rate to see
          your estimated earnings.

        </p>

      `;

    }
  );

}


// ==========================================
// START / FIND MY NICHE BUTTON
// ==========================================

if (startAssessmentButton) {

  startAssessmentButton.addEventListener(
    "click",
    function () {

      const assessment =
        document.getElementById(
          "nicheAssessment"
        );

      if (assessment) {

        assessment.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }

    }
  );

}


// ==========================================
// NICHE GENERATOR
// ==========================================

function generateNiche() {


  const skill =
    document.querySelector(
      'input[name="skill"]:checked'
    );

  const interest =
    document.querySelector(
      'input[name="interest"]:checked'
    );

  const time =
    document.querySelector(
      'input[name="time"]:checked'
    );

  const goal =
    document.querySelector(
      'input[name="goal"]:checked'
    );

  const startingPoint =
    document.querySelector(
      'input[name="startingPoint"]:checked'
    );


  // Make sure every question is answered

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

        <h3>
          Almost there!
        </h3>

        <p>
          Please answer all five questions
          so we can suggest possible niches
          that may fit you.
        </p>

      </div>

    `;

    nicheResults.scrollIntoView({

      behavior: "smooth",

      block: "center"

    });

    return;

  }


  // ========================================
  // POSSIBLE NICHE SUGGESTIONS
  // ========================================

  let niches = [];

  let explanation = "";


  // ADMIN

  if (skill.value === "admin") {

    niches.push(
      "Virtual Assistant",
      "Administrative Assistant",
      "Calendar & Inbox Support"
    );

    explanation =
      "Your organizing skills can translate well into remote administrative and virtual support work.";

  }


  // CUSTOMER SERVICE

  else if (skill.value === "customer") {

    niches.push(
      "Customer Support Specialist",
      "Chat Support",
      "Client Success Assistant"
    );

    explanation =
      "Your customer service experience can be useful for remote support and client-facing roles.";

  }


  // WRITING

  else if (skill.value === "writing") {

    niches.push(
      "Content Writer",
      "Copywriting Assistant",
      "Social Media Assistant"
    );

    explanation =
      "Your communication skills may fit writing, content, and social media support.";

  }


  // SALES

  else if (skill.value === "sales") {

    niches.push(
      "Appointment Setter",
      "Lead Generation Assistant",
      "Sales Support Specialist"
    );

    explanation =
      "Your sales skills can translate into lead generation, appointment setting, and sales support.";

  }


  // CREATIVE

  else if (skill.value === "creative") {

    niches.push(
      "Canva Designer",
      "Social Media Content Creator",
      "Digital Product Creator"
    );

    explanation =
      "Your creative skills may fit visual content, social media, and digital products.";

  }


  // TEACHING

  else if (skill.value === "teaching") {

    niches.push(
      "Online Tutor",
      "Online Coach",
      "Learning Support Assistant"
    );

    explanation =
      "Your teaching and coaching strengths may fit tutoring, training, and learning support.";

  }


  // TECHNOLOGY

  else if (skill.value === "tech") {

    niches.push(
      "AI Assistant",
      "No-Code Automation Assistant",
      "Technical Virtual Assistant"
    );

    explanation =
      "Your technology interests may fit AI-assisted services, automation, and technical support.";

  }


  // ========================================
  // INTEREST-BASED REFINEMENT
  // ========================================

  if (interest.value === "creative") {

    niches.push(
      "Canva Content Specialist"
    );

  }

  if (interest.value === "technology") {

    niches.push(
      "AI-Powered Virtual Assistant"
    );

  }

  if (interest.value === "business") {

    niches.push(
      "E-commerce Assistant"
    );

  }

  if (interest.value === "teaching") {

    niches.push(
      "Online Learning Assistant"
    );

  }


  // Remove duplicates

  niches =
    [...new Set(niches)];


  // Limit to five suggestions

  niches =
    niches.slice(0, 5);


  // ========================================
  // TIME MESSAGE
  // ========================================

  let timeMessage = "";

  if (time.value === "small") {

    timeMessage =
      "Since you have limited time, consider starting with a small service or flexible freelance task.";

  }

  else if (time.value === "medium") {

    timeMessage =
      "With 5–10 hours available each week, you can begin building a consistent sideline.";

  }

  else if (time.value === "large") {

    timeMessage =
      "With 10–20 hours available each week, you have room to develop a more structured freelance service.";

  }

  else {

    timeMessage =
      "With 20+ hours available each week, you can explore a more serious remote or freelance path.";

  }


  // ========================================
  // STARTING POINT MESSAGE
  // ========================================

  let startingMessage = "";

  if (
    startingPoint.value === "experienced"
  ) {

    startingMessage =
      "You may be ready to package an existing skill into a service.";

  }

  else if (
    startingPoint.value === "experience"
  ) {

    startingMessage =
      "Your existing experience can help you choose a direction without starting completely from zero.";

  }

  else if (
    startingPoint.value === "beginner"
  ) {

    startingMessage =
      "You can start with one beginner-friendly skill and build from there.";

  }

  else {

    startingMessage =
      "Your hobby may become a useful starting point for a small income stream.";

  }


  // ========================================
  // DISPLAY RESULTS
  // ========================================

  nicheResults.hidden = false;


  nicheResults.innerHTML = `

    <div class="niche-result-card">

      <p class="eyebrow">
        Your possible direction
      </p>

      <h3>
        You may have a starting point.
      </h3>

      <p>
        ${explanation}
      </p>


      <h4>
        Possible sideline niches:
      </h4>

      <ul>

        ${niches
          .map(
            niche =>
              `<li>${niche}</li>`
          )
          .join("")}

      </ul>


      <p>
        <strong>Time:</strong>
        ${timeMessage}
      </p>

      <p>
        <strong>Starting point:</strong>
        ${startingMessage}
      </p>


      <div class="niche-next-step">

        <strong>
          Your next step:
        </strong>

        Choose one possible niche,
        research it, and try a small project
        before investing heavily in courses
        or equipment.

      </div>


      <p class="calculator-link-text">
        Want to estimate your potential rate?
        Scroll down to use the
        <strong>Global Currency & Rate Calculator.</strong>
      </p>

    </div>

  `;


  nicheResults.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}


// ==========================================
// SHOW NICHE RESULTS
// ==========================================

if (generateNicheButton) {

  generateNicheButton.addEventListener(
    "click",
    generateNiche
  );

}


// ==========================================
// CLEAR NICHE ASSESSMENT
// ==========================================

if (clearAssessmentButton) {

  clearAssessmentButton.addEventListener(
    "click",
    function () {


      document
        .querySelectorAll(
          '#nicheAssessment input[type="radio"]'
        )
        .forEach(
          function (input) {

            input.checked = false;

          }
        );


      if (nicheResults) {

        nicheResults.innerHTML = "";

        nicheResults.hidden = true;

      }


      const assessment =
        document.getElementById(
          "nicheAssessment"
        );


      if (assessment) {

        assessment.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }

    }
  );

}


// ==========================================
// INITIAL CALCULATOR STATE
// ==========================================

if (resultsArea) {

  resultsArea.innerHTML = `

    <p class="results-placeholder">

      Enter your hourly rate to see
      your estimated earnings.

    </p>

  `;

}
