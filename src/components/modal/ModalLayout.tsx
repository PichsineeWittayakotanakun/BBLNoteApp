import {Size} from '@/shared/style/size';
import React, {PropsWithoutRef, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type ModalMainProps = {
  children: ReactNode;
  isVisible: boolean;
  paddingHorizontal?: number;
  onModalHideFunction?: () => void;
};

const style = StyleSheet.create({
  ModalPopUpView: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Size.size8,
    marginHorizontal: Size.size24,
    padding: Size.size16,
    rowGap: Size.size16,
  },
  MarginZero: {
    margin: heightPercentageToDP('0%'),
  },
});

export default function ModalMain({
  isVisible,
  children,
  onModalHideFunction,
}: PropsWithoutRef<ModalMainProps>) {
  return (
    <Modal
      isVisible={isVisible}
      style={style.MarginZero}
      avoidKeyboard
      onModalHide={() => onModalHideFunction && onModalHideFunction()}>
      <View style={style.ModalPopUpView}>{children}</View>
    </Modal>
  );
}
