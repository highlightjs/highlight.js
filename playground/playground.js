function highlight(selectedLanguage) {
  const source = document.querySelector("#code").value;
  const startTime = new Date();
  const { language, relevance, secondBest, value } = hljs.getLanguage(selectedLanguage)
    ? hljs.highlight(selectedLanguage, source, /* ignore_illegals */ true)
    : hljs.highlightAuto(source);
  const renderTime = new Date() - startTime;
  let renderStats = `${language}: relevance ${relevance}`;
  if (secondBest) {
    renderStats += `, ${secondBest.language}: relevance ${secondBest.relevance}`;
  }

  document.querySelector("#result").innerHTML = value;
  document.querySelector("#markup").textContent = value;
  document.querySelector("#highlight-details").textContent = ` in ${renderTime}ms [${renderStats}]`;

  document.querySelectorAll("#result span").forEach((span) => {
    span.dataset.className = span.className.replace("hljs-", "");
  });
}

document.querySelector("#update-highlighting").addEventListener("click", () => {
  const language = document.querySelector("#select-language").value;
  highlight(language);
});

document.querySelector("#show-structure").addEventListener("change", () => {
  document.querySelector("#result").classList.toggle("visible-structure");
});

document.querySelector("#select-language").addEventListener("change", (event) => {
  const language = event.target.value;
  highlight(language);
});

document.querySelector("#select-theme").addEventListener("change", (event) => {
  const theme = event.target.value;

  document.querySelector("link:not([disabled])[title]").setAttribute("disabled", "disabled");
  document.querySelector(`link[title="${theme}"]`).removeAttribute("disabled");
});
