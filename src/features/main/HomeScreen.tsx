import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import components from '@/components';
import LayoutProflie from './components/LayoutProflie';
import {Size} from '@/shared/style/size';
import {DefaultNavigationProps} from '@/route/RootStackParamList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NoteItem} from '@/model/response_body/notes/getAllNotesResponseBody';
import {useAtomValue, useSetAtom} from 'jotai';
import headerAtomService from '@/atoms/headerAtomService';
import LayoutNoteDetails from './components/LayoutNoteDetails';
import getAllNotesAtomService from '@/atoms/notes/getAllNotesAtomService';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CreateNewNoteRequest} from '@/model/request_body/notes/createNewNoteRequestBody';
import createNewNoteAtomService from '@/atoms/notes/createNewNoteAtomService';
import ModalAddContent from './components/ModalAddContent';
import img from '@/assets';

const {LayoutMain, TextMain, ScrollViewMain} = components;
const {add} = img;
type MainProps = DefaultNavigationProps<'Home'>;
const style = StyleSheet.create({
  ContentBox: {
    rowGap: Size.size4,
    flex: Size.size1,
  },
  ListBox: {
    rowGap: Size.size16,
    marginBottom: Size.size16,
  },
  IconBox: {
    height: Size.size64,
    width: Size.size64,
  },
  CreateBox: {
    position: 'absolute',
    bottom: Size.size16,
    right: Size.size16,
  },
});

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<MainProps['navigation']>();
  const header = useAtomValue(headerAtomService.header);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchAllNote = useSetAtom(getAllNotesAtomService.fetchData);
  const responseAllNote = useAtomValue(getAllNotesAtomService.response);

  const fetchCreatNote = useSetAtom(createNewNoteAtomService.fetchData);
  const isErrorCreatNote = useAtomValue(createNewNoteAtomService.isError);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onGetAllNote = useCallback(() => {
    setRefreshing(true);
    const controller = new AbortController();
    fetchAllNote(controller.signal, header, false)
      .catch(error => {
        console.error('Error onGetAllNote FormLogin', error);
      })
      .finally(() => {
        setRefreshing(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isFocused) {
      onGetAllNote();
    }
  }, [isFocused]);

  const alertError = () => Alert.alert(`Can not create note\nPlease try again`);

  const onHandleCreateContent = ({title, body}) => {
    const bodyCreate: CreateNewNoteRequest = {
      title,
      body,
    };
    const controller = new AbortController();
    fetchCreatNote(controller.signal, header, bodyCreate, false)
      .catch(error => {
        console.error('Error onHandleCreateContent Note', error);
        alertError();
      })
      .finally(() => {
        if (isErrorCreatNote) {
          alertError();
        } else {
          setIsVisible(false);
          onGetAllNote();
        }
      });

    return () => controller.abort();
  };

  const onPressItem = (item: NoteItem) => {
    navigation.navigate('Note', {noteItem: item});
  };

  return (
    <LayoutMain scrollEnabled={false} marginHorizontal="size0">
      <LayoutProflie navigation={navigation} />
      {/* Note Content */}
      <View style={style.ContentBox}>
        <ScrollViewMain
          alwaysBounceVertical
          bounces
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onGetAllNote}
              tintColor={Colors.white}
            />
          }>
          <View style={style.ListBox}>
            {responseAllNote.map((item, index) => (
              <LayoutNoteDetails
                item={item}
                index={index}
                key={item.id}
                onPressItem={onPressItem}
              />
            ))}
          </View>
        </ScrollViewMain>
      </View>
      {/* Create Note button */}
      <>
        <View style={style.CreateBox}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image source={add} style={style.IconBox} />
          </TouchableOpacity>
        </View>
        <ModalAddContent
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          title="Create Note!"
          onHandleCreateContent={onHandleCreateContent}
        />
      </>
    </LayoutMain>
  );
}
