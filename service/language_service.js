import { API } from "../config/api.js";

export const getLanguages = async (keyword) => {
  try {
    const res = await fetch(`${API}/languages?keyword=${keyword}`);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("API 응답에 실패했습니다."));
  } catch (err) {
    throw new Error(`API 응답에 실패했습니다. ${err}`);
  }
};
