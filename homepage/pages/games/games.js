document.addEventListener("DOMContentLoaded", () => {
  const loadGamesButton = document.getElementById("load-games");
  const gamesList = document.getElementById("games-list");

  const games = [
    "Chess",
    "Monopoly",
    "Scrabble",
    "Checkers",
    "Risk"
  ];

  loadGamesButton.addEventListener("click", () => {
    gamesList.innerHTML = ""; // Clear the list
    games.forEach(game => {
      const li = document.createElement("li");
      li.textContent = game;
      gamesList.appendChild(li);
    });
  });
});
