export default function Suggestion({ $target, state, onSubmit }) {
  this.$element = document.createElement("ul");
  this.$element.setAttribute("class", "Suggestion");
  $target.appendChild(this.$element);

  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const suggestionHtml = this.state.languages
      .map((lang, idx) => {
        return `<li data-index=${idx}>${lang}</li>`;
      })
      .join("");
    this.$element.innerHTML = suggestionHtml;
  };

  this.$element.addEventListener("click", (e) => {
    const clickedLang = e.target.closest("li").innerText;
    e.target.classList.add("Suggestion__item--selected");
    onSubmit(clickedLang);
    e.target.classList.remove("Suggestion__item--selected");
  });

  this.$element.addEventListener("keydown", (e) => {
    const clickedLang = e.target.closest("li").innerText;

    if (e.key === "ArrowUp") {
      console.log("up");
    }
    if (e.key === "ArrowDown") {
      console.log("down");
    }

    if (e.key === "Enter") {
      e.target.classList.add("Suggestion__item--selected");
      onSubmit(clickedLang);
      e.target.classList.remove("Suggestion__item--selected");
    }
  });

  this.render();
}
