import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Size} from '@/shared/style/size';
import img from '@/assets';
import ModalMain from '../modal/ModalLayout';
import TextMain from '../text/TextMain';
import ButtonMain from './ButtonMain';
import LoadIndicator from '../loading/LoadIndicator';
import ModalError from '../modal/ModalError';
import {useNavigation} from '@react-navigation/native';
const {bin} = img;

type ButtonDeleteProps = {
  onConfirmDelete: () => void;
  isLoadDelete: boolean;
  isDeleteError: boolean;
};
const style = StyleSheet.create({
  ButtonContainer: {
    justifyContent: 'center',
  },
  IconBox: {
    height: Size.size24,
    width: Size.size24,
  },
});

export default function ButtonDelete({
  onConfirmDelete,
  isLoadDelete,
  isDeleteError,
}: Readonly<ButtonDeleteProps>) {
  const navigation = useNavigation();
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [modalErrorVisible, setModalErrorVisible] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const onModalDeleteHide = () => {
    if (isDelete) {
      onConfirmDelete();
    }
  };

  const onLoadDeleteProgressHide = () => {
    if (isDeleteError) {
      setModalErrorVisible(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <TouchableOpacity
        style={style.ButtonContainer}
        onPress={() => {
          setIsDelete(false);
          setModalDeleteVisible(true);
        }}>
        <Image source={bin} style={style.IconBox} />
      </TouchableOpacity>
      <ModalMain
        isVisible={modalDeleteVisible}
        onModalHideFunction={onModalDeleteHide}>
        <TextMain
          title="Confirm Delete!"
          textAlign="center"
          fontWeight="bold"
          fontSize="font24"
        />
        <ButtonMain
          title="Cancel"
          padding={8}
          onPress={() => setModalDeleteVisible(false)}
        />
        <ButtonMain
          title="Confirm"
          padding={8}
          backgroundColor="transparent"
          borderColor="grey_1"
          fontColor="grey_1"
          onPress={() => {
            setIsDelete(true);
            setModalDeleteVisible(false);
          }}
        />
      </ModalMain>
      <LoadIndicator
        loadingValue={isLoadDelete}
        onModalHide={onLoadDeleteProgressHide}
      />
      <ModalError
        isVisible={modalErrorVisible}
        setIsVisible={setModalErrorVisible}
        description="Can not delete item, try again!"
      />
    </>
  );
}
