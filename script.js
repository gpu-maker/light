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
