hljs.debugMode();
hljs.highlightAll();

document.querySelectorAll(".categories > li").forEach((category) => {
  category.addEventListener("click", (event) => {
    const current = document.querySelector(".categories .current");
    const currentCategory = current.dataset.category;
    const nextCategory = event.target.dataset.category;

    if (currentCategory !== nextCategory) {
      current.classList.remove("current");
      event.target.classList.add("current");

      document
        .querySelectorAll(`.${currentCategory}`)
        .forEach((language) => language.classList.add("hidden"));
      document
        .querySelectorAll(`.${nextCategory}`)
        .forEach((language) => language.classList.remove("hidden"));

      window.scrollTo(0, 0);
    }
  });
});

document.querySelectorAll(".styles > li").forEach((style) => {
  style.addEventListener("click", (event) => {
    const current = document.querySelector(".styles .current");
    const currentStyle = current.textContent;
    const nextStyle = event.target.textContent;

    if (currentStyle !== nextStyle) {
      document.querySelector(`link[title="${nextStyle}"]`).removeAttribute("disabled");
      document.querySelector(`link[title="${currentStyle}"]`).setAttribute("disabled", "disabled");

      current.classList.remove("current");
      event.target.classList.add("current");
    }
  });
});
