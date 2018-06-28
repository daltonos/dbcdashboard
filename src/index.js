import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { addLocaleData, IntlProvider} from 'react-intl';
import App from './components/app';
import i18nConfig from './i18n'

import de from 'react-intl/locale-data/de';
addLocaleData([...de]);

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}


const store = configureStore();

render(
    <IntlProvider
        locale='de' //TO-DO in the future this could be selected according to the user's browser language, with multiple translation files
        messages={i18nConfig.messages}>
        <Provider store={store}>
            <App />
        </Provider>
    </IntlProvider>,
    document.getElementById('container')
);