import {Header} from '@features/components/molecules/Header';
import commonScreens, {
  CommonStackParamList,
} from '@features/modules/commonScreens';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './RootNavigation';

type ParamList = CommonStackParamList;

const linking: LinkingOptions<CommonStackParamList> = {
  prefixes: ['HelloWorld://'],
  config: {
    screens: {},
  },
};

const RootStack = createNativeStackNavigator<ParamList>();

/**
 *
 * @returns Router needed for navigation related tasks
 */

export const Router = () => {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <SafeAreaProvider>
        <RootStack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            header: props => <Header {...props} />,
            headerShadowVisible: false,
          }}>
          {Object.entries({
            ...commonScreens,
          }).map(([name, props]) => {
            return (
              <RootStack.Screen
                key={name}
                name={name as keyof ParamList}
                {...props}
              />
            );
          })}
        </RootStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
