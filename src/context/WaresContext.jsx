import { createContext, useState } from 'react';

export const WaresContext = createContext();

export default function WaresContextProvider({ children }) {
  const [wares, setWares] = useState([]);

  return (
    <WaresContext.Provider value={[wares, setWares]}>
      {children}
    </WaresContext.Provider>
  );
}
