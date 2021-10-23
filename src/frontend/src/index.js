import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { Main } from './components/Main';
//import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop';

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Route path='/' exact component={Main}/>
            <Route path='/contact' component={Main}/>
            <Route path='/about' component={Main}/>
            <Route path='/dashboard' component={App} /> 
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();