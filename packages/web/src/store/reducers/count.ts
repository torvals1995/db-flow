import _ from 'lodash-es';
import keyMirror from 'keymirror';
export const actionTypes = keyMirror({
  ADD: null,
  MINUS: null
});

interface Iaction {
  // redux 类型
  type: string;
}
const initialState = 0;
export default function count(state = initialState, action: Iaction) {
  const type = _.get(action, 'type');
  switch (type) {
    case actionTypes.ADD: {
      return state + 1;
      // return get(action, 'payload.id', initialState);
    }
    case actionTypes.MINUS: {
      return state - 1;
    }
    default:
      return state;
  }
}
// const countReducer = (state = 0, action) => {
//   switch (action.type) {
//     case "ADD":
//       return state + 1;
//     case "MINUS":
//       return state - 1;
//     default:
//       return state;
//   }
// }