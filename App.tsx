import {Router} from '@application/navigation/Router';
import {theme} from '@core/theme';
import {persistor, store} from '@store/index';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components/native';

/**
 *
 * @returns entry point of the application with redux store configured and persist gate for persisting the redux state
 */

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
