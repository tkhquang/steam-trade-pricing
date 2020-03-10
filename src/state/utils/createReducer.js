import { errHandler } from "@utils";

const createReducer = initialState => reducerMap => (
  state = initialState,
  action
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};

const initStatusState = {
  loading: false,
  error: null
};

export const createStatusReducer = (initialState = {}) => (
  startedActionType,
  failedActionType,
  completedActionType
) =>
  createReducer({ ...initStatusState, ...initialState })({
    [startedActionType]: state => ({
      ...state,
      loading: true
    }),
    [failedActionType]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: errHandler(payload)
    }),
    [completedActionType]: state => ({
      ...state,
      loading: false
    })
  });

export default createReducer;
