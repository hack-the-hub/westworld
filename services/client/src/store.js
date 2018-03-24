import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import api from "middleware/api";

import { combineReducers } from "redux";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "actions/login";
import { LOGOUT_SUCCESS } from "actions/logout";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(
    state = {
        isFetching: false,
        isAuthenticated: !!localStorage.getItem("access_token"),
        redirectTo: null
    },
    action
) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds,
                redirectTo: null
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: "",
                redirectTo: "/profile"
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
                redirectTo: null
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                redirectTo: "/"
            });
        default:
            return state;
    }
}
// We combine the reducers here so that they can be left split apart above
const app = combineReducers({
    auth
});

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(
    createStore
);

let store = createStoreWithMiddleware(app);

export default store;
