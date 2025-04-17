class SortStandard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const section = this.getAttribute("section");
    const label = this.getAttribute("label");

    loadTemplateAndStyles(
      shadow,
      "./components/sort-standard/template.html",
      "./components/sort-standard/styles.css",
      "sort-standard"
    )
      .then((content) => {
        const $sort = $(shadow.querySelector("#sort"));
        const $toggle = $(shadow.querySelector("#toggle"));

        $(shadow.querySelector(".form-label"))[0].innerHTML = label;

        chrome.storage.local.get(
          [`${section}Sort`, `${section}Enabled`],
          (data) => {
            $sort.val(data[`${section}Sort`] || "hot");
            $toggle.prop("checked", data[`${section}Enabled`] !== false);
          }
        );

        $sort.on("change", () => {
          const preferences = {
            [`${section}Sort`]: $sort.val(),
            [`${section}Enabled`]: $toggle.prop("checked"),
          };
          chrome.storage.local.set(preferences);
        });

        $toggle.on("change", () => {
          const preferences = {
            [`${section}Sort`]: $sort.val(),
            [`${section}Enabled`]: $toggle.prop("checked"),
          };
          chrome.storage.local.set(preferences);
        });
      })
      .catch((err) => console.error("Failed to mount component:", err));
  }
}

customElements.define("sort-standard", SortStandard);
