$(document).ready(() => {
  console.log("document ready");

  chrome.storage.local.get(["userSort", "userEnabled"], (data) => {
    $("#userSort").val(data.userSort || "hot");
    $("#userToggle").prop("checked", data.userEnabled !== false);
  });

  const savePreferences = () => {
    const preferences = {
      userSort: $("#userSort").val(),
      userEnabled: $("#userToggle").prop("checked"),
    };
    chrome.storage.local.set(preferences);
  };

  $("#userSort").on("change", savePreferences);
  $("#userToggle").on("change", savePreferences);
});
