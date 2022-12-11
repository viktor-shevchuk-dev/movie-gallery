import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { movieShelfApi } from "services";

const getMiddlewaresList = (getDefaultMiddleware) => {
  let middlewaresList = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(movieShelfApi.middleware);

  if (process.env.NODE_ENV === "development")
    middlewaresList = [
      ...middlewaresList,
      // require("redux-logger").createLogger(),
    ];

  return middlewaresList;
};

const rootReducer = combineReducers({
  [movieShelfApi.reducerPath]: movieShelfApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getMiddlewaresList,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
