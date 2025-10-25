import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomIcon from '../components/CustomIcon';

import {NavigationParamList} from '../types';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../context/ThemeContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import MemoryScreen from '../screens/MemoryScreen';

const Stack = createStackNavigator<NavigationParamList>();
const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: string;

  if (routeName === 'Chat') {
    iconName = 'chat-bubble';
  } else if (routeName === 'Memory') {
    iconName = 'brain';
  } else {
    iconName = 'home';
  }

  return <CustomIcon name={iconName} size={size} color={color} />;
};

const MainTabNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          elevation: 8,
          shadowColor: '#2E2E2C',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Memory"
        component={MemoryScreen}
        options={{
          title: 'Memory',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {user} = useAuthStore();

  console.log('AppNavigator - Current user:', user);
  console.log('AppNavigator - User exists:', !!user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
