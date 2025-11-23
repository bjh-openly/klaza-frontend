import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../src/app/store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn()),
  },
}));

jest.mock('../src/app/theme', () => ({ theme: {} }));

jest.mock('../src/app/navigation/RootNavigator', () => {
  const React = require('react');
  return () => React.createElement('RootNavigator');
});

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({ children }) => React.createElement(React.Fragment, null, children),
  };
}, { virtual: true });

jest.mock('react-redux', () => {
  const React = require('react');
  return {
    Provider: ({ children }) => React.createElement(React.Fragment, null, children),
    useDispatch: jest.fn(() => jest.fn()),
    useSelector: jest.fn(),
  };
}, { virtual: true });

jest.mock('react-native-paper', () => {
  const React = require('react');
  return {
    Provider: ({ children }) => React.createElement(React.Fragment, null, children),
    Text: ({ children }) => React.createElement(React.Fragment, null, children),
  };
}, { virtual: true });

jest.mock('react-native-gesture-handler', () => ({}), { virtual: true });

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toBeTruthy();
  });
});
