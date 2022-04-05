import axios from "axios";
import {
    ATTENDANCE_REQUEST,
    ATTENDANCE_SUCCESS,
    ATTENDANCE_FAIL,
    STUDENT_DETAIL_REQUEST,
    STUDENT_DETAIL_SUCCESS,
    STUDENT_DETAIL_FAIL,
    CHECKOUT_UPDATE_REQUEST,
    CHECKOUT_UPDATE_SUCCESS,
    CHECKOUT_UPDATE_FAIL
} from "./actionTypes";


export const GenerateCode = () => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: ATTENDANCE_REQUEST,
            });

            const config = {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `token ${userInfo.token}`,

                },
            };
            const { data } = await axios.get(
                "/generate-code",
                config
            );
            dispatch({
                type: ATTENDANCE_SUCCESS,
                payload: data,
            });
            console.log(data)
            sessionStorage.setItem("userData", JSON.stringify(data.user));
        } catch (error) {
            dispatch({
                type: ATTENDANCE_FAIL,
                payload: error.response.data.message,
            });
        }
    };
};

export const getstudentDetail = () => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        console.log(userInfo);
        try {
            dispatch({
                type: STUDENT_DETAIL_REQUEST,
            });
            const config = {
                headers: {
                    authorization: `token ${userInfo.token}`,
                },
                params: {
                    id: JSON.parse(sessionStorage.getItem("userData")),
                }
            };
            const { data } = await axios.get('/get-student-detail', config);
            dispatch({
                type: STUDENT_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: STUDENT_DETAIL_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};

export const updateCheckout = () => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: CHECKOUT_UPDATE_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `token ${userInfo.token}`,
                },
            };
            const { data } = await axios.put(
                "/check-out",

                config
            );

            dispatch({
                type: CHECKOUT_UPDATE_SUCCESS,
                payload: data,
            });
            console.log(data)
        } catch (error) {
            dispatch({
                type: CHECKOUT_UPDATE_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    };
};