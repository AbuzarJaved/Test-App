import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './App/routes/AppNavigation/AppNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
