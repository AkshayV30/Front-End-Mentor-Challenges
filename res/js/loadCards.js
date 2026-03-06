// -----------------------------------------------------------------------------
// 📁 Data Loader
// -----------------------------------------------------------------------------
// ✅ PURPOSE:
// Responsible for asynchronously fetching project data from the local
// JSON file (data.json) and returning it as a usable JavaScript array.
//
// ✅ BEHAVIOR:
// - Uses the Fetch API to load `./resources/data/data.json`
// - Gracefully handles fetch or parse errors
// - Returns an empty array `[]` if the data cannot be loaded
//
// ✅ DEPENDENCIES:
// None (native JS only)
//
// ✅ RETURNS:
// Promise<Array> → Resolves to an array of project objects
//
// -----------------------------------------------------------------------------

export async function loadCards() {
  try {
    // -----------------------------
    // 🌐 Fetch JSON Data
    // -----------------------------
    // Attempt to load the data.json file containing project info
  const res = await fetch(`./res/data/data.json`);


    // Check for successful HTTP response
    if (!res.ok) throw new Error('Failed to load data.json');

    // -----------------------------
    // 📦 Parse and Return Data
    // -----------------------------
    // Convert the fetched JSON data into a JavaScript object/array
    return await res.json();
  } catch (error) {
    // -----------------------------
    // ⚠️ Error Handling
    // -----------------------------
    // If fetching or parsing fails, log the error for debugging
    console.error('Error loading project data:', error);

    // Return an empty array to prevent breaking the app
    return [];
  }
}
