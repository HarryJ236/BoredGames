document.addEventListener("DOMContentLoaded", () => {
  const loadUsersButton = document.getElementById("load-users");
  const usersList = document.getElementById("users-list");

  const users = [
    "Alice",
    "Bob",
    "Charlie",
    "Dana",
    "Eve"
  ];

  loadUsersButton.addEventListener("click", () => {
    usersList.innerHTML = ""; // Clear the list
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user;
      usersList.appendChild(li);
    });
  });
});
