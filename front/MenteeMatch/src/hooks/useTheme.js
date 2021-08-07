import { useEffect, useState } from 'react';
import { storeData } from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setReduxTheme } from '../redux/Reducers/themeReducer';

const useTheme = () => {
  const { theme } = useSelector(state => state);
  const [hookTheme, setHookTheme] = useState(theme);
  const [isEnabled, setIsEnabled] = useState(theme === 'dark');
  const dispatch = useDispatch();

  useEffect(() => {
    setHookTheme(previousState => (isEnabled ? 'dark' : 'ligth'));
  }, [isEnabled, theme]);

  useEffect(() => {
    storeData('menteeTheme', hookTheme).then(() =>
      dispatch(setReduxTheme(hookTheme)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hookTheme]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return { isEnabled, toggleSwitch };
};

export default useTheme;
