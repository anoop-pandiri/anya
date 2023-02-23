import './App.css';
import Home from './Pages/Home/Home';

import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import AnimeDetails from 'Pages/AnimeDetails/AnimeDetails';

function App() {
  return (
    <div className="container-fluid">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/animeDetails" element={<AnimeDetails/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
