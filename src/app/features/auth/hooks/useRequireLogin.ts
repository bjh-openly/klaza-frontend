import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../config/constants';
import { useAppSelector } from '../../../store/hooks';
import { LoginRedirectTarget } from '../../../navigation/types';

const useRequireLogin = () => {
  const navigation = useNavigation<any>();
  const isLoggedIn = Boolean(useAppSelector((state) => state.auth.accessToken));

  return (redirect: LoginRedirectTarget, extraParams?: object) => {
    if (!isLoggedIn) {
      navigation.navigate(ROUTES.AUTH as never, {
        screen: ROUTES.AUTH_GATE,
        params: { redirect, extraParams },
      });
      return false;
    }
    return true;
  };
};

export default useRequireLogin;
