import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {HomeScreen} from './Home';
/* PLOP_INJECT_IMPORT */

export type CommonStackParamList = {
  Home: undefined;
  /* PLOP_INJECT_TYPE */
};

const options: NativeStackNavigationOptions = {gestureEnabled: false};

const commonScreens = {
  Home: {
    component: HomeScreen,
    options: {
      ...options,
    } as NativeStackNavigationOptions,
  },
  /* PLOP_INJECT_SCREEN */
};

export default commonScreens;
