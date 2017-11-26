import * as types from '../actions/actionTypes';
import initialState from './initialState';

// The state param here is a slice of the store that only represent the courses
export default function courseReducer(state = [initialState.courses], action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSES_SUCCESS:
      // Creating a new array: first expand all the courses
      // inside the array with the spread operator, and the last
      // element is the new course taken from the action.
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSES_SUCCESS:
      // Creating a new array: First expand the courses removing the course
      // updated from the courses list in the store, then add the course updated.
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
