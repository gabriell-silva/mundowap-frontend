import React from "react";
import { ModalContextProps } from "./type";
import Modal from "../../components/Modal/component";
import ModalCreateVisit from "../../components/Modal/CreateVisit/component";
import ModalUpdateVisit from "../../components/Modal/UpdateVisit/component";

export const ModalContext = React.createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalName, setModalName] = React.useState<string | null>(null);
    const [modalProps, setModalProps] = React.useState<Record<string, any>>({});
    const [isOpen, setIsOpen] = React.useState(false);
  
    const openModal = ({ name, props }: { name: string; props?: unknown|undefined }) => {
      setModalName(name);
      setModalProps(props || {});
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setModalName(null);
      setModalProps({});
      setIsOpen(false);
    };

    const modalMap: Record<string, React.FC<any>> = {
      "modal-create-visit": ModalCreateVisit,
      "modal-update-visit": ModalUpdateVisit,
    };
    
    const renderModalContent = () => {
      const ModalComponent = modalMap[modalName ?? ""];
      return ModalComponent ? <ModalComponent {...modalProps} /> : null;
    };
  
    return (
      <ModalContext.Provider value={{ openModal, closeModal }}>
        {children}
        <Modal isOpen={isOpen} onClose={closeModal}>
          {renderModalContent()}
        </Modal>
      </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within a ModalProvider');
    return context;
};