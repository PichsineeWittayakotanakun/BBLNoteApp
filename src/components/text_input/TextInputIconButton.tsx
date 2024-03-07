import React, {ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {TextInput} from 'react-native-paper';

type TextInputIconProps = TouchableOpacityProps & {
  children: ReactNode;
};

export default function TextInputIconButton({
  children,
  ...props
}: TextInputIconProps) {
  function iconImage() {
    return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
  }
  return <TextInput.Icon icon={() => iconImage()} />;
}
