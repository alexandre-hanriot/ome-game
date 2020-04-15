import { SAVE_OFFERS } from 'src/actions/offers';
import { SAVE_RESERVATIONS } from 'src/actions/reservations';

const initialState = {
  listOffers: [],
  listReservations: [],
  // indique si on est en train de charger des données depuis l'API
  // loading: true,
};

const listReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_OFFERS:
      return {
        ...state,
        listOffers: action.data,
        // loading: false,
      };

    case SAVE_RESERVATIONS:
      return {
        ...state,
        listReservations: action.data,
        // loading: false,
      };
    default: return state;
  }
};
// => Pour accéder au state défini dans le reducer 'recipesReducer', il faudra que je
// descende dans le tiroir 'recipes' => state.recipes.xxxx

export default listReducer;
