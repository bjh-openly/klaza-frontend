import React from 'react';
import { Chip } from 'react-native-paper';

interface Props {
  label: string;
}

const TagChip: React.FC<Props> = ({ label }) => <Chip style={{ marginRight: 8 }}>{label}</Chip>;

export default TagChip;
