import { cartActions } from './Shop';

export default function Item({
  cartDispatch = Function.prototype,
  entry = [],
}) {
  function removeItem() {
    cartDispatch({ type: cartActions.REMOVE_ONE, payload: { id: entry[0] } });
  }
  function addItem() {
    cartDispatch({ type: cartActions.ADD, payload: { id: entry[0] } });
  }
  function clearItem() {
    cartDispatch({ type: cartActions.RMOVE_WARE, payload: { id: entry[0] } });
  }

  return (
    <li className='collection-item'>
      <span className='item-name'>{entry[1]['name']}</span>
      <b className='item-price'> {entry[1]['price']}V$</b>
      <a className='item-action remove-item'>
        <i className='material-icons ' onClick={removeItem}>
          remove
        </i>
      </a>
      <b className='item-count '> x{entry[1]['quantity']}</b>
      <a className='item-action add-item'>
        <i className='material-icons' onClick={addItem}>
          add
        </i>
      </a>
      <a className='item-action clear-item'>
        <i className='material-icons' onClick={clearItem}>
          clear
        </i>
      </a>
    </li>
  );
}
