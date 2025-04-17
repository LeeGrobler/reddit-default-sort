class SortStandard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    loadTemplateAndStyles(
      shadow,
      "./components/sort-standard/template.html",
      "./components/sort-standard/styles.css",
      "sort-standard"
    )
      .then((content) => {
        console.log("component mounted:", window.jQuery);
      })
      .catch((err) => console.error("Failed to mount component:", err));
  }
}

customElements.define("sort-standard", SortStandard);
