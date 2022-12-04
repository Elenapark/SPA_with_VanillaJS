export default function SearchInput({ $target, state, onFetchLanguages }) {
  this.$element = document.createElement("form");
  this.$element.setAttribute("class", "SearchInput");
  $target.appendChild(this.$element);

  this.$state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
			<input type='text' class='SearchInput__input' placeholder="프로그램 언어를 입력하세요." />
		`;

    this.$element.querySelector("input").focus();

    this.$element.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.$element.querySelector("input").addEventListener("input", (e) => {
      if (e.target.value === "") return;
      onFetchLanguages(e.target.value);
    });
  };

  this.render();
}
