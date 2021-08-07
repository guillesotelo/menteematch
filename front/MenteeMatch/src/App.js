import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import store from './redux/store';
import { Appearance } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from './redux/Slices/authSlice';
import { getData } from './utils/storage';
import { HomeApp, LoginApp } from './navigation';
import { setUser } from './redux/Reducers/UserReducer';
import { setReduxTheme } from './redux/Reducers/themeReducer';
import { MenuProvider } from 'react-native-popup-menu';
import { LogBox } from 'react-native';

const AppWrapper = () => (
  <MenuProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MenuProvider>
);

const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    const checkIfStoragedUser = async () => {
      try {
        const [user, theme] = await Promise.all([
          getData('user'),
          getData('menteeTheme'),
        ]);
        user && dispatch(setUser(user));
        user && dispatch(restoreToken({ token: user.token }));
        theme && dispatch(setReduxTheme(theme || colorScheme));
      } catch (e) {
        console.log(e);
      }
    };
    checkIfStoragedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.userToken]);

  /* Vieja forma de deshabilitar logs amarillos -> console.disableYellowBox = true; */

  useEffect(() => LogBox.ignoreAllLogs(), []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {auth.userToken ? <HomeApp /> : <LoginApp />}
          <FlashMessage position="top" />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default AppWrapper;
