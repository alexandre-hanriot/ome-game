// == Import npm
import React from 'react';

import Header from 'src/frontend/components/Header';
import Footer from 'src/frontend/components/Footer';
import Home from 'src/frontend/components/Home';
import About from 'src/frontend/components/About';
import Offer from 'src/frontend/components/Offer';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <main>
      {/* <Home /> */}
      {/* <About /> */}
      <Offer />
    </main>
    <Footer light={false} />
  </div>
);

// == Export
export default App;
