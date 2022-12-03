export default function SelectedLangs({ $target, state }) {
  this.$element = document.createElement("ul");
  this.$element.setAttribute("class", "SelectedLanguage");
  $target.appendChild(this.$element);
  this.state = state;

  const LANGS_LIMIT = 5;

  this.setState = (newState) => {
    this.state = newState;
    if (this.state.selectedLangs.length > LANGS_LIMIT) {
      const restart = this.state.selectedLangs.length - LANGS_LIMIT;
      this.state.selectedLangs = this.state.selectedLangs.slice(
        restart,
        LANGS_LIMIT + restart
      );
    }
    this.render();
  };

  this.render = () => {
    const selectedLangsHtml =
      this.state.selectedLangs &&
      this.state.selectedLangs
        .map((lang) => {
          console.log(lang);
          return `<li>${lang}</li>`;
        })
        .join("");
    this.$element.innerHTML = selectedLangsHtml;
  };

  this.render();
}
