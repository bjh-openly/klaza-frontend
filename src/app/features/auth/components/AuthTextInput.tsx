import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

const AuthTextInput: React.FC<TextInputProps> = (props) => <TextInput mode="outlined" {...props} />;

export default AuthTextInput;
