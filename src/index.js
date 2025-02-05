import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import 'core-js'
import { ToastContainer } from 'react-toastify'
import "@fontsource/poppins";
import App from './App'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Loading screen while state is rehydrated */}
      <App />
    </PersistGate>
    <ToastContainer />
  </Provider>,
)
