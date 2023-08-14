import WaresContextProvider from './context/WaresContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './components/Shop';

function App() {
  return (
    <>
      <Header />
      <WaresContextProvider>
        <Shop />
      </WaresContextProvider>
      <Footer />
    </>
  );
}

export default App;
