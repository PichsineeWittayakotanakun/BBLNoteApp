import {Size} from '@/shared/style/size';
import React, {ReactNode, PropsWithoutRef} from 'react';
import {
  ScrollView,
  StyleProp,
  ViewStyle,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';

type ScrollViewType = ScrollViewProps & {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>[];
};

const style = StyleSheet.create({
  contentContainer: {flexGrow: Size.size1},
});

export default function ScrollViewMain({
  children,
  styles = [],
  // ScrollView props with defaults
  showsVerticalScrollIndicator = false,
  alwaysBounceVertical = false,
  alwaysBounceHorizontal = false,
  bounces = false,
  overScrollMode = 'never',
  keyboardShouldPersistTaps = 'handled',

  // Other ScrollView props
  ...props
}: PropsWithoutRef<ScrollViewType>) {
  return (
    <ScrollView
      style={[...styles]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      alwaysBounceVertical={alwaysBounceVertical}
      alwaysBounceHorizontal={alwaysBounceHorizontal}
      bounces={bounces}
      overScrollMode={overScrollMode}
      contentContainerStyle={style.contentContainer}
      nestedScrollEnabled
      {...props}>
      {children}
    </ScrollView>
  );
}
