import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import component from '@/components';
import {useAtomValue, useSetAtom} from 'jotai';
import getProfileAtomService from '@/atoms/profile/getProfileAtomService';
import {Size} from '@/shared/style/size';
import {Colors} from '@/shared/style/colors';
import {useAuth0} from 'react-native-auth0';
import headerAtomService from '@/atoms/headerAtomService';
import resetAllDataToInitialStateAtomService from '@/atoms/reset/resetAllDataToInitialStateAtomService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/route/RootStackParamList';

const {TextMain, ModalLayout, ButtonMain} = component;
type LayoutProflieProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home', undefined>;
};
const style = StyleSheet.create({
  ContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Size.size24,
  },
  NameBox: {
    flex: Size.size6,
  },
  Image: {
    width: Size.size44,
    height: Size.size44,
    borderRadius: Size.size50,
  },
  ImageContainer: {
    borderRadius: Size.size50,
    shadowColor: Colors.primary,
    shadowOffset: {width: Size.size2, height: Size.size3},
    shadowRadius: Size.size8,
    shadowOpacity: Size.sizeShadowOpacityProfile,
    elevation: Size.size10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileContainer: {
    alignItems: 'center',
  },
  ProfileImageBox: {
    height: Size.size44,
    width: Size.size44,
  },
});

export default function LayoutProflie({
  navigation,
}: Readonly<LayoutProflieProps>) {
  const {nickname, picture, id, name, email} = useAtomValue(
    getProfileAtomService.response,
  );
  const setHeader = useSetAtom(headerAtomService.setHeader);
  const fetchReset = useSetAtom(
    resetAllDataToInitialStateAtomService.fetchData,
  );
  const isResetError = useAtomValue(
    resetAllDataToInitialStateAtomService.isError,
  );
  const header = useAtomValue(headerAtomService.header);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isGoToRoot, setIsGoToRoot] = useState<boolean>(false);

  const {clearSession} = useAuth0();

  const alertError = () => Alert.alert('Can not Log out, Please try again!');

  const onResetAllDataToInitial = useCallback(async () => {
    const controller = new AbortController();
    fetchReset(controller.signal, header, false)
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        console.error('Error onHandleCreateContent Note', error);
        alertError();
      })
      .finally(() => {
        if (isResetError) {
          alertError();
        } else {
          onClearSession();
        }
      });

    return () => controller.abort();
  }, []);
  const onClearSession = async () => {
    setIsGoToRoot(false);
    try {
      await clearSession();
      await setHeader('');
      setIsGoToRoot(true);
    } catch (e) {
      console.log('error logout', e);
      Alert.alert('Unable to clear session from Auth0');
      setIsGoToRoot(true);
    }
  };

  useEffect(() => {
    if (isGoToRoot) {
      // set delay because when clear session from Auth0 and catch error then navigaet to root make app crash
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        });
      }, 1000);
    }
  });
  return (
    <View style={style.ContentBox}>
      <View style={style.NameBox}>
        <TextMain title="Welcome!" fontWeight="bold" fontSize="font24" />
        <TextMain title={nickname} fontWeight="bold" fontSize="font18" />
      </View>
      <TouchableOpacity
        style={style.ImageContainer}
        onPress={() => setIsVisible(true)}>
        <Image
          source={{uri: picture}}
          style={style.Image}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <ModalLayout isVisible={isVisible}>
        <TextMain
          title="Profile Details"
          fontSize="font24"
          fontWeight="bold"
          textAlign="center"
        />
        <View style={style.ProfileContainer}>
          <Image source={{uri: picture}} style={style.ProfileImageBox} />
        </View>
        <TextMain title={`Name : ${name}`} fontSize="font16" />
        <TextMain title={`Nickname : ${nickname}`} fontSize="font16" />
        <TextMain title={`Email : ${email}`} fontSize="font16" />
        <ButtonMain
          title="Close"
          onPress={() => setIsVisible(false)}
          padding={8}
        />
        <TextMain
          title="Click here to Logout!"
          fontSize="font12"
          fontColor="grey_2"
          textDecorationLine="underline"
          textAlign="center"
          onPress={() => {
            setIsVisible(false);
            onResetAllDataToInitial();
          }}
        />
      </ModalLayout>
    </View>
  );
}
