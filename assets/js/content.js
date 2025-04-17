(function () {
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
      let baseUrl = url.split("?")[0].replace(/\/$/, "");
      let newSort = "";
      let queryParams = url.includes("?")
        ? new URLSearchParams(url.split("?")[1])
        : new URLSearchParams();
      let expectedUrl = "";

      if (url.match(/reddit\.com(\/r\/all)?($|\/$|\?)/)) {
        if (!data.homeEnabled) return;
        newSort = data.homeSort || "hot";
        if (newSort === "unset") return;
        baseUrl = baseUrl.replace(/\/(hot|new|top|rising)/, "");
        queryParams = new URLSearchParams({ feed: "home" });
        if (newSort === "top") queryParams.set("t", "all");
        expectedUrl = `${baseUrl}/${newSort}/?${queryParams.toString()}`;

        const currentSortMatch = url.match(/reddit\.com\/(hot|new|top|rising)/);
        const currentSort = currentSortMatch
          ? currentSortMatch[1] +
            (queryParams.get("t") === "all" ? "?t=all" : "")
          : "";
        const desiredSort = newSort + (newSort === "top" ? "?t=all" : "");
        if (currentSort !== desiredSort) {
          window.location.href = expectedUrl;
        }
      } else if (url.match(/reddit\.com\/r\/\w+/) && !url.includes("comment")) {
        if (!data.subEnabled) return;
        newSort = data.subSort || "hot";
        if (newSort === "unset") return;
        baseUrl = baseUrl.replace(/\/(hot|new|top|rising)/, "");
        queryParams = new URLSearchParams();
        if (newSort === "top") queryParams.set("t", "all");
        expectedUrl = `${baseUrl}/${newSort}/?${queryParams.toString()}`;

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
      } else if (url.match(/https:\/\/www\.reddit\.com\/user\/\w+[-_\w]*\//)) {
        if (!data.userEnabled) return;
        newSort = data.userSort || "hot";
        if (newSort === "unset") return;

        baseUrl = baseUrl.endsWith("/")
          ? baseUrl + "submitted"
          : baseUrl + "/submitted";
        queryParams = new URLSearchParams({ sort: newSort });
        if (newSort === "top") queryParams.set("t", "all");
        expectedUrl = `${baseUrl}?${queryParams.toString()}`;

        const currentParams = new URLSearchParams(url.split("?")[1] || "");
        const currentSort = currentParams.get("sort") || "hot";
        const currentTime = currentParams.get("t") || "";
        const desiredSort = newSort;
        const desiredTime = newSort === "top" ? "all" : "";
        const hasSubmitted = url.includes("/submitted/");

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
