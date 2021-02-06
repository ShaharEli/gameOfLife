import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import {SlotProps} from '../../types';

export default function slot({selected, onPress}: SlotProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
    />
  );
}
