// Setup handlers on the buttons for switching themes
document.getElementById("fun-style").addEventListener("click", () => {
  document.getElementById("theme-switch-fun").checked = true;
  localStorage.setItem("page-theme", "fun");
});
document.getElementById("boring-style").addEventListener("click", () => {
  document.getElementById("theme-switch-boring").checked = true;
  localStorage.setItem("page-theme", "boring");
});

// Set the initial page theme
const initialPageTheme = localStorage.getItem("page-theme");
if (!initialPageTheme) {
  // default theme
  document.getElementById("theme-switch-boring").checked = true;
} else if (initialPageTheme === "fun") {
  document.getElementById("theme-switch-fun").checked = true;
} else if (initialPageTheme === "boring") {
  document.getElementById("theme-switch-boring").checked = true;
}
