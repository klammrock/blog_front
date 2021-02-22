import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom';
//import './index.scss';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

import Main from './containers/app/Main/index';
//import { FocusStyleManager } from '@blueprintjs/core'
import 'moment/locale/ru'

import store from 'redux/configureStore';

import i18n from './services/i18n'
i18n.changeLanguage('ru')


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

//FocusStyleManager.onlyShowFocusOnTabs()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// TODO:
//reportWebVitals();
