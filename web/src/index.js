import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
require('es6-promise').polyfill();
require('isomorphic-fetch');

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
