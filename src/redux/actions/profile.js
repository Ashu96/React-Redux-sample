import uuidv4 from 'uuid/v4';
import userRef from '../../firebase/firebaseConfig';
//------------------------
// Constants
//------------------------
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

//------------------------
// Actions
//------------------------

/**
 * @export function saveProfile
 * @param {object} payload
 * @returns {object} action saves the profile
 */
export function saveProfile(payload) {
  return {
    type: SAVE_PROFILE,
    payload,
  };
}

function isFetching(loading) {
  return {
    type: loading ? START_FETCHING : END_FETCHING,
  };
}

/**
 * @export function fetchProfile
 * @returns {object} action fetch profile from server
 */
export function fetchProfile() {
  return (dispatch) => {
    try {
      // eslint-disable-next-line no-undef
      const userId = window.localStorage.getItem('@lastUser');
      if (userId) {
        dispatch(isFetching(true));
        userRef.child(`/${userId}`).once('value', (snapShot) => {
          const payload = snapShot.val();
          // dispatch save user
          dispatch(saveProfile(payload));
          dispatch(isFetching(false));
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch(isFetching(false));
    }
  };
}

export function setProfile(payload) {
  return (dispatch) => {
    dispatch(isFetching(true));
    // Save user profile
    dispatch(saveProfile(payload));
    try {
      // eslint-disable-next-line no-undef
      let userId = window.localStorage.getItem('@lastUser');
      if (!userId) {
        userId = uuidv4();
      }
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('@lastUser', userId);
      // Save user profile to server
      userRef.child(`/${userId}`).set(payload);
      dispatch(isFetching(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch(isFetching(false));
    }
  };
}
