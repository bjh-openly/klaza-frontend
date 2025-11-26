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
  [ROUTES.AUTH_GATE]: undefined;
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.FORGOT_ID]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.SIGN_UP_TERMS]: undefined;
  [ROUTES.SIGN_UP_ID]: { termsAgreed1: boolean; termsAgreed2: boolean };
  [ROUTES.SIGN_UP_PASSWORD]: { termsAgreed1: boolean; termsAgreed2: boolean; id: string };
  [ROUTES.SIGN_UP_EMAIL]: { termsAgreed1: boolean; termsAgreed2: boolean; id: string; password: string };
  [ROUTES.SIGN_UP_EMAIL_CODE]: {
    termsAgreed1: boolean;
    termsAgreed2: boolean;
    id: string;
    password: string;
    email: string;
    emailVerifySeq?: number;
  };
  [ROUTES.SIGN_UP_COUNTRY]: {
    termsAgreed1: boolean;
    termsAgreed2: boolean;
    id: string;
    password: string;
    email: string;
    emailVerifySeq: number;
  };
  [ROUTES.SIGN_UP_BIRTH]: {
    termsAgreed1: boolean;
    termsAgreed2: boolean;
    id: string;
    password: string;
    email: string;
    emailVerifySeq: number;
    country: string;
  };
  [ROUTES.SIGN_UP_FAVORITES]: {
    termsAgreed1: boolean;
    termsAgreed2: boolean;
    id: string;
    password: string;
    email: string;
    emailVerifySeq: number;
    country: string;
    birthDt: string;
    gender: 'FEMALE' | 'MALE' | 'UNKNOWN';
  };
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
