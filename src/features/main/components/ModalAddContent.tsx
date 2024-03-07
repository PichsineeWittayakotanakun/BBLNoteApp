import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import component from '@/components';

import {Size} from '@/shared/style/size';
import {Colors} from '@/shared/style/colors';
import {CreateNewNoteRequest} from '@/model/request_body/notes/createNewNoteRequestBody';
import {height} from '@/shared/style/layoutSize';
import {FontSize} from '@/shared/style/fontSize';
const {ModalHalfScreen, TextInputMain, ButtonWithValidation} = component;

type ModalAddContentProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  title: string;
  onHandleCreateContent: ({title, body}: {title: string; body: string}) => void;
};
const style = StyleSheet.create({
  MultiBox: {
    borderColor: Colors.secondary,
    borderWidth: Size.size1,
    padding: Size.size16,
    height: height / Size.size4,
    color: Colors.primary,
    fontSize: FontSize.font16,
    borderRadius: Size.size8,
  },
});

export default function ModalAddContent({
  isVisible,
  setIsVisible,
  title,
  onHandleCreateContent,
}: Readonly<ModalAddContentProps>) {
  const [value, setValue] = useState<CreateNewNoteRequest>({
    title: '',
    body: '',
  });

  const onChangeTextInput = (
    key: keyof CreateNewNoteRequest,
    value: string,
  ) => {
    setValue(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onCreate = () => {
    onHandleCreateContent({title: value.title, body: value.body});
    setValue({
      title: '',
      body: '',
    });
  };

  return (
    <ModalHalfScreen
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={title}>
      <TextInputMain
        textInputDescription={'Title'}
        textInputValue={value.title}
        placeholder="Title"
        onChangeText={text => onChangeTextInput('title', text)}
      />
      <TextInput
        style={style.MultiBox}
        placeholder="Content..."
        placeholderTextColor={Colors.secondary}
        onChangeText={text => onChangeTextInput('body', text)}
        value={value.body}
        multiline
      />
      <ButtonWithValidation
        validate={value.body.length > 0 && value.title.length > 0}
        title={'Create'}
        onPress={() => onCreate()}
      />
    </ModalHalfScreen>
  );
}
