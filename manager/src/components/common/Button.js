import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, disabled }) => {
  const { buttonStyle, textStyle } = styles(disabled);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled}
    >
      <Text style={textStyle}>
        { children }
      </Text>
    </TouchableOpacity>
  );
};

const styles = (disabled) => {
  const color = disabled ? '#c9c9c9' : '#007aff';
  return {
    textStyle: {
      alignSelf: 'center',
      color: `${color}`,
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10,
    },
    buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: `${color}`,
      marginLeft: 5,
      marginRight: 5,
    },
  };
};

export { Button };
