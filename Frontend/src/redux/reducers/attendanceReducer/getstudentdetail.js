import {
    STUDENT_DETAIL_REQUEST,
    STUDENT_DETAIL_SUCCESS,
    STUDENT_DETAIL_FAIL
} from "../../actions/attendance/actionTypes";

const getStudentDetailReducer = (state = [], action) => {
    switch (action.type) {
        case STUDENT_DETAIL_REQUEST:
            return { loading: true };
        case STUDENT_DETAIL_SUCCESS:
            return {
                users: action.payload,
            };
        case STUDENT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default getStudentDetailReducer;
