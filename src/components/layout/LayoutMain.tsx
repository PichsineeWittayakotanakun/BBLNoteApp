import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {PropsWithoutRef, ReactNode} from 'react';
import ScrollViewMain from './ScrollviewMain';
import {ColorType, Colors} from '@/shared/style/colors';
import {Size, SizeType} from '@/shared/style/size';

type LayoutMainProps = {
  children: ReactNode;
  backgroundColor?: ColorType;
  scrollEnabled?: boolean;
  header?: ReactNode;
  marginHorizontal?: SizeType;
  marginTop?: SizeType;
};

const style = StyleSheet.create({
  Container: {
    flex: Size.size1,
  },
  Content: {
    flex: Size.size1,
    rowGap: Size.size24,
  },
});
export default function LayoutMain({
  children,
  backgroundColor = 'white',
  scrollEnabled = true,
  header,
  marginHorizontal = 'size24',
  marginTop = 'size16',
}: Readonly<PropsWithoutRef<LayoutMainProps>>) {
  const content = () => (
    <View
      style={[
        style.Content,
        {marginHorizontal: Size[marginHorizontal], marginTop: Size[marginTop]},
      ]}>
      {children}
    </View>
  );
  return (
    <KeyboardAvoidingView style={style.Container} behavior="padding">
      <SafeAreaView
        style={[style.Container, {backgroundColor: Colors[backgroundColor]}]}>
        {header && <>{header}</>}
        {scrollEnabled ? (
          <ScrollViewMain>{content()}</ScrollViewMain>
        ) : (
          <>{content()}</>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
