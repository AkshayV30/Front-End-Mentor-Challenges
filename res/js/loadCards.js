const DATA_PATH = "../data";

const LEVEL_FILES = Object.freeze({
  newbie: "newbie.json",
  junior: "junior.json",
  intermediate: "intermediate.json",
  advanced: "advanced.json",
});

async function loadLevel(level) {
  const filename = LEVEL_FILES[level];

  if (!filename) {
    console.warn(`Unknown level: ${level}`);
    return [];
  }

  try {
    const response = await fetch(`${DATA_PATH}/${filename}`);

    if (!response.ok) {
      throw new Error(`${filename} returned ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn(`${filename} does not contain an array.`);
      return [];
    }

    return data.map((project) => ({
      ...project,
      level: level.toUpperCase(),
    }));
  } catch (error) {
    console.error(`Failed to load ${level} projects:`, error);

    return [];
  }
}

export async function loadCards() {
  const levels = Object.keys(LEVEL_FILES);

  const projects = await Promise.all(levels.map(loadLevel));

  return projects.flat();
}
