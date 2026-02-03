let state = {
  scene: "start",
  inventory: []
};

const scenes = {
  start: {
    text: `You wake beneath a dying streetlamp. The city is silent.
A note lies in your pocket: "Find the light before it finds you."`,
    choices: [
      { text: "Search the alley", next: "alley", item: "Rusty Key" },
      { text: "Walk toward the subway", next: "subway" }
    ]
  },

  alley: {
    text: `The alley smells of rain and metal. A locked door hums faintly.`,
    choices: [
      { text: "Use the Rusty Key", next: "door", requires: "Rusty Key" },
      { text: "Return to the street", next: "start" }
    ]
  },

  door: {
    text: `The door opens into a hidden bunker. A lantern flickers.`,
    choices: [
      { text: "Take the lantern", next: "bunker", item: "Lantern" },
      { text: "Leave immediately", next: "start" }
    ]
  },

  bunker: {
    text: `Maps cover the walls. One location is circled: THE TOWER.`,
    choices: [
      { text: "Head to the Tower", next: "tower" },
      { text: "Rest for a moment", next: "rest" }
    ]
  },

  rest: {
    text: `You rest... but something moves in the dark. You barely escape.`,
    choices: [
      { text: "Run to the Tower", next: "tower" }
    ]
  },

  subway: {
    text: `The subway tunnels echo with whispers. Something watches.`,
    choices: [
      { text: "Follow the whispers", next: "creature" },
      { text: "Climb back up", next: "start" }
    ]
  },

  creature: {
    text: `A shadow lunges. Your light keeps it at bay.`,
    choices: [
      { text: "Fight with Lantern", next: "escape", requires: "Lantern" },
      { text: "You are consumed by darkness", next: "death" }
    ]
  },

  escape: {
    text: `The creature shrieks and fades. You escape to the surface.`,
    choices: [
      { text: "Go to the Tower", next: "tower" }
    ]
  },

  tower: {
    text: `At the Tower's summit, you ignite the final beacon.
Light floods the city.`,
    choices: [
      { text: "Finish", next: "goodEnding" }
    ]
  },

  goodEnding: {
    text: `The darkness retreats. You have saved what remains.
THE END (GOOD)`,
    choices: []
  },

  death: {
    text: `The city claims another soul.
THE END (BAD)`,
    choices: []
  }
};

function render() {
  const scene = scenes[state.scene];
  document.getElementById("story").innerText = scene.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  scene.choices.forEach(choice => {
    if (choice.requires && !state.inventory.includes(choice.requires)) return;

    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => choose(choice);
    choicesDiv.appendChild(btn);
  });

  renderInventory();
}

function choose(choice) {
  if (choice.item && !state.inventory.includes(choice.item)) {
    state.inventory.push(choice.item);
  }
  state.scene = choice.next;
  render();
}

function renderInventory() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = "";
  state.inventory.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

function saveGame() {
  localStorage.setItem("cyoaSave", JSON.stringify(state));
  alert("Game Saved!");
}

function loadGame() {
  const save = localStorage.getItem("cyoaSave");
  if (save) {
    state = JSON.parse(save);
    render();
  } else {
    alert("No save found.");
  }
}

function restartGame() {
  state = { scene: "start", inventory: [] };
  render();
}

render();
