function loadTemplateAndStyles(shadow, templateUrl, styleUrl, templateId) {
  return Promise.all([
    fetch(templateUrl).then((res) => res.text()),
    fetch(styleUrl).then((res) => res.text()),
    fetch("./lib/bootstrap.min.css").then((res) => res.text()),
    fetch("./assets/css/styles.css").then((res) => res.text()),
  ])
    .then(([markup, styles, bootstrapStyles, globalStyles]) => {
      const template = document.createElement("template");
      template.innerHTML = markup;

      const content = template.content
        .querySelector(`#${templateId}`)
        .content.cloneNode(true);

      const bootstrapStyle = document.createElement("style");
      bootstrapStyle.textContent = bootstrapStyles;

      const globalStyle = document.createElement("style");
      globalStyle.textContent = globalStyles;

      const style = document.createElement("style");
      style.textContent = styles;

      shadow.appendChild(bootstrapStyle);
      shadow.appendChild(globalStyle);
      shadow.appendChild(style);
      shadow.appendChild(content);

      return content;
    })
    .catch((err) => {
      console.error("Error loading resources:", err);
      throw err;
    });
}
