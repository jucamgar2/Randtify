import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/home/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SpotifyCallback from './services/SpotifyCallback';
import LayoutWithNavbar from './layouts/LayoutWithNavbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithNavbar/>}>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<SpotifyCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
