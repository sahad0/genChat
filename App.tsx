import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';

import {ThemeProvider} from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
        <AppNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
