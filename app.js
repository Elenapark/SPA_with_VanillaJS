import SearchInput from "./components/SearchInput.js";
import SelectedLangs from "./components/SelectedLangs.js";
import Suggestion from "./components/Suggestion.js";
import { getLanguages } from "./service/language_service.js";
import { debounce } from "./utils/debounce.js";

export default function App({ $target }) {
  this.state = {
    languages: [],
    selectedLangs: [],
    focusedItemIdx: 0,
  };

  this.setState = (newState) => {
    this.state = newState;
    selected.setState(this.state);
    suggestion.setState(this.state);
  };

  const selected = new SelectedLangs({
    $target,
    state: this.state,
  });

  new SearchInput({
    $target,
    onFetchLanguages: debounce(async (keyword) => {
      const languages = await getLanguages(keyword);
      this.setState({ ...this.state, languages, focusedItemIdx: 0 });
    }, 300),
  });

  const suggestion = new Suggestion({
    $target,
    state: this.state,
    onSubmit: (lang) => {
      if (!lang) return;
      this.setState({
        ...this.state,
        selectedLangs: [...this.state.selectedLangs, lang],
      });
      alert(lang);
    },
    onChangeIdx: (idx) => {
      this.setState({
        ...this.state,
        focusedItemIdx: idx,
      });
    },
  });
}
