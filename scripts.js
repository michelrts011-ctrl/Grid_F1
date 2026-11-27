const teams = [
  {
    name: "McLaren",
    color: "#ff8000",
    drivers: [
      { number: 1, name: "Lando Norris" },
      { number: 81, name: "Oscar Piastri" },
    ],
  },
  {
    name: "Mercedes",
    color: "#00d7b8",
    drivers: [
      { number: 63, name: "George Russell" },
      { number: 12, name: "Kimi Antonelli" },
    ],
  },
  {
    name: "Red Bull Racing",
    color: "#3671c6",
    drivers: [
      { number: 3, name: "Max Verstappen" },
      { number: 6, name: "Isack Hadjar" },
    ],
  },
  {
    name: "Ferrari",
    color: "#e8002d",
    drivers: [
      { number: 16, name: "Charles Leclerc" },
      { number: 44, name: "Lewis Hamilton" },
    ],
  },
  {
    name: "Williams",
    color: "#64c4ff",
    drivers: [
      { number: 23, name: "Alexander Albon" },
      { number: 55, name: "Carlos Sainz" },
    ],
  },
  {
    name: "Racing Bulls",
    color: "#6692ff",
    drivers: [
      { number: 30, name: "Liam Lawson" },
      { number: 41, name: "Arvid Lindblad" },
    ],
  },
  {
    name: "Aston Martin",
    color: "#229971",
    drivers: [
      { number: 14, name: "Fernando Alonso" },
      { number: 18, name: "Lance Stroll" },
    ],
  },
  {
    name: "Haas",
    color: "#b6babd",
    drivers: [
      { number: 31, name: "Esteban Ocon" },
      { number: 87, name: "Oliver Bearman" },
    ],
  },
  {
    name: "Audi",
    color: "#f50537",
    drivers: [
      { number: 27, name: "Nico Hülkenberg" },
      { number: 5, name: "Gabriel Bortoleto" },
    ],
  },
  {
    name: "Alpine",
    color: "#ff87bc",
    drivers: [
      { number: 10, name: "Pierre Gasly" },
      { number: 43, name: "Franco Colapinto" },
    ],
  },
  {
    name: "Cadillac",
    color: "#d8d8d8",
    drivers: [
      { number: 11, name: "Sergio Pérez" },
      { number: 77, name: "Valtteri Bottas" },
    ],
  },
];

const grid = document.querySelector("#driver-grid");
const picker = document.querySelector("#picker");
const emptyState = document.querySelector("#empty-state");

function renderGrid(selectedTeam = "all") {
  const visibleDrivers = teams
    .filter((team) => selectedTeam === "all" || team.name === selectedTeam)
    .flatMap((team) => team.drivers.map((driver) => ({ ...driver, team })));

  grid.replaceChildren(...visibleDrivers.map(({ number, name, team }) => {
    const card = document.createElement("article");
    card.className = "driver-card";
    card.style.setProperty("--team-color", team.color);

    const driverNumber = document.createElement("span");
    driverNumber.className = "driver-number";
    driverNumber.textContent = number;

    const driverName = document.createElement("span");
    driverName.className = "driver-name";
    driverName.textContent = name;

    const teamName = document.createElement("span");
    teamName.className = "team-name";
    teamName.textContent = team.name;

    card.append(driverNumber, driverName, teamName);
    return card;
  }));
  emptyState.hidden = visibleDrivers.length > 0;
}

function createFilter(label, teamName, color) {
  const button = document.createElement("button");
  button.className = "picker-button";
  button.type = "button";
  button.dataset.team = teamName;
  button.setAttribute("aria-pressed", String(teamName === "all"));

  if (color) {
    const swatch = document.createElement("span");
    swatch.className = "picker-swatch";
    swatch.style.setProperty("--team-color", color);
    swatch.setAttribute("aria-hidden", "true");
    button.append(swatch);
  }

  button.append(document.createTextNode(label));
  return button;
}

picker.append(createFilter("Todas", "all"));
teams.forEach((team) => {
  picker.append(createFilter(team.name, team.name, team.color));
});

picker.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-team]");
  if (!button) return;

  picker.querySelectorAll(".picker-button").forEach((filter) => {
    filter.setAttribute("aria-pressed", String(filter === button));
  });
  renderGrid(button.dataset.team);
});

renderGrid();