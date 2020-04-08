// == Import npm
import React from 'react';

import Header from 'src/frontend/components/Header';
import Footer from 'src/frontend/components/Footer';
import Home from 'src/frontend/components/Home';
import About from 'src/frontend/components/About';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <main>
      <Home />
    </main>
    <Footer light={false} />
  </div>
);

// == Export
export default App;
