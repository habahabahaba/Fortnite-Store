import Item from './Item';

import { cartActions } from './Shop';
export default function Cart({
  cart = {},
  cartDispatch = Function.prototype,
  handleHideCart = Function.prototype,
  totalCount = 0,
}) {
  const totalSum = Object.values(cart).reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  return (
    <>
      <div className='cart-backdrop' onClick={handleHideCart}></div>
      <div className='cart-window z-depth-4'>
        <div className='cart-header '>
          <h4>{`Your cart${!totalCount ? ' is empty' : ':'}`}</h4>
        </div>

        <ul className='collection cart-items-list'>
          {Object.entries(cart).map((entry) => (
            <Item key={entry[0]} entry={entry} cartDispatch={cartDispatch} />
          ))}
        </ul>
        {
          <div className={`cart-total-sum ${!totalCount ? 'inactive' : ''}`}>
            <h5> Order price: </h5> <h5> {totalSum} V$</h5>
          </div>
        }
        <div className='cart-action'>
          <button
            className='waves-effect waves-light btn-small btn-close-cart'
            onClick={handleHideCart}
          >
            Close Cart
          </button>
          <button
            className={`waves-effect waves-light btn-small btn-clear-cart  ${
              !totalCount ? 'disabled' : ''
            }`}
            onClick={() => {
              cartDispatch({ type: cartActions.CLEAR_CART });
            }}
          >
            Clear Cart
          </button>
          <button
            className={`waves-effect waves-light btn-small btn-place-order ${
              !totalCount ? 'disabled' : ''
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
