import {
  SAVE_OFFER_ID,
  SAVE_OFFERS,
  SAVE_ONE_OFFER,
  CLEAR_OFFER,
  HANDLE_FORM_INPUT,
  SET_OFFER_IS_LOAD,
  SET_OFFER_IN_FAVORITE,
  SET_OFFER_IN_RESERVATION,
  UPDATE_LIST_OFFERS,
  SET_OFFER_SEND,
  SET_UPLOAD_DATA,
  UPDATE_STATE_OFFERS,
  UPDATE_STATUS_STATE_OFFER,
  CLEAR_OFFERS,
} from 'src/actions/offers';

import {
  SAVE_LISTOFFER_RESERVATION,
} from 'src/actions/reservations';

const initialState = {
  allOffers: [],
  offer: {
    id: 0,
    status: '0',
    type: '0',
    is_available: true,
    image: null,
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
  offerSend: false,
  upload: {
    file: '',
    filename: '',
    uploadedFile: {},
    status: 0,
    uploadPercentage: 0,
  },
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
        offerIsLoad: true,
      };
    case SAVE_ONE_OFFER:
      return {
        ...state,
        offer: action.offer,
        offerIsLoad: true,
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
          image: null,
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
    case CLEAR_OFFERS:
      return {
        ...state,
        allOffers: [],
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

    case SET_OFFER_SEND:
      return {
        ...state,
        offerSend: action.value,
      };

    case SET_UPLOAD_DATA:
      return {
        ...state,
        upload: {
          ...state.upload,
          [action.name]: action.value,
        },
      };

    case SAVE_LISTOFFER_RESERVATION:
    {
      const offers = state.allOffers.map((offer) => {
        if (offer.id.toString() === state.urlId.toString()) {
          const reservations = offer.reservations.filter((reservation) => (reservation.id.toString() !== action.id.toString()));
          return {
            ...offer,
            reservations,
          };
        }
        return {
          ...offer,
        };
      });
      return {
        ...state,
        allOffers: offers,
      };
    }

    case UPDATE_STATE_OFFERS:
    {
      const offers = state.allOffers.map((offer) => {
        if (offer.id.toString() === state.urlId.toString()) {
          const reservations = offer.reservations.filter((reservation) => (reservation.id.toString() === action.id.toString()));
          return {
            ...offer,
            is_available: false,
            reservations,
          };
        }
        return {
          ...offer,
        };
      });
      return {
        ...state,
        allOffers: offers,
      };
    }

    case UPDATE_STATUS_STATE_OFFER:
    {
      const offers = state.allOffers.map((offer) => {
        if (offer.id.toString() === state.urlId.toString()) {
          return {
            ...state,
            is_available: true,
          };
        }
      });
      return {
        ...state,
        allOffers: offers,
      };
    }

    default: return state;
  }
};

export default offersReducer;
