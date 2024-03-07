import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {PropsWithoutRef, ReactNode} from 'react';
import {Size} from '@/shared/style/size';
import image from '@/assets';
import {useNavigation} from '@react-navigation/native';
import TextMain from '../text/TextMain';
const {chevronBack} = image;
type HeaderMainProps = {
  title?: string;
  icon?: ReactNode;
};
const style = StyleSheet.create({
  Box: {
    marginTop: Size.size8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ButtonBox: {
    height: Size.size32,
    width: Size.size32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBox: {
    height: Size.size32,
    width: Size.size32,
  },
  Container: {
    flex: Size.size1,
    justifyContent: 'center',
  },
});
export default function HeaderMain({
  title,
  icon,
}: Readonly<PropsWithoutRef<HeaderMainProps>>) {
  const navigation = useNavigation();
  return (
    <View style={style.Box}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={style.ButtonBox}>
        <Image source={chevronBack} style={style.ImageBox} />
      </TouchableOpacity>
      <View style={style.Container}>
        <TextMain
          title={title}
          textAlign="center"
          fontWeight="bold"
          fontSize="font18"
        />
      </View>
      <View style={style.ButtonBox}>{icon && icon}</View>
    </View>
  );
}
