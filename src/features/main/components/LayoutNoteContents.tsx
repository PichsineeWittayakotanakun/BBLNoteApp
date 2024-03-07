import React from 'react';
import {View, StyleSheet} from 'react-native';
import component from '@/components';
import {Size} from '@/shared/style/size';
import {NoteItem} from '@/model/response_body/notes/getAllNotesResponseBody';
import {useAtomValue, useSetAtom} from 'jotai';
import headerAtomService from '@/atoms/headerAtomService';
import deleteNoteByIdAtomService from '@/atoms/notes/deleteNoteByIdAtomService';

const {TextMain, LineBreak, ButtonDelete} = component;

type LayoutNoteContentsProps = {
  item: NoteItem;
};
const style = StyleSheet.create({
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BinContainer: {
    flex: Size.sizepoint1,
  },
  ContentBox: {
    rowGap: Size.size8,
  },
});

export default function LayoutNoteContents({
  item,
}: Readonly<LayoutNoteContentsProps>) {
  const {body, title, id} = item;

  const header = useAtomValue(headerAtomService.header);
  const fetchDeleteNote = useSetAtom(deleteNoteByIdAtomService.fetchData);
  const isLoadDeleteNote = useAtomValue(deleteNoteByIdAtomService.isLoading);
  const isErrorDeleteNote = useAtomValue(deleteNoteByIdAtomService.isError);

  const onConfirmDelete = () => {
    const controller = new AbortController();
    fetchDeleteNote(controller.signal, header, id, false).catch(error => {
      console.error('Error onConfirmDelete LayoutNoteContents', error);
    });

    return () => controller.abort();
  };

  return (
    <View style={style.ContentBox}>
      <View style={style.TitleContainer}>
        <View style={style.TitleContainer}>
          <TextMain title={title} fontSize="font24" fontWeight="bold" />
        </View>
        <View style={style.BinContainer}>
          <ButtonDelete
            onConfirmDelete={onConfirmDelete}
            isLoadDelete={isLoadDeleteNote}
            isDeleteError={isErrorDeleteNote}
          />
        </View>
      </View>
      <LineBreak color="primary" />
      <TextMain title={body} />
    </View>
  );
}
