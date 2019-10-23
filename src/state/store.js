import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import * as reducers from "./ducks";
import { reduxSaga } from "./middlewares";

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  return {
    ...store,
    runSaga: () => sagaMiddleware.run(reduxSaga)
  };
}
