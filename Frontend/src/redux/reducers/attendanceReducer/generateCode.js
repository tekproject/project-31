import {
    ATTENDANCE_REQUEST,
    ATTENDANCE_SUCCESS,
    ATTENDANCE_FAIL
} from "../../actions/attendance/actionTypes";

const generateReducer = (state = {}, action) => {
    switch (action.type) {

        // Login
        case ATTENDANCE_REQUEST:
            return {
                loading: true,
            };
        case ATTENDANCE_SUCCESS:
            return {
                loading: true,
                code: action.payload,
            };
        case ATTENDANCE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default generateReducer;
