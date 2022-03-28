import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from "../../actions/users/actionTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {

        // Login
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: true,
                userInfo: action.payload,
            };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        // Logout
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export default userReducer;
