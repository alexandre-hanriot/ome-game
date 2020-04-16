
import { SAVE_RESERVATIONS } from 'src/actions/reservations';

const initialState = {
  allReservations: [],
  // indique si on est en train de charger des données depuis l'API
  // loading: true,
};

const reservationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_RESERVATIONS:
      return {
        ...state,
        allReservations: action.reservations,
        // loading: false,
      };

    default: return state;
  }
};
// => Pour accéder au state défini dans le reducer 'recipesReducer', il faudra que je
// descende dans le tiroir 'recipes' => state.recipes.xxxx

export default reservationsReducer;
