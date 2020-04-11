import { actionTypes } from "../../constants.js";

export const weatherFetched = weather => ({
  type: actionTypes.fetchWeather,
  weather
});
