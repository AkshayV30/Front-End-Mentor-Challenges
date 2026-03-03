/**
 * Generic JSON fetcher with safety checks
 * @param {string} path - relative path to JSON file
 * @param {string} key - property name to extract (crew, destination, technology)
 */
export async function fetchData(path, key) {
  try {
    const res = await fetch(path, { cache: "no-store" }); // no-store avoids stale data
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    const json = await res.json();

    console.log("response :", res);
    return json[key];
  } catch (err) {
    console.error(`❌ [fetchData] ${err.message}`);
    return []; // always return an empty array instead of null
  }
}
