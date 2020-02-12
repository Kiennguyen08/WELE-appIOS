import React from "react";
import store from "./store/store";
import { PermissionsAndroid, Alert } from 'react-native';
import useEffectOnce from 'react-use/lib/useEffectOnce'
import SplashScreen from 'react-native-splash-screen'
//@ts-ignore
import { Provider } from "react-redux";
import NavigatorTree from "./MainWrapper";
import ThemeWrapper from "@store/theme/ThemeWrapper";

import { SafeAreaProvider } from 'react-native-safe-area-context';


console.disableYellowBox = true;
const App = () => {

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Wele Tool Permissions',
          message:
            'Wele Tool App needs access to your Foler ' +
            'so you can play your own playlist.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        Alert.alert('Permssion Error','Folder permission denied');
      }
    } catch (err) {
      Alert.alert('Permission Error',err);
    }
  }
  useEffectOnce(() => {
    //requestPermission()
    SplashScreen.hide()
  })

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeWrapper>
          <NavigatorTree />
        </ThemeWrapper>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
