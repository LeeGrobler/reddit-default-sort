document.addEventListener("DOMContentLoaded", () => {
  const homeSort = document.getElementById("homeSort");
  const subSort = document.getElementById("subSort");
  const userSort = document.getElementById("userSort");
  const homeToggle = document.getElementById("homeToggle");
  const subToggle = document.getElementById("subToggle");
  const userToggle = document.getElementById("userToggle");
  const saveButton = document.getElementById("save");
  const status = document.getElementById("status");

  // Load saved preferences
  chrome.storage.local.get(
    [
      "homeSort",
      "subSort",
      "userSort",
      "homeEnabled",
      "subEnabled",
      "userEnabled",
    ],
    (data) => {
      homeSort.value = data.homeSort || "hot";
      subSort.value = data.subSort || "hot";
      userSort.value = data.userSort || "hot";
      homeToggle.checked = data.homeEnabled !== false; // Default to enabled
      subToggle.checked = data.subEnabled !== false;
      userToggle.checked = data.userEnabled !== false;
    }
  );

  // Save preferences when the button is clicked
  saveButton.addEventListener("click", () => {
    const preferences = {
      homeSort: homeSort.value,
      subSort: subSort.value,
      userSort: userSort.value,
      homeEnabled: homeToggle.checked,
      subEnabled: subToggle.checked,
      userEnabled: userToggle.checked,
    };
    chrome.storage.local.set(preferences, () => {
      status.textContent = "Preferences saved!";
      setTimeout(() => {
        status.textContent = "";
      }, 2000);
    });
  });
});
