import React, { FC, useEffect } from 'react';
import styled from 'styled-components/macro';
import Button from './Button';

interface ModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalWrapper = styled.section`
  width: 100vw;
  height: ${() => document.body.offsetHeight}px;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  display: flex;
  justify-content: center;
  z-index: 12;
`;

const ContentWrapper = styled.section`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

const Modal: FC<ModalProps> = function Modal({ closeModal, children }) {
  useEffect(() => {
    const { body } = document;
    body.style.cssText = 'overflow: hidden';
    return () => {
      body.style.cssText = 'overflow: auto';
    };
  }, []);

  return (
    <ModalWrapper>
      <ContentWrapper>
        <div>{children}</div>
        <div>
          <Button
            type="button"
            textContent="Close"
            clickHandler={closeModal}
            status="red"
          />
        </div>
      </ContentWrapper>
    </ModalWrapper>
  );
};

export default Modal;
