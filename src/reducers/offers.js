import {
  SAVE_OFFER_ID,
  SAVE_OFFERS,
  SAVE_ONE_OFFER,
  CLEAR_OFFER,
  HANDLE_FORM_INPUT,
  SET_OFFER_IS_LOAD,
  SET_OFFER_IN_FAVORITE,
  SET_OFFER_IN_RESERVATION,
} from 'src/actions/offers';

const initialState = {
  allOffers: [],
  offer: {
    id: 0,
    status: '0',
    type: '0',
    is_available: true,
    title: '',
    price: 0,
    description: '',
    postal_code: '',
    city: '',
    latitude: null,
    longitude: null,
    zoom: 13,
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
  offerInFavorite: false,
  offerInReservation: false,
};

const offersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_OFFER_ID:
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
          status: '0',
          type: '0',
          is_available: true,
          title: '',
          price: 0,
          description: '',
          postal_code: '',
          city: '',
          latitude: null,
          longitude: null,
          zoom: 13,
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
      if (target.includes('game_')) {
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

    case SET_OFFER_IN_FAVORITE:
      return {
        ...state,
        offerInFavorite: action.value,
      };

    case SET_OFFER_IN_RESERVATION:
      return {
        ...state,
        offerInReservation: action.value,
      };

    default: return state;
  }
};

export default offersReducer;
