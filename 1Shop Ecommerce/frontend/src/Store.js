import { createContext, useEffect, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reduce(state, action) {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      const newItem = action.payload;
      const itemExist = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = itemExist
        ? state.cart.cartItems.map((item) =>
            item._id === itemExist._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'DELETE_CART_ITEM':
      const deleteItem = state.cart.cartItems.find(
        (item) => item._id === action.payload._id
      );
      const newCartItems = state.cart.cartItems.filter(
        (item) => item._id !== deleteItem._id
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reduce, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
