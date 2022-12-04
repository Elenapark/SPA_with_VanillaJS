export default function Suggestion({ $target, state, onSubmit, onChangeIdx }) {
  this.$element = document.createElement("ul");
  this.$element.setAttribute("tabindex", "0");
  this.$element.setAttribute("class", "Suggestion");
  $target.appendChild(this.$element);

  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.displayMatchedLetter = (keyword, lang) => {
    // console.log(keyword, lang);
    if (!lang.includes(keyword)) {
      return lang;
    }

    const matchedText = lang.match(new RegExp(keyword, "gi"))[0];
    const replacedText = `<span class="Suggestion__item--matched">${matchedText}</span>`;

    return lang.replace(new RegExp(matchedText, "gi"), replacedText);
  };

  this.render = () => {
    const { languages, focusedItemIdx, keyword } = this.state;
    const suggestionHtml = languages
      .map((lang, idx) => {
        return `<li data-index=${idx} class="${
          idx === focusedItemIdx ? "Suggestion__item--selected" : ""
        }">${this.displayMatchedLetter(keyword, lang)}</li>`;
      })
      .join("");
    this.$element.innerHTML = languages.length > 0 ? suggestionHtml : "";
    this.$element.style.display = languages.length > 0 ? "block" : "none";
  };
  this.render();

  this.$element.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const clickedLang = li.innerText;
    e.target.classList.add("Suggestion__item--selected");
    onSubmit(clickedLang);
    e.target.classList.remove("Suggestion__item--selected");
  });

  window.addEventListener("keydown", (e) => {
    const suportedKey = ["ArrowUp", "ArrowDown", "Enter"];

    if (!suportedKey.includes(e.key) || this.state.languages.length === 0) {
      return;
    }

    if (e.key === "ArrowUp") {
      onChangeIdx(
        this.state.focusedItemIdx - 1 < 0
          ? this.state.languages.length - 1
          : this.state.focusedItemIdx - 1
      );
    }
    if (e.key === "ArrowDown") {
      onChangeIdx(
        this.state.focusedItemIdx + 1 > this.state.languages.length - 1
          ? 0
          : this.state.focusedItemIdx + 1
      );
    }

    if (e.key === "Enter") {
      onSubmit(this.state.languages[this.state.focusedItemIdx]);
    }
  });
}
