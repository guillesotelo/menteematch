import { useSelector } from 'react-redux';
import { globantBright, globantDark } from '../assets/styles/colors';

const useMode = () => {
  const { theme } = useSelector(state => state);
  const mode = theme === 'ligth' ? globantBright : globantDark;

  return { mode };
};

export default useMode;
