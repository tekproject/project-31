import axios from "axios";
import {

    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    FETCH_USERPROFILE_REQUEST,
    FETCH_USERPROFILE_SUCCESS,
    FETCH_USERPROFILE_FAIL,
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
            sessionStorage.setItem("id", JSON.stringify(data.profile.id));
            sessionStorage.setItem("token", JSON.stringify(data.token));
            sessionStorage.setItem("isstaff", JSON.stringify(data.profile.is_staff));
            sessionStorage.setItem("username", JSON.stringify(data.profile.username));


        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response.data.message,
            });
        }
    };
};



export const fetchUserprofile = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: FETCH_USERPROFILE_REQUEST,
                loading: true,
            });
            const { userInfo } = getState().userLogin;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${userInfo.token}`,
                },
            };

            const { data } = await axios.get("/user-profile", config);
            dispatch({
                type: FETCH_USERPROFILE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_USERPROFILE_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
}

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
