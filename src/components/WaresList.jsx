import { useContext } from 'react';
import { WaresContext } from '../context/WaresContext';
import Ware from './Ware';

export default function WaresList({
  cartDispatch = Function.prototype,
  alertMessageDispatch = Function.prototype,
}) {
  const [wares] = useContext(WaresContext);

  return !wares.length ? (
    <h2>Nothing to display</h2>
  ) : (
    <div className='wares-grid'>
      {wares.map((ware) => (
        <Ware
          cartDispatch={cartDispatch}
          alertMessageDispatch={alertMessageDispatch}
          ware={ware}
          key={ware['offerId']}
        />
      ))}
    </div>
  );
}
