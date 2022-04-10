import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "../reducers/userReducer/loginreducer";
import usersProfileReducer from "../reducers/userReducer/userprofilereducer";


const reducer = combineReducers({
    userLogin: userReducer,
    userProfile: usersProfileReducer,
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
