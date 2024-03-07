import React, {useState} from 'react';
import component from '@/components';
const {ModalHalfScreen, ButtonWithValidation, TextInputMultiline} = component;

type ModalNewCommentProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  title: string;
  onHandleCreateContent: ({body}: {body: string}) => void;
};

export default function ModalNewComment({
  isVisible,
  setIsVisible,
  title,
  onHandleCreateContent,
}: Readonly<ModalNewCommentProps>) {
  const [body, setBody] = useState<string>('');

  const onChangeTextInput = (value: string) => {
    setBody(value);
  };

  const onCreate = () => {
    onHandleCreateContent({body});
    setBody('');
  };

  return (
    <ModalHalfScreen
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={title}>
      <TextInputMultiline
        value={body}
        onChangeText={onChangeTextInput}
        placeholder={'Comment...'}
      />
      <ButtonWithValidation
        validate={body.length > 0}
        title={'Create'}
        onPress={() => onCreate()}
      />
    </ModalHalfScreen>
  );
}
