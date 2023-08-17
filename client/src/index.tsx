import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './app/router/Routes';
import { store } from './app/store/configureStore';
import { fetchProductsAsync } from './features/catalog/catalogSlice';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(fetchProductsAsync());

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
