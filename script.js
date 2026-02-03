let health = 100;
let sanity = 100;
let inventory = [];
let location = "village";
let endingsFound = [];

const locations = {
  village: true,
  forest: false,
  hospital: false,
  church: false,
  tunnels: false,
  lighthouse: false
};

const scenes = {
  village: {
    text: "You awaken in Black Hollow Village. Fog coils around abandoned homes. An old man watches you silently.",
    npc: "Old Man",
    choices: [
      { text: "Talk to the old man", action: () => npcTalk("oldman") },
      { text: "Enter the forest", action: () => move("forest") }
    ]
  },

  forest: {
    text: "The forest breathes. Trees whisper your name.",
    choices: [
      { text: "Follow whispers (-10 sanity)", action: () => { sanity -= 10; ending(1); } },
      { text: "Run back", action: () => move("village") },
      { text: "Find a rusty key", action: () => addItem("Rusty Key") }
    ]
  },

  hospital: {
    text: "The hospital smells of rot. A nurse hums behind a curtain.",
    npc: "Nurse",
    choices: [
      { text: "Let her treat you (+20 health, -15 sanity)", action: () => { health += 20; sanity -= 15; } },
      { text: "Pull the curtain", action: () => ending(5) }
    ]
  }
};

/* NPC SYSTEM */
function npcTalk(id) {
  if (id === "oldman") {
    scenes.village.text =
      "The old man rasps: 'The lighthouse watches us all.' He presses a map into your hand.";
    locations.lighthouse = true;
    render();
  }
}

/* CORE FUNCTIONS */
function move(place) {
  location = place;
  locations[place] = true;
  render();
}

function addItem(item) {
  if (!inventory.includes(item)) inventory.push(item);
  render();
}

function ending(id) {
  if (!endingsFound.includes(id)) endingsFound.push(id);
  document.getElementById("scene").innerHTML =
    `🏁 ENDING ${id}<br>You succumb to the truth of Black Hollow.`;
  document.getElementById("choices").innerHTML =
    `<button onclick="restart()">Restart</button>`;
  renderEndings();
}

/* RENDERING */
function render() {
  document.getElementById("health").textContent = health;
  document.getElementById("sanity").textContent = sanity;
  document.getElementById("items").textContent =
    inventory.length ? inventory.join(", ") : "Empty";

  const scene = scenes[location];
  document.getElementById("scene").textContent = scene.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  scene.choices.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.text;
    btn.onclick = c.action;
    choicesDiv.appendChild(btn);
  });

  renderMap();
  renderEndings();
}

function renderMap() {
  const map = document.getElementById("map");
  map.innerHTML = "";
  for (let loc in locations) {
    if (locations[loc]) {
      const btn = document.createElement("button");
      btn.textContent = loc;
      btn.onclick = () => move(loc);
      map.appendChild(btn);
    }
  }
}

function renderEndings() {
  const e = document.getElementById("endings");
  e.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const div = document.createElement("div");
    div.className = "ending";
    div.textContent = endingsFound.includes(i)
      ? `Ending ${i} ✔`
      : `Ending ${i} ✖`;
    e.appendChild(div);
  }
}

function restart() {
  health = 100;
  sanity = 100;
  inventory = [];
  location = "village";
  render();
}

render();
