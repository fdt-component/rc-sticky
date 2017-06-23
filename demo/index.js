import React from 'react';
import ReactDOM from 'react-dom';
import Component from './App.js';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

if (module.hot) {
  import('react-hot-loader').then(({AppContainer}) => {
    const render = () => ReactDOM.render(<AppContainer><Component /></AppContainer>, rootEl);
    render();
    module.hot.accept('../src/index.js', render);
  });
}
