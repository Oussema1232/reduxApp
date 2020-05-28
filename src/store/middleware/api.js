import axios from "axios";
import config from "../../config.json";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  console.log(action.type);
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, onSuccess, onStart, onError, data } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL: config.apiURL,
      url,
      method,
      data,
    });
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (err) {
    dispatch(actions.apiCallFailed(err.message));
    if (onError) dispatch({ type: onError, payload: err.message });
  }
};

export default api;
