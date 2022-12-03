export function debounce(callback, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
