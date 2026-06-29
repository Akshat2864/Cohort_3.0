// const btn = document.querySelector("button");
// const div = document.querySelector("div");
// const main = document.querySelector("main");
// const body = document.body;

// btn.addEventListener(
//   "click",
//   (events) => {
//     console.log("button triggered..");
//   },
//   true
// );

// body.addEventListener(
//   "click",
//   (events) => {
//     console.log("body triggered..");
//   },
//   true
// );

// div.addEventListener(
//   "click",
//   (events) => {
//     console.log("div triggered..");
//   },
//   true
// );

// main.addEventListener(
//   "click",
//   (events) => {
//     console.log("main triggered..");
//   },
//   true
// );

const form = document.querySelector("form");
const inp1 = document.querySelector("#name");
const inp2 = document.querySelector("#email");
const users = document.querySelector(".users");
const url = document.querySelector("#url");

let usersData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    dob: "1998-04-15",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    dob: "1996-09-28",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    dob: "2000-01-12",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    dob: "1997-07-03",
  },
  {
    id: 5,
    name: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    image: "https://randomuser.me/api/portraits/men/59.jpg",
    dob: "1995-12-19",
  },
];

const ui = () => {
  users.innerHTML = "";
  usersData.forEach((elem, index) => {
    users.innerHTML += `<div class="user_card">
              <div class="img_box">
                <img
                  src="${elem.image}"
                  alt="image here"
                />
              </div>
              <div class="text">
                <h3>Name - ${elem.name}</h3>
                <p>Email - ${elem.email}</p>
              </div>
              <div class="actions">
          <button id="edit">Edit</button>
          <button onclick="deleteCard(${index})" id="del">Delete</button>
        </div>
            </div>`;
  });
};

ui();

form.addEventListener("submit", (events) => {
  events.preventDefault();
  let name = inp1.value;
  let email = inp2.value;
  let image = url.value;

  if (name.trim() === "" && email.trim() === "" && image.trim() === "") return;

  usersData.push({
    name,
    email,
    image,
  });

  ui();

  form.reset();
});

let deleteCard = (index) => {
  usersData.splice(index, 1)
  ui();
};