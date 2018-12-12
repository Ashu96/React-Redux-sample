import { SAVE_PROFILE, START_FETCHING, END_FETCHING } from '../actions/profile';

//---------------------
// Reducer Handler
//---------------------
const initialState = {
  firstName: '',
  lastName: '',
  company: '',
  department: '',
  position: '',
  email: '',
  isFetching: true,
};

const REDUCER_HANDLERS = {
  [SAVE_PROFILE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [START_FETCHING]: state => ({
    ...state,
    isFetching: true,
  }),
  [END_FETCHING]: state => ({
    ...state,
    isFetching: false,
  }),
};

//-----------------------
// Reducer
//-----------------------
export default function profileReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
