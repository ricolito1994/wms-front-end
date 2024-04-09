import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.styles.css';
import './styles/sidenav.styles.css';
import './styles/topnav.styles.css';
import './styles/auth.styles.css';
//import App from './App';
import App from 'app';
import reportWebVitals from './reportWebVitals';
import AppContextProvider from 'context';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate 
      loading={null} 
      persistor={persistor}
    >
      <React.StrictMode>
        <HelmetProvider>
            <AppContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AppContextProvider>
          </HelmetProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
