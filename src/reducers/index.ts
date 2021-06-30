import { combineReducers } from 'redux';
import post from 'reducers/post';

const rootReducer = combineReducers({
  post,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
