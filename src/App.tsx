import React from "react";
import store from "./redux/store";
import {PermissionsAndroid} from 'react-native';
import useEffectOnce from 'react-use/lib/useEffectOnce'

//@ts-ignore
import { Provider } from "react-redux";
import NavigatorTree from "./MainWrapper";

const App = () => {

  const requestPermission = async ()=>{
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
        console.log('You can access the folder');
      } else {
        console.log('Folder permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  useEffectOnce(()=>{
    requestPermission()
  })

  return (
    <Provider store={store}>
      <NavigatorTree />
    </Provider>
  );
};

export default App;