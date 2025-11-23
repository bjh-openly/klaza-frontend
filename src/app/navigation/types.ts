import { NavigatorScreenParams } from '@react-navigation/native';
import { ROUTES, TABS } from '../config/constants';

export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.AUTH]: NavigatorScreenParams<AuthStackParamList> | undefined;
  [ROUTES.MAIN]: NavigatorScreenParams<MainTabParamList> | undefined;
  [ROUTES.MY_PAGE]: undefined;
};

export type OnboardingStackParamList = {
  [ROUTES.ONBOARDING_WELCOME]: undefined;
  [ROUTES.ONBOARDING_NEXT]: undefined;
};

export type AuthStackParamList = {
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.FORGOT_ID]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.SIGN_UP_TERMS]: undefined;
  [ROUTES.SIGN_UP_ID]: undefined;
  [ROUTES.SIGN_UP_PASSWORD]: undefined;
  [ROUTES.SIGN_UP_EMAIL]: undefined;
  [ROUTES.SIGN_UP_EMAIL_CODE]: undefined;
  [ROUTES.SIGN_UP_COUNTRY]: undefined;
  [ROUTES.SIGN_UP_BIRTH]: undefined;
  [ROUTES.SIGN_UP_FAVORITES]: undefined;
  [ROUTES.SIGN_UP_DONE]: undefined;
};

export type HomeStackParamList = {
  [ROUTES.HOME_INTRO]: undefined;
};

export type MainTabParamList = {
  [TABS.HOME]: NavigatorScreenParams<HomeStackParamList> | undefined;
  [TABS.LOUNGE]: NavigatorScreenParams<LoungeStackParamList> | undefined;
  [TABS.EVENTS]: undefined;
  [TABS.CLAN]: undefined;
};

export type LoungeStackParamList = {
  [ROUTES.LOUNGE]: undefined;
  [ROUTES.LOUNGE_DETAIL]: { item: import('../services/klazaApi').KlazaSearchItem };
};

export type ClanStackParamList = {
  [ROUTES.CLAN]: undefined;
  [ROUTES.CLAN_DETAIL]: { clanId: string } | undefined;
  [ROUTES.CLAN_POST_LIST]: { clanId: string } | undefined;
  [ROUTES.CLAN_POST_DETAIL]: { postId: string } | undefined;
  [ROUTES.CLAN_POST_CREATE]: { clanId?: string } | undefined;
};

export type EventsStackParamList = {
  [ROUTES.EVENTS]: undefined;
  [ROUTES.POLL_DETAIL]: { pollId: string } | undefined;
  [ROUTES.RAFFLE_DETAIL]: { raffleId: string } | undefined;
};

export type MyStackParamList = {
  [ROUTES.MY_PAGE]: undefined;
};
