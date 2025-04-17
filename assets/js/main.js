$(document).ready(() => {
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
      $("#homeSort").val(data.homeSort || "hot");
      $("#subSort").val(data.subSort || "hot");
      $("#userSort").val(data.userSort || "hot");
      $("#homeToggle").prop("checked", data.homeEnabled !== false);
      $("#subToggle").prop("checked", data.subEnabled !== false);
      $("#userToggle").prop("checked", data.userEnabled !== false);
    }
  );

  const savePreferences = () => {
    const preferences = {
      homeSort: $("#homeSort").val(),
      subSort: $("#subSort").val(),
      userSort: $("#userSort").val(),
      homeEnabled: $("#homeToggle").prop("checked"),
      subEnabled: $("#subToggle").prop("checked"),
      userEnabled: $("#userToggle").prop("checked"),
    };
    chrome.storage.local.set(preferences);
  };

  $("#homeSort").on("change", savePreferences);
  $("#subSort").on("change", savePreferences);
  $("#userSort").on("change", savePreferences);

  $("#homeToggle").on("change", savePreferences);
  $("#subToggle").on("change", savePreferences);
  $("#userToggle").on("change", savePreferences);
});
