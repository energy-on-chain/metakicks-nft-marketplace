// Import React Components
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Styling
import 'bootstrap/dist/css/bootstrap.css';
import './components/App.css';

// Import App Components
// import App from './components/App';
import HomePage from './components/HomePage';
import MintPage from './components/MintPage';

// Import Helpers
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mint" element={<MintPage />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
