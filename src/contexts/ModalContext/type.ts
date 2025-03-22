export type ModalContextProps = {
  openModal: (modal: { name: string; props?: unknown|undefined }) => void;
  closeModal: () => void;
};