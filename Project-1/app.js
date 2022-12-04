import SearchInput from "./components/SearchInput.js";
import SelectedLangs from "./components/SelectedLangs.js";
import Suggestion from "./components/Suggestion.js";
import { getLanguages } from "./service/language_service.js";
import customStorage from "./utils/customStorage.js";
import { debounce } from "./utils/debounce.js";

const SELETED_LANGUAGUES = "selected_languages";

export default function App({ $target }) {
  this.state = {
    languages: [],
    selectedLangs: customStorage.getItem(SELETED_LANGUAGUES, [], (err) => {
      alert(`저장된 데이터에 문제가 생겨 기본 데이터로 설정됩니다. ${err}`);
    }),
    focusedItemIdx: 0,
    keyword: "",
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
      this.setState({ ...this.state, languages, focusedItemIdx: 0, keyword });
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

      customStorage.setItem(SELETED_LANGUAGUES, this.state.selectedLangs);
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
