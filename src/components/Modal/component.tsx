import {Overlay, ModalContent} from './style'
import { ModalProps } from './type';

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        {children}
      </ModalContent>
    </Overlay>
  );
};
