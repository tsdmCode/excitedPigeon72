

// Gemmer data i localStorage
export function saveDataToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Data er gemt i localStorage`);
  } catch (error) {
    console.error("Kunne ikke gemme dette data i localstorege", error);
  }
}

// Henter data fra localStorage
export function getDataFromLocalStorage(key) {
  try {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      console.warn(`Ingen data fundet`);
      return null;
    }
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Kan ikke læse den data fra localstorege", error);
    return null;
  }
}
