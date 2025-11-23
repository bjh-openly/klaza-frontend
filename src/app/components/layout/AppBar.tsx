import React from 'react';
import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
  onBackPress?: () => void;
}

const AppBar: React.FC<Props> = ({ title, onBackPress }) => {
  return (
    <Appbar.Header>
      {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default AppBar;
