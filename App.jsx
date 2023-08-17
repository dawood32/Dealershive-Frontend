import React from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </MenuProvider>
  );
};

export default App;
