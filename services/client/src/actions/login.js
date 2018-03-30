export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
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

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

// Calls the API to get a token and dispatches actions along the way
export function loginUser(creds) {
  const payload = {
    email: creds.email,
    password: creds.password
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch('http://localhost:5001/auth/login', config)
      .then(response => response.json().then(user => ({user, response})))
      .then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(
            loginError(
              'Invalid login - please ensure your credentials are correct.'
            )
          );
          return Promise.reject(user);
        }
        // If login was successful, set the token in local storage

        localStorage.setItem('access_token', user.auth_token);
        // Dispatch the success action
        dispatch(receiveLogin(user));
      })
      .catch(err => {
        dispatch(
          loginError(
            'Server Error - please ensure your credentials are correct.'
          )
        );
        console.log('Error: ', err);
      });
  };
}
