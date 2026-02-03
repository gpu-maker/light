let state = {
  scene: "street_intro",
  health: 100,
  sanity: 100,
  inventory: [],
  visited: [],
  unlockedMap: ["street"], // 👈 only street at start
  unlockedEndings: []
};
const mapLocations = {
  street: {
    name: "Street",
    travelScene: "street_travel"
  },
  alley: {
    name: "Alley",
    travelScene: "alley_travel"
  },
  subway: {
    name: "Subway",
    travelScene: "subway_travel"
  },
  hospital: {
    name: "Hospital",
    travelScene: "hospital_travel"
  },
  tower: {
    name: "Tower",
    travelScene: "tower_travel"
  }
};
function travel(locationId) {
  // 1️⃣ locked? do nothing
  if (!state.unlockedMap.includes(locationId)) return;

  // 2️⃣ get travel scene from map data
  const location = mapLocations[locationId];

  // 3️⃣ move player
  state.scene = location.travelScene;

  render(updateMap();
);
}
function updateMap() {
  Object.keys(mapLocations).forEach(loc => {
    const btn = document.getElementById("map-" + loc);
    btn.disabled = !state.unlockedMap.includes(loc);
  });
}
const scenes = {
  street_travel: {
    image: "images/street.jpg",
    text: "You stand beneath the flickering streetlamp.",
    choices: [
      { text: "Explore the area", next: "street_explore" }
    ]
  },

  alley_travel: {
    image: "images/alley.jpg",
    text: "The alley smells of rust and rain.",
    choices: [
      { text: "Search the shadows", next: "alley_search" }
    ]
  },

  hospital_travel: {
    image: "images/hospital.jpg",
    text: "The hospital looms silent.",
    onEnter: () => startDialogue("doctor"),
    choices: [
      { text: "Enter the hospital", next: "hospital_depths" }
    ]
  }
};
onEnter: () => {
  if (!state.unlockedMap.includes("hospital")) {
    state.unlockedMap.push("hospital");
  }
}
street_intro → unlock alley
alley_travel → unlock subway
subway_travel → unlock hospital
