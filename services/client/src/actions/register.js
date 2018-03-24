export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

function requesRegister(creds) {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    };
}

function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
}

// Calls the API to get a token and dispatches actions along the way
export function registerUser(creds) {
    let payload = {
        username: creds.username,
        email: creds.email,
        password: creds.password
    };

    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    };

    return dispatch => {
        // We dispatch requesRegister to kickoff the call to the API
        dispatch(requesRegister(creds));

        return fetch("http://localhost:5001/auth/register", config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            )
            .then(({ user, response }) => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(
                        registerError(
                            "Invalid register - please ensure your credentials are correct."
                        )
                    );
                    return Promise.reject(user);
                } else {
                    // If register was successful, set the token in local storage
                    localStorage.setItem("access_token", user.auth_token);
                    // Dispatch the success action
                    dispatch(receiveLogin(user));
                }
            })
            .catch(err => console.log("Error: ", err));
    };
}
