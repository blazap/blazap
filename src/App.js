import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Main from './components/Main'
import AppPage from './components/AppPage'
import Send from './components/Send'
import Favourites from './components/Favourites'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={< Main />}></Route>
          <Route path="/app/:id" element={<AppPage />} />
          <Route path="/send" element={<Send />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;