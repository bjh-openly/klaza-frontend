import React from 'react';
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';

const AppSafeArea: React.FC<ViewProps> = ({ children, style, ...rest }) => {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default AppSafeArea;
