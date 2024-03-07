import {ViewStyle, StyleProp, StyleSheet} from 'react-native';
import React, {PropsWithoutRef} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {FontSize} from '@/shared/style/fontSize';
import {Colors} from '@/shared/style/colors';
import TextMain from '../text/TextMain';
import {Size} from '@/shared/style/size';

type TextInputType = TextInputProps & {
  textInputDescription: string;
  textInputValue: string;
  required?: boolean;
  styles?: StyleProp<ViewStyle>[];
  keyboardType?: string;
};

const style = StyleSheet.create({
  TextInputContainer: {
    backgroundColor: Colors.transparent,
    borderTopStartRadius: Size.size8,
    borderTopEndRadius: Size.size8,
    borderRadius: Size.size8,
    borderColor: Colors.secondary,
    borderWidth: Size.size1,
  },
  TextValid: {
    color: Colors.primary,
    fontSize: FontSize.font16,
  },
});

export default function TextInputMain({
  required,
  styles = [],
  textInputDescription = '',
  textInputValue = '',
  autoCapitalize = 'none',
  placeholder = '',
  placeholderTextColor = Colors.secondary,
  keyboardType = 'default',
  maxLength = undefined,
  numberOfLines = 1,
  secureTextEntry = false,
  disabled,
  // Other TextInputType props
  ...props
}: PropsWithoutRef<TextInputType>) {
  return (
    <TextInput
      autoCapitalize={autoCapitalize}
      style={style.TextInputContainer}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      maxLength={maxLength}
      value={textInputValue}
      contentStyle={style.TextValid}
      underlineStyle={[{backgroundColor: Colors.transparent}]}
      secureTextEntry={secureTextEntry}
      label={
        <TextMain
          title={textInputDescription}
          fontColor="grey_1"
          fontSize="font16"
        />
      }
      {...props}
    />
  );
}
