import { cartActions } from './Shop';

export default function Ware({
  ware = {},
  cartDispatch = Function.prototype,
  alertMessageDispatch = Function.prototype,
}) {
  const { displayDescription, displayName, displayType, offerId } = ware;
  const image = ware['displayAssets'][0]['full_background'];
  const rarity = ware['rarity']['name'];
  const rarityClass = 'rarity ' + rarity.toLowerCase();
  const price = ware['price']['finalPrice'];
  const payload = { id: offerId, price: price, name: displayName };
  return (
    <div className='card' id={offerId}>
      <div className='card-image'>
        <img src={image} alt={displayName} />
      </div>
      <div className='card-content black'>
        <span className='card-type'>{displayType}</span>
        <span className={rarityClass}>{rarity}</span>
        <span className='card-title'>{displayName}</span>
        <p className='card-description'>
          {displayDescription || 'No ndescription for this item.'}
        </p>
      </div>
      <div className='card-action  grey darken-3'>
        <button
          className='btn '
          onClick={() => {
            cartDispatch({ type: cartActions.ADD, payload: payload });
            alertMessageDispatch({ type: 'ADDED-TO-CART', payload: payload });
          }}
        >
          Add to cart
        </button>
        <span className='price right'>{price} V$</span>
      </div>
    </div>
  );
}
