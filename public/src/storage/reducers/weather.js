import { actionTypes } from "../../constants.js";

export const weather = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.fetchWeather:
      return action.weather;
    default:
      return state;
  }
};
