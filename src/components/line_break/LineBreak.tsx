import React, {PropsWithoutRef} from 'react';
import {View} from 'react-native';

import {ColorType, Colors} from '@/shared/style/colors';
import {Size} from '@/shared/style/size';

type LineBreakProps = {
  color?: ColorType;
};

export default function LineBreak({
  color = 'grey_1',
}: PropsWithoutRef<LineBreakProps>) {
  return (
    <View style={{borderColor: Colors[color], borderTopWidth: Size.size1}} />
  );
}
