import { API } from "../config/api.js";

const apiStorage = {};

export const getLanguages = async (keyword) => {
  const url = `${API}/languages?keyword=${keyword}`;

  if (apiStorage[url]) {
    return apiStorage[url];
  }

  try {
    const res = await fetch(url);
    if (res.ok) {
      const json = res.json();
      apiStorage[url] = json;
      return json;
    }
    return Promise.reject(new Error("API 응답에 실패했습니다."));
  } catch (err) {
    throw new Error(`API 응답에 실패했습니다. ${err}`);
  }
};
