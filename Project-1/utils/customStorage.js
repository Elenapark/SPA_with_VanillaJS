const customStorage = {
  getItem: (key, defaultValue, onError) => {
    try {
      const existValue = localStorage.getItem(key);
      if (existValue) {
        return JSON.parse(existValue);
      }
      return defaultValue;
    } catch (err) {
      if (onError) {
        onError(err);
      }
      return defaultValue;
    }
  },
  setItem: (key, newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(
        `브라우저 저장 공간에 문제가 생겨 저장에 실패했습니다. ${err}`
      );
    }
  },
};

export default customStorage;
