import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import { getLanguages } from "./service/language_service.js";

export default function App({ $target }) {
  this.state = {
    languages: [],
    selectedLangs: [],
    focusedItemIdx: 0,
  };

  this.setState = (newState) => {
    this.state = newState;
    suggestion.setState(newState);
  };

  new SearchInput({
    $target,
    onFetchLanguages: async (keyword) => {
      const languages = await getLanguages(keyword);
      this.setState({ ...this.state, languages, focusedItemIdx: 0 });
    },
  });

  const suggestion = new Suggestion({
    $target,
    state: this.state,
    onSubmit: (lang) => {
      if (!lang) return;
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
