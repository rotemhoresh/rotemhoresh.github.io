const cursor = document.getElementById("cursor");

setInterval(() => {
  cursor.classList.toggle("disappear");
}, 1000);

const theme = document.getElementById("theme");

theme.addEventListener("click", () => document.body.classList.toggle("dark"));

document
  .querySelectorAll("ul > li")
  .forEach((e) => e.addEventListener("click", () => alert("WIP")));
