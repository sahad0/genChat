import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import CustomIcon from '../components/CustomIcon';

import {NavigationParamList} from '../types';
import {useAuthStore} from '../store/authStore';

// Screens
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import MemoryScreen from '../screens/MemoryScreen';
import MessageInputScreen from '../screens/MessageInputScreen';

const Stack = createStackNavigator<NavigationParamList>();
const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}>
            <Animated.View
              style={[styles.tabContent, isFocused && styles.activeTab]}>
              <CustomIcon
                name={route.name === 'Chat' ? 'chat-bubble' : 'brain'}
                size={24}
                color={isFocused ? '#2E2E2C' : '#5D5C5B'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {color: isFocused ? '#2E2E2C' : '#5D5C5B'},
                ]}>
                {label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
      }}>
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
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="MessageInput"
              component={MessageInputScreen}
              options={{
                presentation: 'transparentModal',
                headerShown: false,
                cardStyle: {backgroundColor: 'transparent'},
                cardStyleInterpolator: ({current, layouts}) => {
                  return {
                    cardStyle: {
                      backgroundColor: 'transparent',
                      transform: [
                        {
                          translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                          }),
                        },
                      ],
                    },
                  };
                },
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FBFAF0',
    borderTopWidth: 1,
    borderTopColor: '#EDECE3',
    paddingBottom: 12,
    paddingTop: 12,
    height: 70,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 80,
  },
  activeTab: {
    backgroundColor: 'rgba(46, 46, 44, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(46, 46, 44, 0.2)',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

export default AppNavigator;
