import { useLayoutEffect } from 'react';
import { useRef } from 'react';

export default function CartButton({
  totalCount = 0,
  handleShowCart = Function.prototype,
}) {
  const labelRef = useRef(null);

  useLayoutEffect(() => {
    if (labelRef.current && !labelRef.current.className.includes('pulse'))
      labelRef.current.className = 'cart-total-count z-depth-2 pulse';
    if (labelRef.current && labelRef.current.className.includes('pulse'))
      setTimeout(() => {
        labelRef.current.className = 'cart-total-count z-depth-2';
      }, 1100);

    return () => {
      // if (labelRef.current)
      //   labelRef.current.className = 'cart-total-count z-depth-2';
    };
  }, [totalCount]);

  return (
    <div className='cart-btn z-depth-4' onClick={handleShowCart}>
      <i className='material-icons'>shopping_cart</i>
      {totalCount ? (
        <span className='cart-total-count z-depth-2' ref={labelRef}>
          {totalCount}
        </span>
      ) : null}
    </div>
  );
}
