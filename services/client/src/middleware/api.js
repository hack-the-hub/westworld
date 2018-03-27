const BASE_URL = 'http://localhost:5001/auth/login';

function callApi(endpoint, authenticated) {
  const token = localStorage.getItem('access_token') || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    } else {
      throw new Error('No token saved!');
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => response.text().then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text);
      }

      return text;
    })
    .catch(err => console.log(err));
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, authenticated } = callAPI;

  const [successType, errorType] = types;

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error =>
      next({
        error: error.message || 'There was an error.',
        type: errorType
      })
  );
};
