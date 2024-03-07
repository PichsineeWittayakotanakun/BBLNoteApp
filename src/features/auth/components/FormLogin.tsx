import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import components from '@/components';
import {OpenIdConfig} from '@/utils/openIdConfig';
import {authorize} from 'react-native-app-auth';
import {useNavigation} from '@react-navigation/native';
import {DefaultNavigationProps} from '@/route/RootStackParamList';
import {useAtomValue, useSetAtom} from 'jotai';
import getProfileAtomService from '@/atoms/profile/getProfileAtomService';
import headerAtomService from '@/atoms/headerAtomService';
import {Size} from '@/shared/style/size';

const {ButtonWithValidation, LoadIndicator, ModalError} = components;

type LoginProps = DefaultNavigationProps<'Login'>;

const style = StyleSheet.create({
  TextInputBox: {
    rowGap: Size.size16,
  },
  ImageIconBox: {
    height: Size.size24,
    width: Size.size24,
  },
});

export default function FormLogin() {
  const navigation = useNavigation<LoginProps['navigation']>();
  const setHeader = useSetAtom(headerAtomService.setHeader);
  const idToken = useAtomValue(headerAtomService.idToken);
  const fetchProfile = useSetAtom(getProfileAtomService.fetchData);
  const isError = useAtomValue(getProfileAtomService.isError);
  const isLoading = useAtomValue(getProfileAtomService.isLoading);

  const handleAuthorize = useCallback(async () => {
    try {
      const newAuthState = await authorize(OpenIdConfig);
      onGetProfile(newAuthState.idToken);
    } catch {
      Alert.alert('Unable to proceed');
    }
  }, []);

  const onGetProfile = useCallback(
    (idToken: string) => {
      setHeader(idToken).then(res => {
        const controller = new AbortController();
        fetchProfile(controller.signal, res.newHeader, false).catch(error => {
          console.error('Error onGetProfile FormLogin', error);
        });
        return () => controller.abort();
      });
    },
    [idToken],
  );

  const onLoadHide = () => {
    if (isError) {
      Alert.alert(`Unable to get Profile.\nPlease try again!`);
    } else {
      navigation.navigate('MainStack', {screen: 'Home'});
    }
  };

  return (
    <>
      <ButtonWithValidation
        title="Login"
        validate
        onPress={() => handleAuthorize()}
      />
      <LoadIndicator loadingValue={isLoading} onModalHide={onLoadHide} />
    </>
  );
}
