import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userID) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userID: userID,
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userID");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDClhZaE86X2PKDsliVPkNzw04IVkzFp3Q";
		if (!isSignup)
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDClhZaE86X2PKDsliVPkNzw04IVkzFp3Q";
		axios
			.post(url, authData)
			.then(response => {
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000,
				);
				console.log(response);
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userID", response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userID = localStorage.getItem("userID");

				dispatch(authSuccess(token, userID));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000,
					),
				);
			}
		}
	};
};
