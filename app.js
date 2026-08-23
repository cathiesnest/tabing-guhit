/* =========================================================
   TABING GUHIT — APP.JS
   Coordinated Core JavaScript
   Niche Finder + Rate Calculator + GA4
   Local Demo Login + Create Account + Logout
   Demo Walkthrough
   ========================================================= */


/* =========================================================
   GA4 EVENT TRACKING
   ========================================================= */

function trackEvent(eventName, parameters = {}) {

  if (typeof gtag === "function") {
    gtag("event", eventName, parameters);
  }

}


/* =========================================================
   SAFE DOM HELPERS
   ========================================================= */

function getElement(id) {
  return document.getElementById(id);
}


/* =========================================================
   SESSION
   ========================================================= */

const SESSION_KEY = "tabingGuhitSession";


function getSession() {

  try {

    const saved = localStorage.getItem(SESSION_KEY);

    return saved ? JSON.parse(saved) : null;

  } catch (error) {

    return null;

  }

}


function saveSession(user) {

  try {

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(user)
    );

    return true;

  } catch (error) {

    console.warn("Unable to save session.");
    return false;

  }

}


function clearSession() {

  try {

    localStorage.removeItem(SESSION_KEY);

  } catch (error) {

    console.warn("Unable to clear session.");

  }

}


/* =========================================================
   CREATE DEMO USER
   ========================================================= */

function createDemoSession() {

  const demoUser = {

    id: "demo-user",

    name: "Demo User",

    email: "demo@tabingguhit.com",

    demo: true

  };


  saveSession(demoUser);

  trackEvent(
    "demo_login"
  );


  return demoUser;

}


/* =========================================================
   CREATE LOCAL ACCOUNT
   DEMO ONLY
   ========================================================= */

function createLocalAccount(
  name,
  email,
  password
) {

  if (
    !name ||
    !email ||
    !password
  ) {

    return {
      success: false,
      message: "Please complete all fields."
    };

  }


  if (password.length < 6) {

    return {
      success: false,
      message: "Password must be at least 6 characters."
    };

  }


  const user = {

    id:
      "local-" +
      Date.now(),

    name:
      name.trim(),

    email:
      email.trim(),

    demo: false

  };


  /*
     IMPORTANT:

     This is a local demo profile only.
     We intentionally do NOT store the password.
     This is NOT production authentication.
  */

  saveSession(user);


  trackEvent(
    "account_created"
  );


  return {
    success: true,
    user: user
  };

}


/* =========================================================
   LOGIN
   LOCAL DEMO EXPERIENCE
   ========================================================= */

function loginUser(
  email,
  password
) {

  if (
    !email ||
    !password
  ) {

    return {
      success: false,
      message: "Please enter your email and password."
    };

  }


  /*
     Demo login.

     Any non-empty email/password combination
     is accepted locally for demonstration purposes.
  */

  const user = {

    id:
      "local-" +
      btoa(email.trim())
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 30),

    name:
      email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, function (letter) {
          return letter.toUpperCase();
        }),

    email:
      email.trim(),

    demo: false

  };


  saveSession(user);


  trackEvent(
    "login"
  );


  return {
    success: true,
    user: user
  };

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

  clearSession();

  trackEvent(
    "logout"
  );


  window.location.reload();

}


/* =========================================================
   FIND LOGIN ELEMENTS
   Supports several possible IDs
   ========================================================= */

function findFirstElement(ids) {

  for (const id of ids) {

    const element = getElement(id);

    if (element) {
      return element;
    }

  }

  return null;

}


const loginSection =
  findFirstElement([
    "loginScreen",
    "welcomeScreen",
    "authScreen"
  ]);


const appSection =
  findFirstElement([
    "appDashboard",
    "dashboard",
    "mainApp",
    "appContent"
  ]);


const loginForm =
  findFirstElement([
    "loginForm"
  ]);


const emailInput =
  findFirstElement([
    "loginEmail",
    "email",
    "login-email"
  ]);


const passwordInput =
  findFirstElement([
    "loginPassword",
    "password",
    "login-password"
  ]);


const loginButton =
  findFirstElement([
    "loginButton",
    "loginBtn",
    "login"
  ]);


const createAccountButton =
  findFirstElement([
    "createAccount",
    "createAccountButton",
    "createAccountBtn"
  ]);


const demoButton =
  findFirstElement([
    "continueDemo",
    "continueAsDemo",
    "demoButton",
    "demoLogin"
  ]);


const logoutButton =
  findFirstElement([
    "logoutButton",
    "logoutBtn",
    "logout"
  ]);


const watchDemoButton =
  findFirstElement([
    "watchDemo",
    "watchDemoButton",
    "demoVideoButton"
  ]);


/* =========================================================
   AUTH MESSAGE
   ========================================================= */

function showAuthMessage(message, type = "error") {

  const existing =
    findFirstElement([
      "authMessage",
      "loginMessage",
      "authStatus"
    ]);


  if (existing) {

    existing.textContent = message;

    existing.className =
      "auth-message " +
      type;

    existing.hidden = false;

    return;

  }


  alert(message);

}


/* =========================================================
   SHOW / HIDE LOGIN
   ========================================================= */

function showLoginScreen() {

  if (loginSection) {
    loginSection.hidden = false;
  }

  if (appSection) {
    appSection.hidden = true;
  }

}


function showAppScreen() {

  if (loginSection) {
    loginSection.hidden = true;
  }

  if (appSection) {
    appSection.hidden = false;
  }

}


/* =========================================================
   UPDATE USER DISPLAY
   ========================================================= */

function updateUserDisplay(user) {

  if (!user) {
    return;
  }


  const nameElements =
    document.querySelectorAll(
      "[data-user-name]"
    );


  nameElements.forEach(function (element) {

    element.textContent =
      user.name;

  });


  const emailElements =
    document.querySelectorAll(
      "[data-user-email]"
    );


  emailElements.forEach(function (element) {

    element.textContent =
      user.email;

  });

}


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

function handleLogin() {

  const email =
    emailInput
      ? emailInput.value.trim()
      : "";


  const password =
    passwordInput
      ? passwordInput.value
      : "";


  const result =
    loginUser(
      email,
      password
    );


  if (!result.success) {

    showAuthMessage(
      result.message,
      "error"
    );

    return;

  }


  updateUserDisplay(
    result.user
  );


  showAppScreen();

}


/* =========================================================
   LOGIN FORM SUBMIT
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      handleLogin();

    }
  );

}


/* =========================================================
   LOGIN BUTTON CLICK
   ========================================================= */

if (loginButton) {

  loginButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      handleLogin();

    }
  );

}


/* =========================================================
   CREATE ACCOUNT
   ========================================================= */

function handleCreateAccount() {

  const name =
    prompt(
      "Enter your name:"
    );


  if (!name) {
    return;
  }


  const email =
    prompt(
      "Enter your email:"
    );


  if (!email) {
    return;
  }


  const password =
    prompt(
      "Create a password (6+ characters):"
    );


  if (!password) {
    return;
  }


  const result =
    createLocalAccount(
      name,
      email,
      password
    );


  if (!result.success) {

    showAuthMessage(
      result.message,
      "error"
    );

    return;

  }


  updateUserDisplay(
    result.user
  );


  showAppScreen();


  showAuthMessage(
    "Your local demo profile has been created.",
    "success"
  );

}


if (createAccountButton) {

  createAccountButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      handleCreateAccount();

    }
  );

}


/* =========================================================
   CONTINUE AS DEMO
   ========================================================= */

function handleDemoLogin() {

  const user =
    createDemoSession();


  updateUserDisplay(
    user
  );


  showAppScreen();

}


if (demoButton) {

  demoButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      handleDemoLogin();

    }
  );

}


/* =========================================================
   LOGOUT BUTTON
   ========================================================= */

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      logoutUser();

    }
  );

}


/* =========================================================
   DEMO VIDEO
   ========================================================= */

if (watchDemoButton) {

  watchDemoButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();


      trackEvent(
        "demo_video_clicked"
      );


      const video =
        findFirstElement([
          "demoVideo",
          "walkthroughVideo"
        ]);


      if (video) {

        video.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });


        if (
          typeof video.play === "function"
        ) {

          video.play().catch(
            function () {}
          );

        }

        return;

      }


      showAuthMessage(
        "The walkthrough video will be added here soon.",
        "info"
      );

    }
  );

}


/* =========================================================
   HOURLY RATE CALCULATOR ELEMENTS
   ========================================================= */

const hourlyRateInput =
  getElement("hourlyRate");

const fromCurrencyInput =
  getElement("fromCurrency");

const toCurrencyInput =
  getElement("toCurrency");

const hoursPerDayInput =
  getElement("hoursPerDay");

const daysPerWeekInput =
  getElement("daysPerWeek");

const monthsPerYearInput =
  getElement("monthsPerYear");

const calculateButton =
  getElement("calculateRate");

const clearCalculatorButton =
  getElement("clearCalculator");

const resultsArea =
  getElement("calculatorResults");


/* =========================================================
   CURRENCY RATES
   PLANNING ESTIMATES ONLY
   ========================================================= */

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


/* =========================================================
   CURRENCY CONVERSION
   ========================================================= */

function convertCurrency(
  amount,
  fromCurrency,
  toCurrency
) {

  const fromRate =
    exchangeRatesToUSD[fromCurrency];

  const toRate =
    exchangeRatesToUSD[toCurrency];


  if (
    !Number.isFinite(fromRate) ||
    !Number.isFinite(toRate)
  ) {

    return amount;

  }


  const amountInUSD =
    amount / fromRate;


  return amountInUSD * toRate;

}


/* =========================================================
   MONEY FORMAT
   ========================================================= */

function formatMoney(
  amount,
  currency
) {

  if (!Number.isFinite(amount)) {

    return `${currency} 0.00`;

  }


  try {

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2
      }
    ).format(amount);

  } catch (error) {

    return `${currency} ${amount.toFixed(2)}`;

  }

}


/* =========================================================
   RATE CALCULATOR
   ========================================================= */

function calculateRate() {

  if (
    !hourlyRateInput ||
    !fromCurrencyInput ||
    !toCurrencyInput ||
    !hoursPerDayInput ||
    !daysPerWeekInput ||
    !monthsPerYearInput ||
    !resultsArea
  ) {

    return;

  }


  const hourlyRate =
    Number(
      hourlyRateInput.value
    );


  const fromCurrency =
    fromCurrencyInput.value;


  const toCurrency =
    toCurrencyInput.value;


  const hoursPerDay =
    Number(
      hoursPerDayInput.value
    );


  const daysPerWeek =
    Number(
      daysPerWeekInput.value
    );


  const monthsPerYear =
    Number(
      monthsPerYearInput.value
    );


  if (
    !Number.isFinite(hourlyRate) ||
    hourlyRate <= 0 ||
    hoursPerDay <= 0 ||
    daysPerWeek <= 0 ||
    monthsPerYear <= 0
  ) {

    resultsArea.innerHTML = `

      <div class="niche-result-card">

        <h3>
          Almost there!
        </h3>

        <p>
          Please enter a valid hourly rate,
          hours per day, days per week,
          and working months per year.
        </p>

      </div>

    `;

    return;

  }


  trackEvent(
    "rate_calculated",
    {
      from_currency:
        fromCurrency,

      to_currency:
        toCurrency,

      hours_per_day:
        hoursPerDay,

      days_per_week:
        daysPerWeek,

      months_per_year:
        monthsPerYear
    }
  );


  const weeksPerMonth =
    4.33;


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

    ["Annual", yearly]

  ];


  const rows =
    values
      .map(
        function ([period, amount]) {

          const convertedAmount =
            convertCurrency(
              amount,
              fromCurrency,
              toCurrency
            );


          return `

            <tr>

              <td>
                ${period}
              </td>

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

          <th>
            Period
          </th>

          <th>
            ${fromCurrency}
          </th>

          <th>
            ${toCurrency}
          </th>

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


if (calculateButton) {

  calculateButton.addEventListener(
    "click",
    calculateRate
  );

}


/* =========================================================
   CLEAR RATE CALCULATOR
   ONE CLEAR BUTTON
   ========================================================= */

if (clearCalculatorButton) {

  clearCalculatorButton.addEventListener(
    "click",
    function () {

      trackEvent(
        "calculator_cleared"
      );


      if (hourlyRateInput) {
        hourlyRateInput.value = "";
      }


      if (fromCurrencyInput) {
        fromCurrencyInput.value =
          "USD";
      }


      if (toCurrencyInput) {
        toCurrencyInput.value =
          "PHP";
      }


      if (hoursPerDayInput) {
        hoursPerDayInput.value =
          "8";
      }


      if (daysPerWeekInput) {
        daysPerWeekInput.value =
          "5";
      }


      if (monthsPerYearInput) {
        monthsPerYearInput.value =
          "12";
      }


      if (resultsArea) {

        resultsArea.innerHTML = `

          <p class="results-placeholder">

            Enter your hourly rate to see
            your estimated earnings.

          </p>

        `;

      }

    }
  );

}


/* =========================================================
   NICHE FINDER
   ========================================================= */

const startAssessmentButton =
  getElement("startAssessment");

const generateNicheButton =
  getElement("generateNiche");

const clearAssessmentButton =
  getElement("clearAssessment");

const nicheResults =
  getElement("nicheResults");


/* =========================================================
   START NICHE ASSESSMENT
   ========================================================= */

if (startAssessmentButton) {

  startAssessmentButton.addEventListener(
    "click",
    function () {

      trackEvent(
        "start_niche_assessment"
      );


      const assessment =
        getElement(
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


/* =========================================================
   GENERATE NICHE
   ========================================================= */

function generateNiche() {

  if (!nicheResults) {
    return;
  }


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


  if (
    !skill ||
    !interest ||
    !time ||
    !goal ||
    !startingPoint
  ) {

    nicheResults.hidden =
      false;


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


  trackEvent(
    "niche_results_generated",
    {
      skill:
        skill.value,

      interest:
        interest.value,

      time_available:
        time.value,

      goal:
        goal.value,

      starting_point:
        startingPoint.value
    }
  );


  let niches = [];

  let explanation = "";


  switch (skill.value) {

    case "admin":

      niches.push(
        "Virtual Assistant",
        "Administrative Assistant",
        "Calendar & Inbox Support"
      );

      explanation =
        "Your organizing skills can translate well into remote administrative and virtual support work.";

      break;


    case "customer":

      niches.push(
        "Customer Support Specialist",
        "Chat Support",
        "Client Success Assistant"
      );

      explanation =
        "Your customer service experience can be useful for remote support and client-facing roles.";

      break;


    case "writing":

      niches.push(
        "Content Writer",
        "Copywriting Assistant",
        "Social Media Assistant"
      );

      explanation =
        "Your communication skills may fit writing, content, and social media support.";

      break;


    case "sales":

      niches.push(
        "Appointment Setter",
        "Lead Generation Assistant",
        "Sales Support Specialist"
      );

      explanation =
        "Your sales skills can translate into lead generation, appointment setting, and sales support.";

      break;


    case "creative":

      niches.push(
        "Canva Designer",
        "Social Media Content Creator",
        "Digital Product Creator"
      );

      explanation =
        "Your creative skills may fit visual content, social media, and digital products.";

      break;


    case "teaching":

      niches.push(
        "Online Tutor",
        "Online Coach",
        "Learning Support Assistant"
      );

      explanation =
        "Your teaching and coaching strengths may fit tutoring, training, and learning support.";

      break;


    case "tech":

      niches.push(
        "AI Assistant",
        "No-Code Automation Assistant",
        "Technical Virtual Assistant"
      );

      explanation =
        "Your technology interests may fit AI-assisted services, automation, and technical support.";

      break;


    default:

      explanation =
        "Your answers can help point you toward a practical starting direction.";

  }


  if (
    interest.value ===
    "creative"
  ) {

    niches.push(
      "Canva Content Specialist"
    );

  }


  if (
    interest.value ===
    "technology"
  ) {

    niches.push(
      "AI-Powered Virtual Assistant"
    );

  }


  if (
    interest.value ===
    "business"
  ) {

    niches.push(
      "E-commerce Assistant"
    );

  }


  if (
    interest.value ===
    "teaching"
  ) {

    niches.push(
      "Online Learning Assistant"
    );

  }


  niches =
    [
      ...new Set(niches)
    ];


  niches =
    niches.slice(
      0,
      5
    );


  let timeMessage = "";


  if (
    time.value ===
    "small"
  ) {

    timeMessage =
      "Since you have limited time, consider starting with a small service or flexible freelance task.";

  }

  else if (
    time.value ===
    "medium"
  ) {

    timeMessage =
      "With 5–10 hours available each week, you can begin building a consistent sideline.";

  }

  else if (
    time.value ===
    "large"
  ) {

    timeMessage =
      "With 10–20 hours available each week, you have room to develop a more structured freelance service.";

  }

  else {

    timeMessage =
      "With 20+ hours available each week, you can explore a more serious remote or freelance path.";

  }


  let startingMessage = "";


  if (
    startingPoint.value ===
    "experienced"
  ) {

    startingMessage =
      "You may be ready to package an existing skill into a service.";

  }

  else if (
    startingPoint.value ===
    "experience"
  ) {

    startingMessage =
      "Your existing experience can help you choose a direction without starting completely from zero.";

  }

  else if (
    startingPoint.value ===
    "beginner"
  ) {

    startingMessage =
      "You can start with one beginner-friendly skill and build from there.";

  }

  else {

    startingMessage =
      "Your hobby may become a useful starting point for a small income stream.";

  }


  nicheResults.hidden =
    false;


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
            function (niche) {

              return `
                <li>
                  ${niche}
                </li>
              `;

            }
          )
          .join("")}

      </ul>


      <p>

        <strong>
          Time:
        </strong>

        ${timeMessage}

      </p>


      <p>

        <strong>
          Starting point:
        </strong>

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

        <strong>
          Global Currency & Rate Calculator.
        </strong>

      </p>

    </div>

  `;


  nicheResults.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}


if (generateNicheButton) {

  generateNicheButton.addEventListener(
    "click",
    generateNiche
  );

}


/* =========================================================
   CLEAR NICHE
   ONE CLEAR BUTTON
   ========================================================= */

if (clearAssessmentButton) {

  clearAssessmentButton.addEventListener(
    "click",
    function () {

      trackEvent(
        "assessment_cleared"
      );


      const assessment =
        getElement(
          "nicheAssessment"
        );


      if (assessment) {

        assessment
          .querySelectorAll(
            'input[type="radio"]'
          )
          .forEach(
            function (input) {

              input.checked =
                false;

            }
          );

      }


      if (nicheResults) {

        nicheResults.innerHTML =
          "";

        nicheResults.hidden =
          true;

      }


      if (assessment) {

        assessment.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }

    }
  );

}


/* =========================================================
   ALISON TRACKING
   ========================================================= */

const alisonLink =
  getElement(
    "alisonCoursesLink"
  );


if (alisonLink) {

  alisonLink.addEventListener(
    "click",
    function () {

      trackEvent(
        "alison_click",
        {
          link_destination:
            "alison"
        }
      );

    }
  );

}


/* =========================================================
   INITIAL CALCULATOR STATE
   ========================================================= */

if (resultsArea) {

  resultsArea.innerHTML = `

    <p class="results-placeholder">

      Enter your hourly rate to see
      your estimated earnings.

    </p>

  `;

}


/* =========================================================
   RESTORE SESSION
   ========================================================= */

function restoreSession() {

  const user =
    getSession();


  if (user) {

    updateUserDisplay(
      user
    );

    showAppScreen();

  }

  else {

    /*
       If the expanded HTML has a login screen,
       show it.

       If the current page has no login screen,
       leave the existing content visible.
    */

    if (loginSection) {

      showLoginScreen();

    }

  }

}


/* =========================================================
   PUBLIC APP API
   ========================================================= */

window.TabingGuhit = {

  trackEvent,

  getSession,

  saveSession,

  clearSession,

  createDemoSession,

  createLocalAccount,

  loginUser,

  logoutUser,

  calculateRate,

  generateNiche,

  convertCurrency,

  formatMoney

};


/* =========================================================
   APP READY
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    restoreSession();


    trackEvent(
      "tabing_guhit_ready"
    );

  }
);
