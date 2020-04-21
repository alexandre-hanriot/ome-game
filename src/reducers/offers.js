import {
  GET_OFFER_ID, SAVE_OFFERS, SAVE_ONE_OFFER, CLEAR_OFFER, HANDLE_FORM_INPUT,
  SET_OFFER_IS_LOAD, UPDATE_LIST_OFFERS,
} from 'src/actions/offers';

const initialState = {
  allOffers: [],
  offer: {
    id: 0,
    status: '',
    type: '',
    is_available: true,
    title: '',
    price: 0,
    description: '',
    postal_code: '',
    city: '',
    latitude: '',
    longitude: '',
    createdAt: '',
    updatedAt: '',
    userId: 0,
    gameId: 0,
    game: {
      id: 0,
      status: '',
      name: '',
      nb_players_min: 0,
      nb_players_max: 0,
      age_min: 0,
      duration: null,
      description: '',
      year: null,
      image: null,
      createdAt: '',
      updatedAt: '',
      gameCategoryId: 0,
      game_category: {
        id: 0,
        name: '',
        createdAt: '',
        updatedAt: '',
      },
    },
  },
  urlId: '',
  offerIsLoad: false,
};

const offersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_OFFER_ID:
      return {
        ...state,
        urlId: action.offerId,
      };
    case SAVE_OFFERS:
      return {
        ...state,
        allOffers: action.data,
        // loading: false,
      };
    case SAVE_ONE_OFFER:
      return {
        ...state,
        offer: action.offer,
      };
    case SET_OFFER_IS_LOAD:
      return {
        ...state,
        offerIsLoad: !state.offerIsLoad,
      };
    case CLEAR_OFFER:
      return {
        ...state,
        offer: {
          id: 0,
          status: '',
          type: '',
          is_available: true,
          title: '',
          price: 0,
          description: '',
          postal_code: '',
          city: '',
          latitude: '',
          longitude: '',
          createdAt: '',
          updatedAt: '',
          userId: 0,
          gameId: 0,
          game: {
            id: 0,
            status: '',
            name: '',
            nb_players_min: 0,
            nb_players_max: 0,
            age_min: 0,
            duration: null,
            description: '',
            year: null,
            image: null,
            createdAt: '',
            updatedAt: '',
            gameCategoryId: 0,
            game_category: {
              id: 0,
              name: '',
              createdAt: '',
              updatedAt: '',
            },
          },
        },
      };
    case HANDLE_FORM_INPUT: {
      let target = action.identifier;
      if (target.includes('game')) {
        const sanitizeName = target.slice(5);
        target = sanitizeName;
        return {
          ...state,
          offer: {
            ...state.offer,
            game: {
              ...state.offer.game,
              [target]: action.newValue,
            },
          },
        };
      }
      return {
        ...state,
        offer: {
          ...state.offer,
          [target]: action.newValue,
        },
      };
    }

    case UPDATE_LIST_OFFERS:
    {
      console.log('action mise à jour dans le réducers', action.id);
      const remainOffers = state.allOffers.filter((offer) => {
        console.log(offer.id);
        console.log(action.id);
        if (offer.id.toString() !== action.id.toString()) {
          return true;
        }
      });
      console.log(remainOffers);
      return {
        ...state,
        allOffers: remainOffers,
      };
    }
    default: return state;
  }
};

export default offersReducer;
