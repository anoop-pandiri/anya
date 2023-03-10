import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './Sections/Header';
import Footer from './Sections/Footer';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title="ANYA";

root.render(
  <React.StrictMode>
    
      <div id='index'>
        <Header/>
        <App />
        <Footer/>
      </div>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
