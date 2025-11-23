import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onCloseToRoot?: boolean;
}

const ModalCloseHeader: React.FC<Props> = ({ onCloseToRoot = false }) => {
  const navigation = useNavigation<any>();

  const handleClose = () => {
    if (onCloseToRoot) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' as never }],
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClose} hitSlop={12}>
        <MaterialCommunityIcons name="close" size={24} color="#F9FAFB" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: 'flex-start',
  },
});

export default ModalCloseHeader;
