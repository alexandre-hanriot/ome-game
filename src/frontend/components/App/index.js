// == Import npm
import React from 'react';

import Header from 'src/frontend/components/Header';
import Footer from 'src/frontend/components/Footer';

import Details from 'src/frontend/components/Offer/Details';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <main>
     <Details />
    </main>
    <Footer />
  </div>
);

// == Export
export default App;
