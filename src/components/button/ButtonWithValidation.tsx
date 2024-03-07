import React, {PropsWithoutRef} from 'react';
import {StyleProp, TouchableOpacityProps, ViewStyle} from 'react-native';
import {ColorType, Colors} from '@/shared/style/colors';

import {FontSizeType} from '@/shared/style/fontSize';
import ButtonMain from './ButtonMain';
import {Size} from '@/shared/style/size';

type ButtonProps = TouchableOpacityProps & {
  validate: boolean;
  title: string;
  styles?: StyleProp<ViewStyle>[];
  padding?: number;

  backgroundColor?: ColorType;
  borderColor?: ColorType;
  borderRadius?: number;
};

export default function ButtonWithValidation({
  validate,
  title,
  backgroundColor = 'grey_1',
  borderColor = 'grey_1',
  borderRadius = Size.size50,
  ...props
}: PropsWithoutRef<ButtonProps>) {
  function getComponent() {
    if (validate) {
      return <ButtonMain {...props} title={title} padding={16} />;
    }
    return (
      <ButtonMain
        {...props}
        disabled
        backgroundColor="grey_4"
        borderColor="grey_4"
        fontColor="grey_3"
        title={title}
        padding={16}
      />
    );
  }
  return <>{getComponent()}</>;
}
