import {
	AUTH_ERROR,
	GET_MESSAGES,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
import axios from "axios";
import { getMessages, clearMessages } from "../actions/creators";

// login action
export const login = ({ username, password }, redirect) => (dispatch) => {
	axios
		.post("/auth/login/", { username, password })
		.then((res) => {
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			dispatch(clearMessages());

			// redirect to posts page
			redirect();
		})
		.catch((err) => {
			console.log("err", err.response);
			dispatch(getMessages({color: 'danger', text: err.response.data.message }))
		});
};

// register functionality 
export const register = ({ username, fullName, password }, redirect) => dispatch => {
  axios
    .post('/auth/register', { username, fullName, password })
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      dispatch(clearMessages());

      // redirect to posts
      redirect();
    })
}

// logout
export const logout = (redirect) => {
	// redirect to login page
	redirect();

	return {
		type: LOGOUT,
	};
};
