import React, {PropsWithoutRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Size} from '@/shared/style/size';
import {Colors} from '@/shared/style/colors';
import {height} from '@/shared/style/layoutSize';
import {FontSize} from '@/shared/style/fontSize';

type ModalAddContentProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};
const style = StyleSheet.create({
  MultiBox: {
    borderColor: Colors.secondary,
    borderWidth: Size.size1,
    padding: Size.size16,
    height: height / Size.size4,
    color: Colors.primary,
    fontSize: FontSize.font16,
    borderRadius: Size.size8,
  },
});

export default function TextInputMultiline({
  placeholder = 'Content...',
  onChangeText,
  value,
}: Readonly<PropsWithoutRef<ModalAddContentProps>>) {
  return (
    <TextInput
      style={style.MultiBox}
      placeholder={placeholder}
      placeholderTextColor={Colors.secondary}
      onChangeText={text => onChangeText(text)}
      value={value}
      multiline
    />
  );
}
