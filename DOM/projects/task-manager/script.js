
let tasks = []; 
let taskCounter = 0; 


const taskTitleInput = document.querySelector("#taskTitle");
const taskCategorySelect = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");
const filterStatus = document.querySelector("#filterStatus");
const clearAllBtn = document.querySelector("#clearAllBtn");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");
const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const doneCount = document.querySelector("#doneCount");


function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

themeToggle.addEventListener("click", () => {

  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});


function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("task-card");


  card.setAttribute("data-id", task.id); 
  card.setAttribute("data-status", task.status); 
  card.dataset.category = task.category; 
  

  
  const header = document.createElement("div");
  header.classList.add("task-header");

  const titleWrap = document.createElement("div");

  const titleEl = document.createElement("div");
  titleEl.classList.add("task-title");
  
  titleEl.appendChild(document.createTextNode(task.title));

  const metaEl = document.createElement("div");
  metaEl.classList.add("task-meta");

  const badge = document.createElement("span");
  badge.classList.add("badge", `badge-${task.category}`);
  badge.appendChild(document.createTextNode(categoryLabel(task.category)));

  const idEl = document.createElement("span");
  idEl.classList.add("task-id");
  idEl.textContent = `#${task.id}`;

  metaEl.append(badge, idEl);
  titleWrap.append(titleEl, metaEl);

  
  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-icon btn-edit";
  editBtn.textContent = "✏️";
  editBtn.title = "Edit task";
  editBtn.setAttribute("data-action", "edit"); 

  const doneBtn = document.createElement("button");
  doneBtn.className = "btn btn-icon btn-done";
  doneBtn.textContent = task.status === "completed" ? "↩️" : "✅";
  doneBtn.title =
    task.status === "completed" ? "Mark pending" : "Mark complete";
  doneBtn.setAttribute("data-action", "toggle");

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-icon btn-delete";
  deleteBtn.textContent = "🗑";
  deleteBtn.title = "Delete task";
  deleteBtn.setAttribute("data-action", "delete");

  
  actions.append(editBtn, doneBtn, deleteBtn);
  header.append(titleWrap, actions);

  
  card.append(header);

  
  if (task.status === "completed") {
    titleEl.style.textDecoration = "line-through";
  }

  return card;
}

function categoryLabel(cat) {
  const map = {
    work: "💼 Work",
    personal: "🏠 Personal",
    study: "📚 Study",
    health: "💪 Health",
    other: "🗂 Other",
  };
  return map[cat] || cat;
}


function renderTasks() {
  const search = searchInput.value.toLowerCase();
  const catFilter = filterCategory.value;
  const statFilter = filterStatus.value;

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search);
    const matchCat = catFilter === "all" || t.category === catFilter;
    const matchStat = statFilter === "all" || t.status === statFilter;
    return matchSearch && matchCat && matchStat;
  });

 
  taskList.querySelectorAll(".task-card").forEach((el) => el.remove());

  if (filtered.length === 0) {
    emptyState.style.display = "";
  } else {
    emptyState.style.display = "none";

    const fragment = document.createDocumentFragment();
    filtered.forEach((task) => {
      fragment.appendChild(createTaskCard(task));
    });
  
    taskList.append(fragment);
  }

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "completed").length;
  const pending = total - done;
  totalCount.textContent = total;
  pendingCount.textContent = pending;
  doneCount.textContent = done;

 
}

function addTask() {

  const title = taskTitleInput.value.trim();
  if (!title) {
    taskTitleInput.style.borderColor = "var(--danger)";
    taskTitleInput.focus();
    setTimeout(() => (taskTitleInput.style.borderColor = ""), 800);
    return;
  }

  taskCounter++;
  const task = {
    id: taskCounter,
    title,
    category: taskCategorySelect.value,
    status: "pending",
    createdAt: Date.now(),
  };

  tasks.unshift(task); 


  taskTitleInput.value = "";
  

  renderTasks();
}


taskList.addEventListener("click", (event) => {

  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn) return;

 
  const card = actionBtn.closest(".task-card");
  if (!card) return;

 
  const id = parseInt(card.getAttribute("data-id"), 10);
  const action = actionBtn.getAttribute("data-action");

  if (action === "delete") handleDelete(id, card);
  if (action === "toggle") handleToggle(id, card);
  if (action === "edit") handleEdit(id, card);
});


function handleDelete(id, card) {
  tasks = tasks.filter((t) => t.id !== id);

  card.remove();
  updateStats();
  if (tasks.filter((t) => matchFilters(t)).length === 0) {
    emptyState.style.display = "";
  }
}


function handleToggle(id, card) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.status = task.status === "completed" ? "pending" : "completed";


  card.setAttribute("data-status", task.status);

  const titleEl = card.querySelector(".task-title");
  titleEl.style.textDecoration =
    task.status === "completed" ? "line-through" : "";


  const oldBtn = card.querySelector('[data-action="toggle"]');
  const newBtn = document.createElement("button");
  newBtn.className = "btn btn-icon btn-done";
  newBtn.title = task.status === "completed" ? "Mark pending" : "Mark complete";
  newBtn.textContent = task.status === "completed" ? "↩️" : "✅";
  newBtn.setAttribute("data-action", "toggle");
 
  oldBtn.replaceWith(newBtn);

  
  const hasStatus = card.hasAttribute("data-status");
  console.log(`[Attr] card hasAttribute('data-status'): ${hasStatus}`);
  console.log(
    `[Attr] card.getAttribute('data-status'): ${card.getAttribute("data-status")}`,
  );

  updateStats();
}


function handleEdit(id, card) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;


  if (card.querySelector(".task-edit-input")) return;

  const titleEl = card.querySelector(".task-title");

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task-edit-input";
  editInput.value = task.title; 


  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-done btn-icon";
  saveBtn.textContent = "💾 Save";
  saveBtn.style.marginRight = "6px";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-ghost btn-icon";
  cancelBtn.textContent = "✖ Cancel";


  titleEl.before(editInput);


  titleEl.after(saveBtn, cancelBtn);


  titleEl.style.display = "none";

  editInput.focus();
  editInput.select();

  function saveEdit() {
    const newTitle = editInput.value.trim();
    if (!newTitle) return;
    task.title = newTitle;

    titleEl.textContent = newTitle;
  
    editInput.remove();
    saveBtn.remove();
    cancelBtn.remove();
   
    titleEl.style.display = "";
    updateStats();
  }

  saveBtn.addEventListener("click", saveEdit);
  cancelBtn.addEventListener("click", () => {
    editInput.remove();
    saveBtn.remove();
    cancelBtn.remove();
    titleEl.style.display = "";
  });
  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelBtn.click();
  });
}


function matchFilters(t) {
  const search = searchInput.value.toLowerCase();
  const cat = filterCategory.value;
  const stat = filterStatus.value;
  return (
    t.title.toLowerCase().includes(search) &&
    (cat === "all" || t.category === cat) &&
    (stat === "all" || t.status === stat)
  );
}


clearAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) return;
  if (!confirm("Delete all tasks? This cannot be undone.")) return;
  tasks = [];

  renderTasks();
});


searchInput.addEventListener("input", renderTasks);
filterCategory.addEventListener("change", renderTasks);
filterStatus.addEventListener("change", renderTasks);


addTaskBtn.addEventListener("click", addTask);
taskTitleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});






function appendLog(logEl, text, className) {

  const entry = document.createElement("div");
  entry.className = className;
  entry.textContent = text;
  logEl.prepend(entry);

  while (logEl.children.length > 8) logEl.lastChild.remove();
}

const bubbleLog = document.getElementById("bubbleLog");
const captureLog = document.getElementById("captureLog");


document.getElementById("bubbleGP").addEventListener(
  "click",
  (e) => {
    console.log("[Bubble] Grandparent fired");
    appendLog(bubbleLog, "🟣 Grandparent", "log-gp");
  },
  false,
); 

document.getElementById("bubblePar").addEventListener(
  "click",
  (e) => {
    console.log("[Bubble] Parent fired");
    appendLog(bubbleLog, "🟡 Parent", "log-par");
  },
  false,
);

document.getElementById("bubbleChild").addEventListener(
  "click",
  (e) => {
    console.log("[Bubble] Child fired");
    appendLog(bubbleLog, "🟢 Child (target)", "log-ch");

  },
  false,
);


document.getElementById("captureGP").addEventListener(
  "click",
  (e) => {
    console.log("[Capture] Grandparent fired");
    appendLog(captureLog, "🟣 Grandparent", "log-gp");
  },
  true,
); 

document.getElementById("capturePar").addEventListener(
  "click",
  (e) => {
    console.log("[Capture] Parent fired");
    appendLog(captureLog, "🟡 Parent", "log-par");
  },
  true,
);

document.getElementById("captureChild").addEventListener(
  "click",
  (e) => {
    console.log("[Capture] Child (target)");
    appendLog(captureLog, "🟢 Child (target)");
  },
  true,
);


function init() {
  applyTheme('light');
  renderTasks();
}

init();

