import {Size} from '@/shared/style/size';
import React, {PropsWithoutRef, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import TextMain from '../text/TextMain';
import img from '@/assets';
const {close} = img;

type ModalHalfScreenProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  children: ReactNode;
  title: string;
};
const style = StyleSheet.create({
  Modal: {
    margin: heightPercentageToDP('0%'),
  },
  ModalViewContent: {
    justifyContent: 'flex-end',
    height: heightPercentageToDP('100%'),
    width: '100%',
  },
  Box: {
    maxHeight: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: Size.size10,
    borderTopRightRadius: Size.size10,
  },
  SafeViewBox: {
    maxHeight: '100%',
  },
  ContentBox: {
    margin: Size.size16,
    rowGap: Size.size16,
  },
  CloseBox: {
    height: Size.size24,
    width: Size.size24,
  },
  CloseContaniner: {
    alignItems: 'flex-end',
  },
});

export default function ModalHalfScreen({
  isVisible,
  setIsVisible,
  children,
  title,
}: Readonly<PropsWithoutRef<ModalHalfScreenProps>>) {
  return (
    <Modal isVisible={isVisible} style={style.Modal}>
      <View style={style.ModalViewContent}>
        <View style={style.Box}>
          <SafeAreaView style={style.SafeViewBox}>
            <View style={style.ContentBox}>
              <View style={style.CloseContaniner}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Image source={close} style={style.CloseBox} />
                </TouchableOpacity>
              </View>
              <TextMain
                title={title}
                textAlign="center"
                fontWeight="bold"
                fontSize="font18"
              />
              {children}
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}
