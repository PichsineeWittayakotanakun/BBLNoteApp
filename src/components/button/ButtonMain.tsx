import React, {PropsWithRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {FontSizeType} from '@/shared/style/fontSize';
import {ColorType, Colors} from '@/shared/style/colors';
import TextMain from '../text/TextMain';
import {Size} from '@/shared/style/size';

type TouchableOpacityType = TouchableOpacityProps & {
  backgroundColor?: ColorType;
  borderColor?: ColorType;
  borderRadius?: number;
  fontColor?: ColorType;
  fontSize?: FontSizeType;
  padding?: number;
  styles?: StyleProp<ViewStyle>[];
  title: string;
};

const style = StyleSheet.create({
  Container: {
    flex: Size.size1,
  },
  Button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextCenter: {
    textAlign: 'center',
  },
});

export default function ButtonMain({
  backgroundColor = 'grey_1',
  borderColor = 'grey_1',
  borderRadius = Size.size50,
  fontColor = 'white',
  fontSize = 'font18',
  padding = Size.size1,
  styles = [],
  title = '',
  ...props
}: PropsWithRef<TouchableOpacityType>) {
  function getTouchableOpacityStyles() {
    return {
      backgroundColor: Colors[backgroundColor],
      borderColor: Colors[borderColor],
      borderWidth: Size.size1,
      borderRadius,
      padding: padding,
    };
  }

  return (
    <TouchableOpacity
      style={[getTouchableOpacityStyles(), style.Button]}
      {...props}>
      <View style={style.Container}>
        <TextMain
          title={title}
          fontColor={fontColor}
          fontSize={fontSize}
          textAlign="center"
        />
      </View>
    </TouchableOpacity>
  );
}
