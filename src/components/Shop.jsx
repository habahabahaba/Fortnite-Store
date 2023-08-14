import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';

import { WaresContext } from '../context/WaresContext';

import Preloader from './Preloader';
import WaresList from './WaresList';
import CartButton from './CartButton';
import Cart from './Cart';
import Alert from './Alert';

import { FORTNITE_API_URL, FORTNITE_API_KEY } from '../config';

const initCart = {};

function cartReducer(cart, { type, payload }) {
  switch (type) {
    case 'ADD':
      return cart[payload.id]
        ? {
            ...cart,
            [payload.id]: {
              ...cart[payload.id],
              quantity: cart[payload.id]['quantity'] + 1,
            },
          }
        : {
            ...cart,
            [payload.id]: {
              quantity: 1,
              price: payload.price,
              name: payload.name,
            },
          };
    case 'REMOVE': {
      if (!cart[payload.id]) return cart;
      if (cart[payload.id]['quantity'] > 1) {
        return {
          ...cart,
          [payload.id]: {
            ...cart[payload.id],
            quantity: cart[payload.id]['quantity'] - 1,
          },
        };
      } else {
        const { ...newCart } = cart;
        delete newCart[payload.id];
        return newCart;
      }
    }
    case 'REMOVE_WARE': {
      const { ...newCart } = cart;
      delete newCart[payload.id];
      return newCart;
    }
    case 'RESET':
      return initCart;
    default:
      throw new Error('Cart dispatch problem!');
  }
}

export const cartActions = {
  add: 'ADD',
  ADD: 'ADD',
  remove: 'REMOVE',
  REMOVE: 'REMOVE',
  removeOne: 'REMOVE',
  REMOVE_ONE: 'REMOVE',
  rmoveWare: 'REMOVE_WARE',
  RMOVE_WARE: 'REMOVE_WARE',
  removeAll: 'RESET',
  REMOVE_ALL: 'RESET',
  clearCart: 'RESET',
  CLEAR_CART: 'RESET',
  reset: 'RESET',
  RESET: 'RESET',
};

const initAlertMessage = { type: null, data: {} };
function alertMessageReducer(alertMessage, { type, payload }) {
  switch (type) {
    case 'ADDED-TO-CART':
      return { type: type, data: payload };
    case 'RESET':
      return initAlertMessage;
    default:
      throw new Error('Alert dispatch problem!');
  }
}

export default function Shop() {
  const [wares, setWares] = useContext(WaresContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, cartDispatch] = useReducer(cartReducer, initCart);
  const [showCart, setShowCart] = useState(false);
  const [alertMessage, alertMessageDispatch] = useReducer(
    alertMessageReducer,
    initAlertMessage
  );

  function handleShowCart() {
    setShowCart(true);
  }
  function handleHideCart() {
    setShowCart(false);
  }
  useEffect(
    function controlScroll() {
      document.body.style.overflow = showCart ? 'hidden' : 'unset';
    },
    [showCart]
  );

  useEffect(
    function getWares() {
      fetch(FORTNITE_API_URL, {
        headers: { Authorization: FORTNITE_API_KEY },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data['shop']) {
            setWares(data['shop']);
          } else throw new Error('Failed to load data!');
          setIsLoading(false);
        });
    },
    [setWares]
  );

  const totalCount = Object.keys(cart).reduce((sum) => sum + 1, 0);

  return (
    <main>
      <CartButton totalCount={totalCount} handleShowCart={handleShowCart} />
      <Alert
        alertMessage={alertMessage}
        alertMessageDispatch={alertMessageDispatch}
      />
      <div className='container content'>
        {isLoading ? (
          <Preloader />
        ) : (
          <WaresList
            cartDispatch={cartDispatch}
            alertMessageDispatch={alertMessageDispatch}
          />
        )}
      </div>
      {showCart ? (
        <Cart
          cart={cart}
          cartDispatch={cartDispatch}
          handleHideCart={handleHideCart}
          totalCount={totalCount}
        />
      ) : null}
    </main>
  );
}
