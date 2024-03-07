import React, {PropsWithoutRef} from 'react';
import {StyleSheet} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type LoadIndicatorProps = {
  loadingValue: boolean;
  onModalHide: () => void;
};

const style = StyleSheet.create({
  MarginZero: {
    margin: heightPercentageToDP('0%'),
  },
});
export default function LoadIndicator({
  loadingValue,
  onModalHide,
}: Readonly<PropsWithoutRef<LoadIndicatorProps>>) {
  return (
    <Modal
      isVisible={loadingValue}
      style={[style.MarginZero]}
      animationIn="pulse"
      onModalHide={onModalHide}>
      <UIActivityIndicator color="grey" />
    </Modal>
  );
}
