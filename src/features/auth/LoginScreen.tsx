import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import components from '@/components';
import img from '@/assets';
import FormLogin from './components/FormLogin';
import {Size} from '@/shared/style/size';

const {LayoutMain, TextMain} = components;
const {loginImage} = img;
const style = StyleSheet.create({
  LogoBox: {
    marginTop: Size.size16,
    rowGap: Size.size16,
  },
  ImageBox: {
    alignSelf: 'center',
  },
});

export default function LoginScreen() {
  return (
    <LayoutMain>
      <View style={style.LogoBox}>
        <Image source={loginImage} style={style.ImageBox} />
        <TextMain
          title="BBL NoteApp!"
          textAlign="center"
          fontSize="font24"
          fontWeight="bold"
        />
      </View>
      <FormLogin />
    </LayoutMain>
  );
}
