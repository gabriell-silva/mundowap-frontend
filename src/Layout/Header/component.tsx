import ButtonAction from '../../components/Button/Action/component';
import { useModal } from '../../contexts/ModalContext';
import { FlexRow, Container, Image } from './style';

export default function Header() {
  const { openModal } = useModal();

  return (
    <div>
      <Container>
        <FlexRow>
          <div>
            <Image 
                src="/logo-mw.png"
                alt="mundo-wap"
                width={100}
                height={50}
            />
          </div>

          <div>
              <ButtonAction
                onClick={() => openModal({name: "modal-create-visit"})}
              >
                Nova visita
              </ButtonAction>
          </div>
        </FlexRow>
      </Container>
    </div>
  );
}