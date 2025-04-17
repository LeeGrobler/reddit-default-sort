(function () {
  // Load preferences
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
      const url = window.location.href;
      let baseUrl = url.split("?")[0].replace(/\/$/, ""); // Remove query params and trailing slash
      let newSort = "";
      let queryParams = url.includes("?")
        ? new URLSearchParams(url.split("?")[1])
        : new URLSearchParams();
      let expectedUrl = "";

      // Home feed (e.g., reddit.com, reddit.com/r/all)
      if (url.match(/reddit\.com(\/r\/all)?($|\/$|\?)/)) {
        if (!data.homeEnabled) return; // Exit if home sorting is disabled
        newSort = data.homeSort || "hot";
        if (newSort === "unset") return; // Skip if unset
        baseUrl = baseUrl.replace(/\/(hot|new|top|rising)/, ""); // Remove existing sort from path
        queryParams = new URLSearchParams({ feed: "home" }); // Always set feed=home
        if (newSort === "top") queryParams.set("t", "all");
        expectedUrl = `${baseUrl}/${newSort}/?${queryParams.toString()}`;

        // Check if the current sort matches the desired sort
        const currentSortMatch = url.match(/reddit\.com\/(hot|new|top|rising)/);
        const currentSort = currentSortMatch
          ? currentSortMatch[1] +
            (queryParams.get("t") === "all" ? "?t=all" : "")
          : "";
        const desiredSort = newSort + (newSort === "top" ? "?t=all" : "");
        if (currentSort !== desiredSort) {
          window.location.href = expectedUrl;
        }
      }
      // Subreddit (e.g., reddit.com/r/subreddit)
      else if (url.match(/reddit\.com\/r\/\w+/) && !url.includes("comment")) {
        if (!data.subEnabled) return; // Exit if subreddit sorting is disabled
        newSort = data.subSort || "hot";
        if (newSort === "unset") return; // Skip if unset
        baseUrl = baseUrl.replace(/\/(hot|new|top|rising)/, ""); // Remove existing sort from path
        queryParams = new URLSearchParams();
        if (newSort === "top") queryParams.set("t", "all");
        expectedUrl = `${baseUrl}/${newSort}/?${queryParams.toString()}`;

        // Check if the current sort matches the desired sort
        const currentSortMatch = url.match(
          /reddit\.com\/r\/\w+\/(hot|new|top|rising)/
        );
        const currentSort = currentSortMatch
          ? currentSortMatch[1] +
            (queryParams.get("t") === "all" ? "?t=all" : "")
          : "";
        const desiredSort = newSort + (newSort === "top" ? "?t=all" : "");
        if (currentSort !== desiredSort) {
          window.location.href = expectedUrl;
        }
      }
      // User page (e.g., reddit.com/user/)
      else if (url.match(/https:\/\/www\.reddit\.com\/user\/\w+[-_\w]*\//)) {
        if (!data.userEnabled) return; // Exit if user sorting is disabled
        newSort = data.userSort || "hot";
        if (newSort === "unset") return; // Skip if unset

        // Build the new URL with /submitted/ and query params
        baseUrl = baseUrl.endsWith("/")
          ? baseUrl + "submitted"
          : baseUrl + "/submitted"; // Append /submitted/
        queryParams = new URLSearchParams({ sort: newSort });
        if (newSort === "top") queryParams.set("t", "all");
        expectedUrl = `${baseUrl}?${queryParams.toString()}`;

        // Get the current sort from query params
        const currentParams = new URLSearchParams(url.split("?")[1] || "");
        const currentSort = currentParams.get("sort") || "hot"; // Default to "hot" if no sort
        const currentTime = currentParams.get("t") || "";
        const desiredSort = newSort;
        const desiredTime = newSort === "top" ? "all" : "";

        // Check if /submitted/ is already in the URL
        const hasSubmitted = url.includes("/submitted/");
        // Redirect if /submitted/ is missing or if the sort/time parameters don’t match
        if (
          !hasSubmitted ||
          currentSort !== desiredSort ||
          (newSort === "top" && currentTime !== desiredTime)
        ) {
          window.location.href = expectedUrl;
        }
      }
    }
  );
})();
