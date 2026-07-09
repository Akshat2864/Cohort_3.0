// ================================
// ELEMENTS
// ================================

const dashboard = document.getElementById("dashboard");
const featureContainer = document.getElementById("featureContainer");

const cards = document.querySelectorAll(".card");
const features = document.querySelectorAll(".feature");

const backBtn = document.querySelector(".back-btn");

// ================================
// OPEN FEATURE
// ================================

function openFeature(featureId) {
  dashboard.classList.add("hidden");

  featureContainer.classList.remove("hidden");

  features.forEach((feature) => {
    feature.classList.add("hidden");
  });

  document.getElementById(featureId).classList.remove("hidden");
}

// ================================
// CARD EVENTS
// ================================

cards.forEach((card) => {
  card.addEventListener("click", () => {
    openFeature(card.dataset.feature);
  });
});

// ================================
// BACK BUTTON
// ================================

backBtn.addEventListener("click", () => {
  featureContainer.classList.add("hidden");

  dashboard.classList.remove("hidden");
});

// ================================
// THEME SWITCH
// ================================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");

    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");

    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// ================================
// DATE & TIME
// ================================

const timeElement = document.getElementById("currentTime");

const dateElement = document.getElementById("currentDate");

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",

    minute: "2-digit",

    second: "2-digit",
  });

  const date = now.toLocaleDateString([], {
    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric",
  });

  timeElement.textContent = time;

  dateElement.textContent = date;
}

updateClock();

setInterval(updateClock, 1000);

// ================================
// DYNAMIC BACKGROUND
// ================================

function updateBackground() {
  document.body.classList.remove("morning", "afternoon", "evening", "night");

  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    document.body.classList.add("morning");
  } else if (hour >= 12 && hour < 17) {
    document.body.classList.add("afternoon");
  } else if (hour >= 17 && hour < 20) {
    document.body.classList.add("evening");
  } else {
    document.body.classList.add("night");
  }
}

updateBackground();

// Check every minute in case the time period changes
setInterval(updateBackground, 60000);

// ===========================================
// TODO LIST
// ===========================================

const todoInput = document.getElementById("todoInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  taskList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    if (todo.completed) li.classList.add("completed");

    if (todo.important) li.classList.add("important");

    li.innerHTML = `

            <span>${todo.text}</span>

            <div class="todo-buttons">

                <button class="important-btn" data-index="${index}">
                    ⭐
                </button>

                <button class="complete-btn" data-index="${index}">
                    ✔
                </button>

                <button class="delete-btn" data-index="${index}">
                    🗑
                </button>

            </div>

        `;

    taskList.appendChild(li);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("Please enter a task.");

    return;
  }

  todos.push({
    text,
    completed: false,
    important: false,
  });

  todoInput.value = "";

  renderTodos();
}

addTaskBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

taskList.addEventListener("click", function (e) {
  const index = e.target.dataset.index;

  if (index === undefined) return;

  if (e.target.classList.contains("delete-btn")) {
    todos.splice(index, 1);
  } else if (e.target.classList.contains("complete-btn")) {
    todos[index].completed = !todos[index].completed;
  } else if (e.target.classList.contains("important-btn")) {
    todos[index].important = !todos[index].important;
  }

  renderTodos();
});

renderTodos();

// =======================================
// DAILY PLANNER
// =======================================

const plannerContainer = document.getElementById("plannerContainer");

const plannerHours = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

let plannerData = JSON.parse(localStorage.getItem("planner")) || {};

function createPlanner() {
  plannerContainer.innerHTML = "";

  plannerHours.forEach((hour, index) => {
    const row = document.createElement("div");

    row.className = "time-slot";

    row.innerHTML = `

            <label>${hour}</label>

            <input
                type="text"
                data-index="${index}"
                placeholder="Write your plan..."
                value="${plannerData[index] || ""}"
            >

        `;

    plannerContainer.appendChild(row);
  });

  highlightCurrentHour();
}

plannerContainer.addEventListener("input", function (e) {
  if (e.target.tagName !== "INPUT") return;

  plannerData[e.target.dataset.index] = e.target.value;

  localStorage.setItem("planner", JSON.stringify(plannerData));
});

function highlightCurrentHour() {
  const currentHour = new Date().getHours();

  document.querySelectorAll(".time-slot").forEach((slot, index) => {
    slot.classList.remove("active-slot");

    const slotHour = index + 9;

    if (slotHour === currentHour) {
      slot.classList.add("active-slot");
    }
  });
}

createPlanner();

// ======================================
// DAILY GOALS
// ======================================

const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");
const goalProgress = document.getElementById("goalProgress");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function renderGoals() {
  goalList.innerHTML = "";

  let completed = 0;

  goals.forEach((goal, index) => {
    if (goal.completed) completed++;

    const li = document.createElement("li");

    if (goal.completed) li.classList.add("completed");

    li.innerHTML = `

            <span>${goal.text}</span>

            <div class="goal-buttons">

                <button
                    class="goal-complete"
                    data-index="${index}">
                    ✔
                </button>

                <button
                    class="goal-delete"
                    data-index="${index}">
                    🗑
                </button>

            </div>

        `;

    goalList.appendChild(li);
  });

  goalProgress.textContent = `${completed} of ${goals.length} Completed`;

  localStorage.setItem("goals", JSON.stringify(goals));
}

function addGoal() {
  const text = goalInput.value.trim();

  if (text === "") {
    alert("Please enter a goal.");

    return;
  }

  goals.push({
    text,
    completed: false,
  });

  goalInput.value = "";

  renderGoals();
}

addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addGoal();
  }
});

goalList.addEventListener("click", function (e) {
  const index = e.target.dataset.index;

  if (index === undefined) return;

  if (e.target.classList.contains("goal-delete")) {
    goals.splice(index, 1);
  } else if (e.target.classList.contains("goal-complete")) {
    goals[index].completed = !goals[index].completed;
  }

  renderGoals();
});

renderGoals();

// =======================================
// POMODORO TIMER
// =======================================

const timerDisplay = document.getElementById("timerDisplay");

const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resetBtn = document.getElementById("resetTimer");

const DEFAULT_TIME = 25 * 60; // 25 minutes

let timeLeft = DEFAULT_TIME;

let timer = null;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

updateTimerDisplay();

function startPomodoro() {
  if (timer !== null) return;

  timer = setInterval(function () {
    timeLeft--;

    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);

      timer = null;

      alert("🎉 Work Session Completed!");
    }
  }, 1000);
}

function pausePomodoro() {
  clearInterval(timer);

  timer = null;
}

function resetPomodoro() {
  clearInterval(timer);

  timer = null;

  timeLeft = DEFAULT_TIME;

  updateTimerDisplay();
}

startBtn.addEventListener("click", startPomodoro);

pauseBtn.addEventListener("click", pausePomodoro);

resetBtn.addEventListener("click", resetPomodoro);

// =======================================
// WEATHER WIDGET
// =======================================

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const WEATHER_API_KEY = "c7e8e59621ce886e6b5ab16880639bd7";

function getWeather(lat, lon) {
  city.textContent = "Loading...";
  temperature.textContent = "--";
  condition.textContent = "Fetching weather...";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      city.textContent = data.name;

      temperature.textContent = `${Math.round(data.main.temp)}°C`;

      condition.textContent = data.weather[0].main;

      humidity.textContent = data.main.humidity + "%";

      wind.textContent = data.wind.speed + " m/s";
    })
    .catch(() => {
      city.textContent = "Error";

      condition.textContent = "Unable to fetch weather.";
    });
}

function getLocation() {
  if (!navigator.geolocation) {
    city.textContent = "Not Supported";

    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      getWeather(
        position.coords.latitude,

        position.coords.longitude,
      );
    },

    () => {
      city.textContent = "Location Denied";

      condition.textContent = "Using default city...";

      // Delhi as fallback
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${WEATHER_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          city.textContent = data.name;

          temperature.textContent = `${Math.round(data.main.temp)}°C`;

          condition.textContent = data.weather[0].main;

          humidity.textContent = data.main.humidity + "%";

          wind.textContent = data.wind.speed + " m/s";
        });
    },
  );
}

getLocation();

// =======================================
// MOTIVATION QUOTES
// =======================================

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuote = document.getElementById("newQuote");

async function loadQuote() {
  quote.textContent = "Loading quote...";
  author.textContent = "";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    const data = await response.json();

    quote.textContent = `"${data.quote}"`;

    author.textContent = "- " + data.author;
  } catch (error) {
    quote.textContent = "Stay positive. Keep learning. Keep building.";

    author.textContent = "";
  }
}

newQuote.addEventListener("click", loadQuote);

loadQuote();
