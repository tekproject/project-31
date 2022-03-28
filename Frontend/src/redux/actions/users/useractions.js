import axios from "axios";
import {

    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from "./actionTypes";


export const loginUser = ({ username, password }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST,
            });

            const config = {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api-login",
                { username, password },
                config
            );
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });
            sessionStorage.setItem("userAuthData", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response.data.message,
            });
        }
    };
};


export const logoutUser = () => {
    return async (dispatch) => {
        sessionStorage.clear();
        try {
            dispatch({
                type: USER_LOGOUT,
            });
        } catch (error) { }
    };
};
