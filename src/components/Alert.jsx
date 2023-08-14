import { useEffect } from 'react';
import { useRef } from 'react';

export default function Alert({ alertMessage = {} }) {
  const { type, data } = alertMessage;
  const alertElRef = useRef();
  let message = null;
  let backgroundClass = '';
  switch (type) {
    case 'ADDED-TO-CART':
      message = (
        <span>
          <b>{data.name}</b> was added to your cart
        </span>
      );
      backgroundClass = 'added-to-cart-background alert-hidden';

      break;
    default:
      message = null;
      backgroundClass = '';
  }

  useEffect(
    function hideAlert() {
      let fadeTimeId = undefined;
      let hideTimeId = undefined;
      if (type) {
        const alertClassName = alertElRef?.current.classList;
        alertClassName.remove('alert-hidden');
        fadeTimeId = setTimeout(() => {
          alertClassName.add('alert-fade');
        }, 2600);
        hideTimeId = setTimeout(() => {
          alertClassName.add('alert-hidden');
        }, 3000);
        return () => {
          hideTimeId && clearTimeout(hideTimeId);
          hideTimeId && clearTimeout(fadeTimeId);
          alertClassName.remove('alert-fade');
        };
      }
    },
    [type, data]
  );

  return (
    <div
      className={`toast alert-message ${backgroundClass} alert-hidden`}
      ref={alertElRef}
    >
      {message}
    </div>
  );
}
