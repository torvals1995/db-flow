import { combineReducers } from 'redux';
import count, {actionTypes as countTypes} from './count';
export const actionTypes = {
  ...countTypes,
};

export default combineReducers({
  count,
});
