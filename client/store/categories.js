import axios from 'axios';
import categories from '../components/categories';

// Action types
const GET_CATEGORIES = 'GET_CATEGORIES';

// Action creators
export function getCategoriesAction(categoriesList) {
  return {
    type: GET_CATEGORIES,
    categories: categoriesList
  };
}

// Thunk creators
export function getCategoryList() {
  return function thunk(dispatch) {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = getCategoriesAction(categories);
        dispatch(action);
      })
      .catch(console.error);
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
