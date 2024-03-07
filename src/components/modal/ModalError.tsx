import React, {PropsWithoutRef} from 'react';
import ModalLayout from './ModalLayout';
import ButtonMain from '../button/ButtonMain';
import TextMain from '../text/TextMain';

type ModalErrorProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  title?: string;
  description?: string;
};

export default function ModalError({
  isVisible,
  setIsVisible,
  title = 'Unable to Proceed',
  description,
}: Readonly<PropsWithoutRef<ModalErrorProps>>) {
  return (
    <ModalLayout isVisible={isVisible}>
      <TextMain
        title={title}
        fontWeight="bold"
        textAlign="center"
        fontSize="font24"
      />
      {description && (
        <TextMain
          title={description}
          textAlign="center"
          fontSize="font16"
          fontColor="grey_2"
        />
      )}
      <ButtonMain
        onPress={() => setIsVisible(false)}
        fontSize="font16"
        title="Close"
        padding={8}
      />
    </ModalLayout>
  );
}
