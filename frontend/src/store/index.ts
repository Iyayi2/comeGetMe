import { configureStore, Middleware, combineReducers  } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};

const rootReducer = combineReducers({
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: JSON.parse(localStorage.getItem('reduxState') || '{}'),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

store.dispatch({ type: 'INITIAL_SAVE' });

export default store;
