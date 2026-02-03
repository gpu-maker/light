let state = {
  scene: "street",
  health: 100,
  sanity: 100,
  inventory: [],
  location: "Street"
};

const scenes = {
  street: {
    image: "images/alley.jpg",
    text: `The streetlamp flickers. Something scratches inside your skull.
The city feels wrong.`,
    choices: [
      { text: "Enter the alley", next: "alley", sanity: -5 },
      { text: "Descend into the subway", next: "subway", sanity: -10 }
    ]
  },

  alley: {
    image: "images/alley.jpg",
    text: `The alley breathes. A door pulses faintly.`,
    choices: [
      { text: "Open the door", next: "bunker", item: "Lantern" },
      { text: "Run back", next: "street" }
    ]
  },

  subway: {
    image: "images/subway.jpg",
    text: `Whispers crawl along the walls. They know your name.`,
    choices: [
      { text: "Follow the whispers", next: "creature", health: -20 },
      { text: "Climb back up", next: "street" }
    ]
  },

  bunker: {
    image: "images/bunker.jpg",
    text: `A bunker beneath the city. Maps show a TOWER.`,
    choices: [
      { text: "Go to the Tower", next: "tower" },
      { text: "Rest (dangerous)", next: "rest" }
    ]
  },

  rest: {
    image: "images/creature.jpg",
    text: `Sleep invites nightmares. Something touches you.`,
    choices: [
      { text: "Wake screaming", next: "bunker", sanity: -25 },
      { text: "Let it in", next: "madness" }
    ]
  },

  creature: {
    image: "images/creature.jpg",
    text: `A thing of shadow emerges.`,
    choices: [
      { text: "Fight with Lantern", next: "street", requires: "Lantern", sanity: -10 },
      { text: "Freeze in terror", next: "death" }
    ]
  },

  tower: {
    image: "images/tower.jpg",
    text: `At the tower summit, the final light awaits.`,
    choices: [
      { text: "Ignite the beacon", next: "goodEnding" },
      { text: "Refuse the burden", next: "badEnding" }
    ]
  },

  madness: {
    image: "images/creature.jpg",
    text: `Your mind fractures. You see forever.`,
    choices: []
  },

  death: {
    image: "images/creature.jpg",
    text: `The city feeds.`,
    choices: []
  },

  goodEnding: {
    image: "images/tower.jpg",
    text: `Light floods the city. You are forgotten—but the world lives.`,
    choices: []
  },

  badEnding: {
    image: "images/tower.jpg",
    text: `The light dies. So will everything else.`,
    choices: []
  }
};

const ambient = document.getElementById("ambient");
ambient.volume = 0.3;
ambient.play();

function render() {
  const scene = scenes[state.scene];

  document.getElementById("scene-image").src = scene.image;
  document.getElementById("story").innerText = scene.text;
  document.getElementById("health").innerText = state.health;
  document.getElementById("sanity").innerText = state.sanity;
  document.getElementById("location").innerText = state.location;

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
  checkDeath();
}

function choose(choice) {
  if (choice.item && !state.inventory.includes(choice.item)) {
    state.inventory.push(choice.item);
    document.getElementById("pickup").play();
  }

  if (choice.health) state.health += choice.health;
  if (choice.sanity) state.sanity += choice.sanity;

  if (choice.health || choice.sanity) {
    document.getElementById("danger").play();
  }

  state.scene = choice.next;
  render();
}

function checkDeath() {
  if (state.health <= 0) {
    document.getElementById("death").play();
    state.scene = "death";
    render();
  }
  if (state.sanity <= 0) {
    state.scene = "madness";
    render();
  }
}

function renderInventory() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = "";
  state.inventory.forEach(i => {
    const li = document.createElement("li");
    li.innerText = i;
    list.appendChild(li);
  });
}

function saveGame() {
  localStorage.setItem("cyoaSave", JSON.stringify(state));
}

function loadGame() {
  const save = localStorage.getItem("cyoaSave");
  if (save) {
    state = JSON.parse(save);
    render();
  }
}

function restartGame() {
  state = {
    scene: "street",
    health: 100,
    sanity: 100,
    inventory: [],
    location: "Street"
  };
  render();
}

render();
