import {
    FETCH_USERPROFILE_REQUEST,
    FETCH_USERPROFILE_FAIL,
    FETCH_USERPROFILE_SUCCESS,
} from "../../actions/users/actionTypes";

const usersProfileReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_USERPROFILE_REQUEST:
            return { loading: true };
        case FETCH_USERPROFILE_SUCCESS:
            return {
                users: action.payload,
            };
        case FETCH_USERPROFILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default usersProfileReducer;
