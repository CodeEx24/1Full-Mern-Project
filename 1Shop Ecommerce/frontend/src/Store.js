import { createContext, useEffect, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    //This is a string so it is not needed to parse it
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
};

function reduce(state, action) {
  switch (action.type) {
    case 'ADD_CART_ITEM': {
      const newItem = action.payload;
      const itemExist = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = itemExist
        ? state.cart.cartItems.map((item) =>
            item._id === itemExist._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'DELETE_CART_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_SIGNOUT': {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    }
    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
          cartItems: [],
          shippingAddress: {},
        },
      };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reduce, initialState);
  const value = { state, dispatch };

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
