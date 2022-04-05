import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "../reducers/userReducer/loginreducer";
import generateReducer from "../reducers/attendanceReducer/generateCode";
import usersListReducer from "../reducers/userReducer/userlistreducer";
import usersProfileReducer from "../reducers/userReducer/userprofilereducer";
import getStudentDetailReducer from "../reducers/attendanceReducer/getstudentdetail";


const reducer = combineReducers({
    userLogin: userReducer,
    generateCode: generateReducer,
    usersList: usersListReducer,
    userProfile: usersProfileReducer,
    getProfile: getStudentDetailReducer
});
const middleware = [thunk];

const userAuthFromStorage = sessionStorage.getItem("userAuthData")
    ? JSON.parse(sessionStorage.getItem("userAuthData"))
    : null;

const initialState = {
    userLogin: { userInfo: userAuthFromStorage },
};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
